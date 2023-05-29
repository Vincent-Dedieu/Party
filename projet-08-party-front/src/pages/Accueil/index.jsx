import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import jwt_decode from "jwt-decode";

// import composants
import Navbar from "../../components/Navbar";
import GoogleApiMap from "../../components/GoogleMap";
import api from "../../api/api";

// import MUI composants
import CelebrationIcon from "@mui/icons-material/Celebration";
import PlaceIcon from "@mui/icons-material/Place";
import DesktopNavbar from "../../components/DesktopNavbar";

const Accueil = () => {
   const [events, setEvents] = useState([]);
   const [search, setSearch] = useState("");
   const [location, setlocation] = useState();

   const onChange = (event) => {
      setSearch(event.target.value);
   };

   useEffect(() => {
      api.get(`/me/events`)
         .then((res) => {
            setEvents(res.data);
         })
         .catch((err) => console.log("ERRREUR: ", err));
   }, []);

   // Get localStorage ID
   const eventId = localStorage.getItem("event_id");

   // ---- TEST ---
   const [user, setUser] = useState({});
   const token = localStorage.getItem("accessToken");

   // Decode the token to get the payload
   const payload = jwt_decode(token);

   // Access the properties of the payload object
   const userToken = {
      id: payload.id,
      image: payload.image,
   };

   useEffect(() => {
      api.get(`/user/${userToken.id}`)
         .then((res) => setUser(res.data))
         .catch((err) => console.log("ERRREUR: ", err));
   }, []);

   Geocode.setApiKey(import.meta.env.VITE_APP_GEOCODING_API_KEY);

   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         const { latitude, longitude } = position.coords;
         Geocode.fromLatLng(latitude, longitude)
            .then((response) => {
               const cities = response.results[0].address_components.find(
                  (city) => city.types.includes("locality")
               );
               const countries = response.results[0].address_components.find(
                  (country) => country.types.includes("country")
               );
               setlocation(`${cities.long_name}, ${countries.long_name}`);
            })
            .catch((error) => {
               console.log(error);
            });
      });
   }, []);

   const dateEU = (date) => {
      const options = { month: "short", day: "numeric" };
      const newDate = new Date(
         date.split("/").reverse().join("-")
      ).toLocaleDateString("fr-FR", options);
      return newDate;
   };

   return (
      <div className='accueil'>
         <header className='accueil__header'>
            <p className='header-title'>Accueil</p>
            <Link to="/profil"><img src={user.image} alt='profil' className='header-profil' /></Link>
            <DesktopNavbar />
         </header>

         <main className='accueil__main'>
            <section className='accueil__location'>
               <h2>Localisation</h2>
               <div className='accueil__location-current'>
                  <PlaceIcon />
                  <p>{location}</p>
               </div>
            </section>

            <GoogleApiMap events={events} />

            <section className='accueil__events'>
               <form className='accueil__form'>
                  <input
                     className='accueil__input'
                     type='text'
                     placeholder='Recherche event'
                     value={search}
                     onChange={onChange}
                  />
               </form>
               <div className='accueil__events-counter'>
                  <CelebrationIcon />
                  <h3>
                     {events.length}{" "}
                     {events.length === 1 || events.length === 0
                        ? "event"
                        : "events"}{" "}
                     en cours
                  </h3>
               </div>
               <div className='accueil__event-container'>
                  {events
                     .filter((event) =>
                        event.title.toLowerCase().includes(search.toLowerCase())
                     )
                     .map((event) => (
                        <Link key={event.id} to={`/event/${event.id}`}>
                           <div key={event.id} className='accueil__event'>
                              <img
                                 className='accueil__images'
                                 src={`https://picsum.photos/seed/${event.id}/200/300`}
                                 alt=''
                              />
                              <div className='accueil__event-info'>
                                 <h3>{event.title}</h3>
                                 <p>
                                    {event.city}, {event.postal}
                                 </p>
                              </div>
                              <div className='accueil__event-date'>
                                 {event.date ? dateEU(event.date) : ""}
                              </div>
                           </div>
                        </Link>
                     ))}
               </div>
            </section>
         </main>
         <Navbar />
      </div>
   );
};

export default Accueil;
