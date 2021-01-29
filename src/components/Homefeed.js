import React, { useState, useEffect } from 'react';
import {Redirect } from 'react-router-dom';

import './styles/homefeed.scss';
import serverAPI from './helpers/serverAPI';
import UseAuth from './customHooks/UseAuth';
import { fetchData } from './helpers/helpersFunctions';

import Navbar from './Navbar';

function Homefeed({ currentUser, setUserState }) {
   const loggedIn = UseAuth();
   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
   
   useEffect(() => {
      fetchData(serverAPI.homefeedData, {
         method: 'GET', headers: { authToken: window.localStorage.authToken }
      }).then(res => {
         const { authorizationError, currentUser } = res;
         if(authorizationError) {
            setIsLoggedIn(false);
            window.localStorage.removeItem("authToken");
         } else {
            console.log(currentUser)
            setUserState(currentUser);
         }
      })
         .catch(err => {
            console.log(err);
            setIsLoggedIn(false)
         })
   }, [setUserState]);

   if(!isLoggedIn) return <Redirect to="/signIn" />;
   return (
      <>
         <Navbar />
         <div id="homefeed" className="container">
            <h1>Welcome to homefeed {currentUser.name}</h1>
         </div>
      </>
   )
   
}

export default Homefeed;
