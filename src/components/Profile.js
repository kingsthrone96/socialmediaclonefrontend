import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import { Redirect } from "react-router-dom";
import "./styles/profile.scss";

import { makeStyles } from "@material-ui/core/styles";
import { ACTION } from "../Reducer";
import serverAPI from "./helpers/serverAPI";
import { uploadImageToFirebase } from "./helpers/uploadImage";
import { createMuiTheme } from "@material-ui/core/styles";
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
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/purple";

const useStyles = makeStyles((theme) => ({
  landingProfile: {
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

  profileContent: {
    position: "fixed",
    top: "68px",
    maxHeight: "98vh",
  },

  button: {
    backgroundColor: purple[500],
    color: "#fff",
  },
}));

const LeftSide = () => {
  const classes = useStyles();
  const [image, setImage] = useState();
  const [imageFor, setImageFor] = useState();
  const { userState, dispatch } = useContext(Context);

  const handleChangeImageFile = (e, imgFor) => {
    console.log("handleChange event fired");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageFor(imgFor);
      console.log(e.target.files[0]);
    } else {
      console.log("no file");
    }
  };

  const saveChange = async (url) => {
    try {
      const res = await fetch(serverAPI.changeProfilePictures, {
        method: "POST",
        headers: {
          authToken: window.localStorage.authToken,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          image: {
            imageFor,
            imagePath: url,
          },
        }),
      });

      const resData = await res.json();
      dispatch({ type: ACTION.CHANGE_PROFILE_PICTURES, payload: resData });
      setImageFor();
      setImage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="profileContentLeftSide">
      <List component="nav" aria-label="main mailbox folders">
        <label htmlFor="selectProfileImg">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Change Profile Picture" />
          </ListItem>
        </label>
        <input
          type="file"
          id="selectProfileImg"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => handleChangeImageFile(e, "currentProfilePicture")}
          style={{ display: "none" }}
        />
        <label htmlFor="selectBgImg">
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Change background Picture" />
          </ListItem>
        </label>
        <input
          type="file"
          id="selectBgImg"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => handleChangeImageFile(e, "currentBackgroundPicture")}
          style={{ display: "none" }}
        />
      </List>
      <Divider />
      {image && (
        <div id="profilePreviewImage">
          <img src={URL.createObjectURL(image)} alt="preview" width="100%" />
          <Button
            color="primary"
            variant="contained"
            onClick={() => uploadImageToFirebase(userState, image, saveChange)}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

function Profile() {
  const classes = useStyles();
  const { userState, dispatch } = useContext(Context);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (userState.user.posts) setMyPosts(userState.user.posts);
    // window.onscroll = () => {
    //   if(window.scrollY >= 437) {

    //   }
    // }
  }, [userState.user.posts]);

  if (!userState.isLoggedIn) return <Redirect to="/signIn" />;
  return (
    <>
      <Navbar />
      <div id="profile" className="hc-container">
        <div
          id="landingProfile"
          className={classes.landingProfile}
          style={{
            backgroundImage: userState.user.profile
              ? `url('${userState.user.profile.currentBackgroundPicture}')`
              : "",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className={classes.avatarContainer}>
            <Avatar
              alt={userState.user.name}
              src={
                userState.user.profile
                  ? userState.user.profile.currentProfilePicture
                  : ""
              }
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
