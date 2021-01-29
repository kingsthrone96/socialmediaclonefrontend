import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import serverAPI from '../serverAPI';
import UseAuth from './customHooks/UseAuth';
import { fetchData } from './helpersFunctions';

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
   return <h1>Welcome to Homefeed {currentUser.name}</h1>;
   
}

export default Homefeed;
