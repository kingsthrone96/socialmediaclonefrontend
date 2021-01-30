import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import UseAuth from './customHooks/UseAuth';

import { makeStyles } from '@material-ui/core/styles';
import './styles/navbar.scss';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/Home';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
   margin: {
     margin: theme.spacing(0),
   },
   extendedIcon: {
     marginRight: theme.spacing(0),
   }
 }));

function Navbar() {
   const classes = useStyles();
   const loggedIn = UseAuth();
   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

   const logOut = () => {
      window.localStorage.removeItem("authToken");
      setIsLoggedIn(false);
   }

   if(!isLoggedIn) return <Redirect to="/signIn" />;
   return (
      <nav id="navbar">
         <div className="hc-container">
            <div id="brandLogo">
               <Link id="logo" to="/homefeed">BrandLogo</Link>
            </div>
            <ul id="navLinks">
               <Link className="nav-link" to="/homefeed">
                  <IconButton style={{ color: "#fff"}} aria-label="home" className={classes.margin}>
                     <HomeOutlinedIcon />
                  </IconButton>
               </Link>
               <Link className="nav-link" to="/profile">
                  <IconButton style={{ color: "#fff"}} aria-label="profile" className={classes.margin}>
                     <AccountCircleOutlinedIcon />
                  </IconButton>
               </Link>
               <Link className="nav-link" to="/chat">
                  <IconButton style={{ color: "#fff"}} aria-label="logout" className={classes.margin}>
                     <ChatBubbleIcon  />
                  </IconButton>
               </Link>
               <IconButton style={{ color: "#fff"}} aria-label="home" className={classes.margin} onClick={logOut}>
                  <ExitToAppOutlinedIcon />
               </IconButton>
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
