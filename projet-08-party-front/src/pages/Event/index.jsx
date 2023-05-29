import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import platine from "../../assets/img/platine.jpg";
import jwt_decode from "jwt-decode";

// Import components
import Navbar from "../../components/Navbar";
import ModalItems from "../../components/ModalItems";
import ModifyEvent from "../../components/ModifyEvent";

// Import MUI icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import ImageIcon from "@mui/icons-material/Image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LiquorIcon from "@mui/icons-material/Liquor";
import CakeIcon from "@mui/icons-material/Cake";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RedeemIcon from "@mui/icons-material/Redeem";
import StraightenIcon from "@mui/icons-material/Straighten";
import imgparty from "../../assets/img/bg-party.avif";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

// Import Scss
import "./styles.scss";



const Event = () => {

   // Get the token from localStorage
   const token = localStorage.getItem("accessToken");

   // Decode the token to get the payload
   const payload = jwt_decode(token);

   // Access the properties of the payload object
   const userToken = {
      id: payload.id,
      firstname: payload.firstname,
      lastname: payload.lastname,
      mail: payload.mail,
   };


   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [openModalModify, setOpenModalModify] = useState(false);
   const [openItems, setOpenItems] = useState(false);
   const [event, setEvent] = useState({});
   const [items, setItems] = useState([]);
   const [users, setUsers] = useState([]);
   const [isAllowedToSeeEvent, setIsAllowedToSeeEvent] = useState(false);

   const handleClickModal = (categoryNumber) => {
      setOpen(!open);
   };

   const { id } = useParams();

   const eventUrl = `http://localhost:5173/?event_id=${id}`;

   const onClick = () => {
      navigator.clipboard.writeText(eventUrl);
   };

   useEffect(() => {
      api.get(`/event/${id}`)
         .then((res) => {
            setEvent(res.data);
            setIsAllowedToSeeEvent(true);
         })
         .catch((err) => {
            console.log("ERRREUR: ", err);
            if (err.code === "ERR_BAD_REQUEST") {
               setIsAllowedToSeeEvent(false);
            }
         });

      api.get(`/event/${id}/item/`)
         .then((res) => setItems(res.data.Items))
         .catch((err) => console.log("ERRREUR: ", err));

      api.get(`/event/${id}/users`)
         .then((res) => {
            console.log("les users: " + JSON.stringify(res.data.Users));
            setUsers(res.data.Users)
         })

         .catch((err) => console.log("ERRREUR: ", err));
   }, []);

   const dateEU = (date) => {
      const options = { month: 'short', day: 'numeric' };
      const newDate = new Date(date.split("/").reverse().join("-")).toLocaleDateString(
         "fr-FR", options)
      return newDate;
   };

   const handleDeleteEvent = () => {
      api.delete(`/event/${id}`)
         .then((res) => setEvent(res.data))
         .catch((err) => console.log("ERRREUR: ", err));
      navigate("/accueil");
   };

   const handleClickItem = () => {
      setOpenItems(!openItems);
   };
   const handleClickEvent = () => {
      setOpenModalModify(!openModalModify);
   };

   const handleDeleteItem = (idItem) => {
      api.delete(`/item/${idItem}`)
         .then((res) =>
            setItems((prevItems) =>
               prevItems.filter((item) => item.id !== idItem)
            )
         )
         .catch((err) => console.log("ERRREUR: ", err));
   };

   const handleModifyEvent = (value) => {
      const eventModify = {
         title: value.title,
         date: value.date,
         description: value.description,
         address: value.address,
         city: value.city,
         postal: value.postal,
         image: value.image,
      };
      api.put(`/event/${id}`, eventModify)

         .then((res) => {
            setEvent(res.data);
            handleClickEvent();
         })
         .catch((err) => console.log("ERRREUR: ", err));
   };

   //  Request password when not logged in

   const [requestAccessPassword, setRequestAccessPassword] = useState("");
   const [requestAccessPasswordError, setRequestAccessPasswordError] =
      useState(false);
   const handleRequestPasswordSubmit = (e) => {
      e.preventDefault();

      api.post(`/event/${id}/request-access`, {
         password: requestAccessPassword,
      })
         .then((res) => {
            setEvent(res.data);
            setIsAllowedToSeeEvent(true);
         })
         .catch((err) => {
            console.log("ERRREUR: ", err);
            if (err.code === "ERR_BAD_REQUEST") {
               setIsAllowedToSeeEvent(false);
               setRequestAccessPasswordError(
                  "Le mot de passe n'est pas correct."
               );
            }
         });
   };



   if (!isAllowedToSeeEvent) {
      return (
         <div className='password'>
            <div className='password__card'>
               <h1 className='password__title'>Mot de passe de l'évenement</h1>
               {requestAccessPasswordError && (
                  <p className='error'>{requestAccessPasswordError}</p>
               )}
               <form
                  className='password__form'
                  onSubmit={handleRequestPasswordSubmit}
               >
                  <input
                     className='password__input'
                     placeholder='Mot de passe'
                     type='text'
                     value={requestAccessPassword}
                     onChange={(e) => {
                        setRequestAccessPassword(e.target.value);
                     }}
                  />
                  <button type='submit' className='password__button'>
                     Valider
                  </button>
               </form>
            </div>
         </div>
      );
   }
   /**
    * End request password
    */

   return (
      <div>
         <div className='event'>
            <header className='event__header'>
               <p className='header-title'>Event</p>
            </header>

            <div className="event__container" >
               <img className="event__container-image" src={platine} alt="image-event" />
               <div className='event__date'>
                  <p className="event__container-date" >{event.date ? dateEU(event.date) : ""}</p>
               </div>

            </div>
            <div className="event__info">

               <h1 className='event__title'>{event.title}</h1>

               <div className='event__participant'>
                  <PlaceIcon />
                  <p>{event.address}, {event.postal} <span className="event__address" >{event.city}</span>  </p>
               </div>
               {<div className='event__participant'>
                  <AvatarGroup max={4}>
                     {users.map((user) => {
                        return (
                           <div key={user.id}>

                              <Avatar alt={`${user.firstname} ${user.lastname}`} src={user.image} sx={{ width: 16, height: 16 }} />

                           </div>)
                     })}
                  </AvatarGroup>
                  <p>{users.length} {users.length < 2 ? "participant" : "participants"}</p>
               </div>}

               <h2 className='event__description-title'>Description</h2>
               <p className='event__description-text'>{event.description}</p>
            </div>

            <div className='event__icons'>
               <div className='icon'>
                  <div className='icon__notification'>1</div>
                  <LiquorIcon fontSize='large' onClick={handleClickModal} />
               </div>
               <div className='icon'>
                  <div className='icon__notification'>1</div>
                  <LunchDiningIcon
                     fontSize='large'
                     onClick={handleClickModal}
                  />
               </div>
               <div className='icon'>
                  <div className='icon__notification'>2</div>
                  <CakeIcon fontSize='large' onClick={handleClickModal} />
               </div>
               <div className='icon'>
                  <div className='icon__notification'>1</div>
                  <StraightenIcon fontSize='large' onClick={handleClickModal} />
               </div>
               <div className='icon'>
                  <div className='icon__notification'>1</div>
                  <RedeemIcon fontSize='large' onClick={handleClickModal} />
               </div>
            </div>
            <div className='divlist-btn'>
               <button className='list-btn' onClick={handleClickItem}>
                  <p>Liste</p>
                  {/* <div className='icon'>
                     <ShoppingBagIcon />
                  </div> */}
               </button>

            </div>
            <div className='event__buttons'>
               <button className='setting-btn' onClick={onClick}>
                  Inviter
               </button>
               {
                  event.user_id == userToken.id && (
                     <>
                        <button className='setting-btn' onClick={handleClickEvent}>
                           Modifier
                        </button>
                        <button className='setting-btn' onClick={handleDeleteEvent}>
                           Supprimer
                        </button>
                     </>)
               }
            </div>
         </div>

         {
            openItems ? (
               <div className='event-bg'>
                  <div className='event__items'>
                     <h2 className='items__title'>Liste des éléments</h2>
                     <ul className='items'>
                        {items.map((item) => {
                           return (
                              <li className='items__li' key={item.id}>
                                 <div className='items__divInfo'>
                                    <span>{item.quantity}</span>
                                    <p>{item.name}</p>
                                 </div>
                                 <div onClick={() => handleDeleteItem(item.id)}>
                                    <CloseIcon />
                                 </div>
                              </li>
                           );
                        })}
                     </ul>
                     <div className='items__divBtn'>
                        <button className='items__btn' onClick={handleClickItem}>
                           Fermer
                        </button>
                     </div>
                  </div>
               </div>
            ) : null
         }
         {
            open ? (
               <ModalItems
                  items={items}
                  setItems={setItems}
                  eventId={event.id}
                  handleClickModal={handleClickModal}
               />
            ) : null
         }
         {
            openModalModify ? (
               <ModifyEvent
                  event={event}
                  setEvent={setEvent}
                  eventId={event.id}
                  handleClickEvent={handleClickEvent}
                  handleModifyEvent={handleModifyEvent}
               />
            ) : null
         }

         <Navbar />
      </div >
   );
};

export default Event;
