import React, { useRef, useContext, useState } from "react";
import serverAPI from "../helpers/serverAPI";
import { Context } from "../../App";

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
}));

function PostArea() {
  const classes = useStyles();
  const { setAllUsersPosts } = useContext(Context);
  const [bodyPost, setBodyPost] = useState({ post: {} });
  const postTextArea = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const onChange = (e = window.event) => {
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

  const cancelPost = () => {
    postTextArea.current.value = "";
    setDisabled(true);
  };

  const submitPost = async (e = window.event) => {
    e.preventDefault();
    try {
      const res = await fetch(serverAPI.postSomething, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authToken: window.localStorage.authToken,
        },
        body: JSON.stringify(bodyPost),
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
  return (
    <div id="postArea">
      <form id="postSomething" onChange={onChange} onSubmit={submitPost}>
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={1}
          placeholder="Write Something"
          name="textContent"
          ref={postTextArea}
        />
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
        <IconButton aria-label="photo">
          <PhotoCameraIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default PostArea;
