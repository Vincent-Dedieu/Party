import React, { useState } from "react";
import api from "../../api/api";
import CloseIcon from "@mui/icons-material/Close";

import "./styles.scss";

const ModalItems = ({ eventId, handleClickModal, items, setItems }) => {
   const [itemName, setItemName] = useState("");
   const [itemQuantity, setItemQuantity] = useState("");

   const handleSubmitFormItem = (e) => {
      e.preventDefault();
      const formValueItem = {
         name: itemName,
         quantity: +itemQuantity,
         event_id: +eventId,
         category_id: 1,
      };
      api.post("/item", formValueItem)
         .then((res) => {
            setItems([...items, res.data]);
            handleClickModal();

            console.log("L'item est bien crée");
         })
         .catch((err) => console.log("ERREUR: ", err));
   };

   return (
      <div className='modal__bg '>
         <form className='form__items' onSubmit={handleSubmitFormItem}>
            <input
               className='items__input'
               type='text'
               placeholder="Nom de l'élément"
               name='name'
               onChange={(event) => setItemName(event.target.value)}
               value={itemName}
            />
            <input
               className='items__input'
               type='number'
               name='quantity'
               placeholder='quantité'
               onChange={(event) => setItemQuantity(event.target.value)}
               value={itemQuantity}
            />
            <button className='items__btn' type='submit'>
               Ajouter
            </button>
            <div className='items__btn-close' onClick={handleClickModal}>
               <CloseIcon />
            </div>
         </form>
      </div>
   );
};

export default ModalItems;
