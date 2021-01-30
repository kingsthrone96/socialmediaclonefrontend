import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5px 5px 0px 0px",
  },
}));

function PostArea() {
  const classes = useStyles();
  return (
    <div id="postArea" className="hc-d-block">
      <div id="postSomething">
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={5}
          placeholder="Post Something"
          className="textArea"
        />
      </div>
      <div id="postBtns">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
        >
          Post
        </Button>
        <IconButton>
          <PhotoCameraIcon />
        </IconButton>
      </div>
      <div id="usePosts"></div>
    </div>
  );
}

export default PostArea;
