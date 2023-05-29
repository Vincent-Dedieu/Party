import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./styles.scss";
import FormEvent from "../../components/FormEvent";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const Add = () => {
   const navigate = useNavigate();

   const [formValue, setFormValue] = useState({
      title: "",
      date: "",
      description: "",
      address: "",
      city: "",
      postal: "",
      password: "",
      // image: "",
   });
   useEffect(() => { }, [formValue]);

   const handleSubmitForm = (value) => {
      const data = {
         title: value.title,
         date: value.date,
         description: value.description,
         address: value.address,
         city: value.city,
         postal: value.postal,
         password: value.password,
         // image: value.image,
      };
      api.post("/event", data)
         .then(() => {
            navigate("/accueil");
         })
         .catch((err) => console.log("ERRREUR: ", err))
         .finally(console.log("L'événement est bien crée"));
   };

   return (
      <div className='add'>
         <FormEvent handleSubmitForm={handleSubmitForm} />

         <div className='navbar'>
            <Navbar />
         </div>
      </div>
   );
};

export default Add;
