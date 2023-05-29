import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import FileBase64 from "react-file-base64";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "./styles.scss";

const ModifyUser = ({
   userProps,
   setOpenModalUser,
   openModalUser,
   setUserProfil,
   handleClickModifyUser,
}) => {
   const [user, setUser] = useState({
      id: userProps.id,
      firstname: userProps.firstname,
      lastname: userProps.lastname,
      mail: userProps.mail,
   });
   const [base64File, setBase64File] = useState(null);

   const handleChange = (event) => {
      setUser({
         ...user,
         [event.target.name]: event.target.value,
      });
   };
   const handleSubmit = () => {
      const userModify = {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         mail: user.mail,
         image: base64File,
      };
      console.log(userModify);
      api.put(`/user/${user.id}`, userModify)

         .then((res) => {
            console.log("reponse api " + res.data);
            setUserProfil(res.data);
            setOpenModalUser(!openModalUser);
            console.log(res.data.image);
         })
         .catch((err) => console.log("ERRREUR: ", err));
   };

   const handleFileUpload = (file) => {
      setBase64File(file.base64);
   };

   return (
      <div className='edit'>
         <form className='edit__form' onSubmit={handleSubmit}>
            <div className='edit__form-title'>Informations personnelles</div>

            <input
               name='mail'
               className='edit__form-input'
               type='mail'
               placeholder={user.mail}
               onChange={handleChange}
               value={user.mail}
            />

            <input
               name='lastname'
               className='edit__form-input'
               type='text'
               placeholder={user.lastname}
               onChange={handleChange}
               value={user.lastname}
            />

            <input
               name='firstname'
               className='edit__form-input'
               type='text'
               placeholder={user.firstname}
               onChange={handleChange}
               value={user.firstname}
            />
            <div className='edit__form-inputphoto'>
               <FileBase64 multiple={false} onDone={handleFileUpload} />
            </div>
            <button className='edit__form-button' type='submit'>
               Modifier
            </button>

            <div className='edit__close' onClick={handleClickModifyUser}>
               <HighlightOffIcon fontSize='large' />
            </div>
         </form>
      </div>
   );
};

export default ModifyUser;
