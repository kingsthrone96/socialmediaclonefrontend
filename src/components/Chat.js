import React, { useState } from 'react';
import {Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import './styles/chat.scss';
import UseAuth from './customHooks/UseAuth';

function Chat({ currentUser, setUserState }) {
   const loggedIn = UseAuth();
   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
   if(!isLoggedIn) return <Redirect to="/signIn" />;
   return (
      <>
         <Navbar />
         <div id="chat" className="container">
            <h1>Welcome to Chat Page {currentUser.name}</h1>
         </div>
      </>
   )
}

export default Chat
