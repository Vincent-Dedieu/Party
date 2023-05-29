import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import "./styles.scss";

const SignUp = () => {
   const navigate = useNavigate();
   const [signUp, setSignUp] = useState({
      mail: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmation: "",
   });

   const handleChange = (event) => {
      setSignUp({
         ...signUp,
         [event.target.name]: event.target.value,
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      api.post("/signup", signUp)
         .then((response) => {
            console.log("Inscription réussie:", response.data);
            navigate("/login");
         })
         .catch((err) => console.log("Erreur:", err));
   };

   return (
      <div className='signup'>
         <form className='signup__form' onSubmit={handleSubmit}>
            <img
               className='login__logo'
               src={logo}
               alt='logo'
               style={{ width: "50%" }}
            />
            <div className='signup__form-title'>Inscription</div>

            <input
               name='mail'
               className='signup__form-input'
               type='mail'
               placeholder='Email'
               onChange={handleChange}
               value={signUp.mail}
            />

            <input
               name='lastname'
               className='signup__form-input'
               type='text'
               placeholder='Nom'
               onChange={handleChange}
               value={signUp.lastname}
            />

            <input
               name='firstname'
               className='signup__form-input'
               type='text'
               placeholder='Prénom'
               onChange={handleChange}
               value={signUp.firstname}
            />

            <input
               name='password'
               className='signup__form-input'
               type='password'
               placeholder='Mot de passe'
               onChange={handleChange}
               value={signUp.password}
            />

            <input
               name='confirmation'
               className='signup__form-input'
               type='password'
               placeholder='Confirmer mot de passe'
               onChange={handleChange}
               value={signUp.confirmation}
            />

            <button className='signup__form-button' type='submit'>
               S'inscrire
            </button>
         </form>
      </div>
   );
};

export default SignUp;
