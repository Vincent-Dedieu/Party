import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import logo from "../../assets/img/logo.png";

import "./styles.scss";

const LoginForm = () => {
   const navigate = useNavigate();
   const [valueEmail, setValueEmail] = useState("");
   const [valuePassword, setValuePassword] = useState("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const tokenSaved = localStorage.getItem("accessToken");

      if (tokenSaved) {
         return navigate("/accueil");
      }

      setLoading(false);
   }, []);

   if (loading) {
      return;
   }

   const setAuthToken = (token) => {
      if (token) {
         api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else delete api.defaults.headers.common["Authorization"];
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      api.post("/login", {
         mail: valueEmail,
         password: valuePassword,
      })
         .then((response) => {
            console.log(response.data.accessToken);
            const token = response.data.accessToken;
            localStorage.setItem("accessToken", token);
            setAuthToken(token);

            if (!token) {
               navigate("/login");
            }

            if (eventId) {
               navigate(`/event/${eventId}`);
            } else {
               navigate("/accueil");
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const eventId = localStorage.getItem("event_id");
   console.log("Event Url " + eventId);

   return (
      <div className='login'>
         <img
            className='login__logo'
            src={logo}
            alt='logo'
            style={{ width: "50%" }}
         />
         <div className='login__title'>Connexion</div>
         <form className='login__form' onSubmit={handleSubmit}>
            <input
               className='form__input'
               type='email'
               placeholder='Email'
               name='email'
               onChange={(event) => setValueEmail(event.target.value)}
               value={valueEmail}
            />
            <input
               className='form__input'
               type='password'
               name='password'
               placeholder='Mot de passe'
               onChange={(event) => setValuePassword(event.target.value)}
               value={valuePassword}
            />

            <button className='btn-login' type='submit'>
               Se connecter
            </button>

            <p className='forget'>Mot de passe oublié ?</p>

            <div className='login__btn'>
               <Link to={"/sign-up"}>
                  <button className='btn-signup'>S'inscrire</button>
               </Link>
            </div>
         </form>
      </div>
   );
};

export default LoginForm;
