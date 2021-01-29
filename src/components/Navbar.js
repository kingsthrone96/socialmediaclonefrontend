import React from 'react';
import { Link } from 'react-router-dom';

import './styles/navbar.scss';

function Navbar() {
   return (
      <nav id="navbar">
         <div className="container">
            <div id="brandLogo">
               <Link id="logo" to="/homefeed">BrandLogo</Link>
            </div>
            <ul id="navLinks">
               <Link className="nav-link" to="/homefeed">Home</Link>
               <Link className="nav-link" to="/profile">Profile</Link>
               <Link className="nav-link" to="/chat">Chat</Link>
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
