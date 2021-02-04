import React, { useRef, useContext, useState } from "react";
import serverAPI from "../helpers/serverAPI";
import { Context } from "../../App";
import { uploadImageToFirebase } from "../helpers/uploadImage";

import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SendIcon from "@material-ui/icons/Send";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 5px 0 0",
  },

  input: {
    display: "none",
  },
}));

function PostArea() {
  const classes = useStyles();
  const { userState, setAllUsersPosts } = useContext(Context);
  const [bodyPost, setBodyPost] = useState({ post: {} });
  const postTextArea = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const inputFile = useRef(null);
  console.log("post area render counting");

  const handleChangeImageFile = (e = window.event) => {
    console.log("handleChange event fired");
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setDisabled(false);
      console.log(e.target.files[0]);
    } else {
      console.log("no file");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setBodyPost((prev) => ({
      post: {
        ...prev.post,
        [name]: value,
      },
    }));

    if (postTextArea.current.value.length > 0) setDisabled(false);
    else setDisabled(true);
  };

  const submitPost = (e = window.event) => {
    const submit = async (url) => {
      try {
        const res = await fetch(serverAPI.postSomething, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            authToken: window.localStorage.authToken,
          },
          body: url
            ? JSON.stringify({
                post: {
                  ...bodyPost.post,
                  photo: url,
                },
              })
            : JSON.stringify(bodyPost),
        });
        const resData = await res.json();
        postTextArea.current.value = "";

        console.log(resData);
        setDisabled(true);
        setAllUsersPosts((prev) => [resData.newPost, ...prev]);
      } catch (error) {
        console.log(error);
      }
    };
    e.preventDefault();
    if (image) {
      uploadImageToFirebase(userState, image, submit);
      inputFile.current.value = "";
      setImage(null);
    } else submit();
  };

  const cancelPost = () => {
    postTextArea.current.value = "";
    setImage(null);
    setDisabled(true);
  };

  return (
    <div id="postArea">
      <form id="postSomething" onSubmit={submitPost}>
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={1}
          placeholder="Write Something"
          name="textContent"
          ref={postTextArea}
          onChange={onChange}
        />
        {image && (
          <img
            id="previewImage"
            src={URL.createObjectURL(image)}
            alt="post-pic"
          />
        )}
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          disabled={disabled ? true : false}
          className={classes.button}
        >
          Send
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          endIcon={<DeleteIcon />}
          disabled={disabled ? true : false}
          className={`${classes.button}`}
          onClick={cancelPost}
        >
          Cancel
        </Button>
        <input
          accept=".png, .jpg, .jpeg"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={(e) => handleChangeImageFile(e)}
          ref={inputFile}
        />
        <label htmlFor="icon-button-file">
          <IconButton component="span">
            <PhotoCameraIcon />
          </IconButton>
        </label>
      </form>
    </div>
  );
}

export default PostArea;
