import React, { useRef, useContext } from "react";
import serverAPI from "../helpers/serverAPI";
import { Context } from "../../App";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SendIcon from "@material-ui/icons/Send";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

let body = { post: {} };
const onChange = (e = window.event) => {
  const { name, value } = e.target;
  Object.assign(body.post, { ...body.post, [name]: value });
};
function PostArea() {
  const { userState, dispatch, setAllUsersPosts } = useContext(Context);
  const postTextArea = useRef(null);

  const submitPost = async (e = window.event) => {
    e.preventDefault();
    try {
      const res = await fetch(serverAPI.postSomething, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authToken: window.localStorage.authToken,
        },
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      postTextArea.current.value = "";
      console.log(resData);
      setAllUsersPosts((prev) => [resData.newPost, ...prev]);
      body = { post: {} };
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
        >
          Send
        </Button>
        <IconButton aria-label="photo">
          <PhotoCameraIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default PostArea;
