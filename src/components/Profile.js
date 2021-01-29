import React, { useState } from 'react';
import {Redirect } from 'react-router-dom';

import './styles/profile.scss';
import Navbar from './Navbar';
import UseAuth from './customHooks/UseAuth';

function Profile({ currentUser, setUserState }) {
   const loggedIn = UseAuth();
   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
   if(!isLoggedIn) return <Redirect to="/signIn" />;
   return (
      <>
      <Navbar />
      <div id="profile" className="container">
         <h1>Welcome to Profile Page {currentUser.name}</h1>
      </div>
      </>
      
   )
}

export default Profile
