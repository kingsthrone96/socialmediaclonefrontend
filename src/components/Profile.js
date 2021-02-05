import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import "./styles/profile.scss";

import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../App";
import Navbar from "./Navbar";

import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  landingProfile: {
    backgroundImage:
      'url("https://th.bing.com/th/id/R2434a84085041c46207fb2068c64b90d?rik=4HxE4kTq0XHKnA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fe%2f3%2f2%2f610334.jpg&ehk=1RX14puOJpbNFeA%2f49K8e0J2fXQjC4jeP91kLNZsBO4%3d&risl=&pid=ImgRaw")',
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },

  avatarContainer: {
    position: "relative",
    left: "50%",
    top: "70%",
    transform: "translateX(-50%)",
    width: "fit-content",
    textAlign: "center",
  },

  avatar: {
    width: theme.spacing(28),
    height: theme.spacing(28),
  },
}));

function Profile() {
  const classes = useStyles();
  const { userState, dispatch } = useContext(Context);
  if (!userState.isLoggedIn) return <Redirect to="/signIn" />;
  return (
    <>
      <Navbar />
      <div id="profile" className="hc-container">
        <div id="landingProfile" className={classes.landingProfile}>
          <div className={classes.avatarContainer}>
            <Avatar
              alt={userState.user.name}
              src="https://www.abs-cbn.com/download?type=image&include=one&file=https://data-corporate.abs-cbn.com/corp/medialibrary/dotcom/narrowcast%20metro%20pr/seo%20ye-ji%20tops%20metro-style%27s%20most%20beautiful%20korean%20actresses%20poll.jpg?ext=.jpg"
              className={classes.avatar}
            />
            <h1 id="profileName">{userState.user.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
