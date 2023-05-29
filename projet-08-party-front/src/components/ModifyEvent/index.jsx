import { Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "./styles.scss";

const ModifyEvent = ({ handleModifyEvent, event, handleClickEvent }) => {
   const id = useId();

   const contactFormSchema = Yup.object().shape({
      title: Yup.string(),
      date: Yup.date(),
      description: Yup.string(),
      address: Yup.string().max(50, "Trop long !!!"),
      city: Yup.string().max(50, "Trop long !!!"),
      postal: Yup.number().positive().integer(),
      image: Yup.string(),
   });

   return (
      <div className='editEvent'>
         <h1 className='titreModify'>Mon event</h1>
         <Formik
            initialValues={{
               title: event.title,
               date: event.date,
               description: event.description,
               address: event.address,
               city: event.city,
               postal: event.postal,
               image: "",
            }}
            onSubmit={handleModifyEvent}
            validationSchema={contactFormSchema}
         >
            {({ errors, touched }) => (
               <Form className='editEvent__form'>
                  <div >
                     <Field
                        className='editEvent__form-input'
                        type='text'
                        id={`${id}-title`}
                        placeholder={event.title}
                        name='title'
                     />
                     {errors.title && touched.titles && (
                        <p style={{ color: "red" }}>{errors.title}</p>
                     )}
                  </div>
                  <div  >
                     <Field
                        className='editEvent__form-input'
                        type='date'
                        id={`${id}-date`}
                        placeholder={event.date}
                        name='date'
                     />
                     {errors.date && touched.date && (
                        <p style={{ color: "red" }}>{errors.date}</p>
                     )}
                  </div>
                  <div >
                     <Field
                        className='editEvent__form-input'
                        component='textarea'
                        id={`${id}-description`}
                        placeholder={event.description}
                        name='description'
                     />
                     {errors.description && touched.description && (
                        <p style={{ color: "red" }}>{errors.description}</p>
                     )}
                  </div>
                  <div >
                     <Field
                        className='editEvent__form-input'
                        type='text'
                        id={`${id}-address`}
                        name='address'
                        placeholder={event.address}
                     />
                     {errors.address && touched.address && (
                        <p style={{ color: "red" }}>{errors.address}</p>
                     )}
                  </div>
                  <div >
                     <Field
                        className='editEvent__form-input'
                        type='text'
                        id={`${id}-city`}
                        name='city'
                        placeholder={event.city}
                     />
                     {errors.city && touched.city && (
                        <p style={{ color: "red" }}>{errors.city}</p>
                     )}
                  </div>
                  <div >
                     <Field
                        className='editEvent__form-input'
                        type='number'
                        id={`${id}-postal`}
                        name='postal'
                        placeholder={event.postal}
                     />
                     {errors.postal && touched.postal && (
                        <p style={{ color: "red" }}>{errors.postal}</p>
                     )}
                  </div>
                  {/* <div className='editEvent__form-input'>
                     <Field

                        type='file'
                        id={`${id}-image`}
                        name='image'
                        placeholder='image'
                     />
                     {errors.image && touched.image && (
                        <p style={{ color: "red" }}>{errors.image}</p>
                     )}
                  </div> */}

                  <button className='editEvent__form-button' type='submit'>
                     Valider
                  </button>
                  <div className='editEvent__close' onClick={handleClickEvent}>
                     <HighlightOffIcon fontSize='large' />
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default ModifyEvent;
