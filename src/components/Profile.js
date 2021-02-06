import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import { Redirect } from "react-router-dom";
import "./styles/profile.scss";

import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../App";
import Navbar from "./Navbar";
import PostArea from "./subComponents/PostArea";
import UserPosts from "./subComponents/UserPosts";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme) => ({
  landingProfile: {
    backgroundImage:
      'linear-gradient(transparent, #222), url("https://th.bing.com/th/id/R2434a84085041c46207fb2068c64b90d?rik=4HxE4kTq0XHKnA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fe%2f3%2f2%2f610334.jpg&ehk=1RX14puOJpbNFeA%2f49K8e0J2fXQjC4jeP91kLNZsBO4%3d&risl=&pid=ImgRaw")',
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },

  avatarContainer: {
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    textAlign: "center",
  },

  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },

  leftSideRoot: {
    position: "fixed",
  },

  leftSideRootOnFixed: {
    float: "right",
  },
}));

const LeftSide = () => {
  const [previewImage, setPreviewImage] = useState();
  const classes = useStyles();
  const [positionFixed, setPositionFixed] = useState(null);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 463) {
        setPositionFixed(true);
        console.log(positionFixed);
      } else setPositionFixed(null);
    };

    return () =>
      window.removeEventListener("scroll", (ev) => {
        console.log("event listner removed");
      });
  }, [positionFixed]);
  return (
    <div
      className={positionFixed ? classes.leftSideRoot : ""}
      id="profileContentLeftSide"
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

function Profile() {
  const classes = useStyles();
  const { userState, dispatch } = useContext(Context);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (userState.user.posts) setMyPosts(userState.user.posts);
  }, [userState.user.posts]);

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
            <h1 id="profileName" className="hc-text-white">
              {userState.user.name}
            </h1>
          </div>
        </div>
        <div id="profileNavLinks">
          <ul>
            <li className="profile-nav-link">About</li>
            <li className="profile-nav-link">Posts</li>
            <li className="profile-nav-link">Photos</li>
          </ul>
        </div>
        <div id="profileContent">
          <LeftSide />
          <div id="profileContentRightSide">
            <PostArea />
            <UserPosts usersPosts={myPosts} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
