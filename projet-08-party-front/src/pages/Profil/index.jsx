import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

// Components import

import NavBar from "../../components/Navbar";
import CustomImageList from "../../components/PhotoGallery";
import ModifyUser from "../../components/ModifyUser";

import SettingsIcon from "@mui/icons-material/Settings";

// Img import
import jwt_decode from "jwt-decode";

import "./styles.scss";
import DesktopNavbar from "../../components/DesktopNavbar";

const Profil = () => {
   const navigate = useNavigate();

   const [clickSetting, setClickSetting] = useState(false);
   const [clickDelete, setClickDelete] = useState(false);
   const [events, setEvents] = useState([]);

   const [user, setUser] = useState({});
   const [openModalUser, setOpenModalUser] = useState(false);


   console.log("les users du state : " + JSON.stringify(user));
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

   // const id = payload.id;
   // const firstname = payload.firstname;
   // const lastname = payload.lastname;
   // const mail = payload.mail;
   useEffect(() => {
      api.get(`/user/${userToken.id}`)
         .then((res) => setUser(res.data))
         .catch((err) => console.log("ERRREUR: ", err));

      api.get(`/me/events`)
         .then((res) => {
            setEvents(res.data);
         })
         .catch((err) => console.log("ERRREUR: ", err));

   }, []);

   const handleClickLogout = () => {
      localStorage.clear();
      navigate("/login");
   };

   const handleClickDeleteAccount = () => {
      api.delete(`/user/${user.id}`)
         .then((res) => console.log("L'utilisateur a bien été supprimé"))
         .catch((err) => console.log("ERRREUR: ", err));
      localStorage.clear();
      navigate("/");
   };

   const handleClickModifyUser = () => {
      setOpenModalUser(!openModalUser);
   };

   const handleClickSetting = () => {
      setClickSetting(!clickSetting);
   };

   const handleClickDeleteModal = () => {
      setClickDelete(!clickDelete);
      handleClickSetting();
   };

   return (
      <div className='profil'>
         <header className='profil__header'>
            <p className='header-title'>Profil</p>
            <div onClick={handleClickSetting}>
               <SettingsIcon fontSize='large' />
            </div>
         </header>
         <main>
            <div className='profil__infos'>
               <img
                  className='info-img '
                  src={
                     user.image
                        ? user.image
                        : "../../assets/img/Avatar_anonyme.png"
                  }
                  alt='Photo de profil'
               />

               <div className='info'>
                  <p className='info-name'>
                     {user.firstname} {user.lastname}
                  </p>
               </div>
            </div>
            <div className='profil__edit'>
               <button className='edit-btn' onClick={handleClickModifyUser}>
                  Editer profil
               </button>
            </div>
            <div className='profil__social'>
               <div className='social'>
                  <p>{events.length} {events.length < 2 ? 'event' : 'events'}</p>
               </div>

               <div className='social'>
                  <p>6 amis</p>
               </div>
            </div>
            <CustomImageList />
         </main>

         {clickSetting ? (
            <div className='modal__setting'>
               <div className='modal__btn'>
                  <p onClick={handleClickLogout}>Se déconnecter</p>
                  <p
                     className='modal__btn-delete'
                     onClick={handleClickDeleteModal}
                  >
                     Supprimer
                  </p>
               </div>
            </div>
         ) : null}
         {clickDelete ? (
            <div className='modal__delete'>
               <div className='modal__delete-validation'>
                  <p className='modal__delete-message'>
                     <span>Attention</span>: Voulez-vous vraiment supprimer
                     votre compte ?
                  </p>
                  <div className='modal__delete-btns'>
                     <button
                        className='modal__delete-btn'
                        onClick={handleClickDeleteAccount}
                     >
                        Oui
                     </button>
                     <button
                        className='modal__delete-btn'
                        onClick={handleClickDeleteModal}
                     >
                        Non
                     </button>
                  </div>
               </div>
            </div>
         ) : null}

         {openModalUser ? (
            <ModifyUser
               // category_id={categoryId}
               handleClickModifyUser={handleClickModifyUser}
               userProps={user}
               setOpenModalUser={setOpenModalUser}
               openModalUser={openModalUser}
               setUserProfil={setUser}
            />
         ) : null}

         <NavBar />
      </div>
   );
};

export default Profil;
