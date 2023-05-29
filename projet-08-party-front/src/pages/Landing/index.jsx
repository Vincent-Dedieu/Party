import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import CopyrightIcon from "@mui/icons-material/Copyright";

// Scss
import "./styles.scss";

const Landing = () => {
   const location = useLocation();

   const searchParams = new URLSearchParams(location.search);
   const paramValue = searchParams.get("event_id");

   if (paramValue === null) {
      localStorage.clear("event_id");
   } else {
      localStorage.setItem("event_id", paramValue);
   }

   return (
      <div className='landing'>
         <header className='landing__header'>
            <img className='landing__logo' src={logo} alt='Logo party' />
            <Link to={"/login"}>
               <button className='landing__button'>Se connecter</button>
            </Link>
         </header>

         <main>
            <section className='landing__section-first'>
               <h1 className='landing__title--main'>
                  Le moyen le plus facile de créer un event
               </h1>
               <p>
                  La fin des groupes WhatsApp illisible avec une organisation
                  chaotique
               </p>

               <div className='landing__photo--app'></div>
            </section>
            <section className='landing__section-second'>
               <h1 className='landing__title--main'>
                  Une liste pour les boissons, nourritures etc ...
               </h1>
               <div className='landing__photo--liste'></div>
            </section>
            <section className='landing__section-third'>
               <h1 className='landing__title--main'>Rejoins nous</h1>
               <div className='landing__photo--join'></div>
            </section>
         </main>
         <footer className='landing__footer'>
            <CopyrightIcon sx={{ fontSize: 50 }} />
            <p>2023 Copyright : Party</p>
            <p>Tous droits réservés</p>
         </footer>
      </div>
   );
};

export default Landing;
