import React from 'react'
import { Link } from 'react-router-dom'

import AddIcon from "@mui/icons-material/Add";

import './styles.scss';

const DesktopNavbar = () => {
  return (
    <div className='desktop'>
        <nav className='desktop__navbar'>
            <Link to="/"><div className='link-home'>Accueil</div></Link>
            <Link to="/add"><button className='link-add'>Créer un évent</button></Link>
        </nav>
    </div>
  )
}

export default DesktopNavbar