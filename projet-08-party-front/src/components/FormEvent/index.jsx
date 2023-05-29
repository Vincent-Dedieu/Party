import { Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import "./styles.scss";

const FormEvent = ({ handleSubmitForm }) => {
   const id = useId();

   const contactFormSchema = Yup.object().shape({
      title: Yup.string().required("Ce champs est requis !"),
      date: Yup.date().required("Ce champs est requis !"),
      description: Yup.string().required("Ce champs est requis !"),
      address: Yup.string()
         .max(50, "Trop long !!!")
         .required("Ce champs est requis !"),
      city: Yup.string().max(50, "Trop long !!!"),
      postal: Yup.number().required().positive().integer(),
      password: Yup.string().required("Ce champs est requis !"),
   });

   return (
      <>
         <h1 className='title'>Mon event</h1>
         <Formik
            initialValues={{
               title: "",
               date: "",
               description: "",
               address: "",
               city: "",
               postal: "",
               password: "",
               // image: "",
            }}
            onSubmit={handleSubmitForm}
            validationSchema={contactFormSchema}
         >
            {({ errors, touched }) => (
               <Form className='form'>
                  <div>
                     <Field
                        className='input'
                        type='text'
                        id={`${id}-title`}
                        placeholder='Titre'
                        name='title'
                     />
                     {errors.title && touched.title && (
                        <p style={{ color: "red" }}>{errors.title}</p>
                     )}
                  </div>
                  <div>
                     <Field
                        className='input'
                        type='date'
                        id={`${id}-date`}
                        placeholder='Date'
                        name='date'
                     />
                     {errors.date && touched.date && (
                        <p style={{ color: "red" }}>{errors.date}</p>
                     )}
                  </div>
                  <div>
                     <Field
                        className='input'
                        component='textarea'
                        id={`${id}-description`}
                        placeholder='Description'
                        name='description'
                     />
                     {errors.description && touched.description && (
                        <p style={{ color: "red" }}>{errors.description}</p>
                     )}
                  </div>
                  <div>
                     <Field
                        className='input'
                        type='text'
                        id={`${id}-address`}
                        name='address'
                        placeholder='Adresse'
                     />
                     {errors.address && touched.address && (
                        <p style={{ color: "red" }}>{errors.address}</p>
                     )}
                  </div>
                  <div>
                     <Field
                        className='input'
                        type='text'
                        id={`${id}-city`}
                        name='city'
                        placeholder='Ville'
                     />
                     {errors.city && touched.city && (
                        <p style={{ color: "red" }}>{errors.city}</p>
                     )}
                  </div>
                  <div>
                     <Field
                        className='input'
                        type='number'
                        id={`${id}-postal`}
                        name='postal'
                        placeholder='Code postal'
                     />
                     {errors.postal && touched.postal && (
                        <p style={{ color: "red" }}>{errors.postal}</p>
                     )}
                  </div>
                  <div>
                     <Field
                        className='input'
                        type='password'
                        id={`${id}-password`}
                        name='password'
                        placeholder='Mot de passe event'
                     />
                     {errors.password && touched.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                     )}
                  </div>
                  <button className='buttonForm' type='submit'>
                     Submit
                  </button>
               </Form>
            )}
         </Formik>
      </>
   );
};

export default FormEvent;
