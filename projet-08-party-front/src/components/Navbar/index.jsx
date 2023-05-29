import React from "react";
import { NavLink, Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./styles.scss";

const Navbar = () => {
   return (
      <div className='navbar'>
         <div className='bottom-navbar'>
            <div className='con-effect'>
               <div className='effect'></div>
            </div>
            <NavLink
               to='/accueil'
               className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
               }
            >
               <button>
                  <HomeIcon fontSize='large' />
               </button>
            </NavLink>

            <Link to='/add'>
               <button className='float'>
                  <AddIcon />
               </button>
            </Link>

            <NavLink to='/profil'>
               <button>
                  <AccountCircleIcon fontSize='large' />
               </button>
            </NavLink>
         </div>
      </div>
   );
};

export default Navbar;
