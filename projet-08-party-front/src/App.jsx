import { Routes, Route } from "react-router-dom";

// Components import
import Profil from "./pages/Profil";
import Landing from "./pages/Landing";
import LoginForm from "./pages/LoginForm";
import Accueil from "./pages/Accueil";
import Event from "./pages/Event/";
import Add from "./pages/AddEvent";
import SignUp from "./pages/SignUp";

// Css import
import "./styles/_reset.css";
import "./styles/styles.scss";

function App() {
   return (
      <div className='App'>
         <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/accueil' element={<Accueil />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/profil' element={<Profil />} />
            <Route path='/event/:id' element={<Event />} />
            <Route path='/add' element={<Add />} />
         </Routes>
      </div>
   );
}

export default App;
