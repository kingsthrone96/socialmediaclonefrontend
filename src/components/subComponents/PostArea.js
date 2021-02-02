import React, { useContext, useRef } from "react";

import { Context } from "../../App";
import serverAPI from "../helpers/serverAPI";

import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5px 5px 0px 0px",
  },
  cardRoot: {
    maxWidth: "100%",
  },
}));

let body = { post: {} };
const onChange = (e = window.event) => {
  const { name, value } = e.target;
  Object.assign(body.post, { ...body.post, [name]: value });
};

function PostArea() {
  const classes = useStyles();
  const { userState, dispatch } = useContext(Context);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="postArea" className="hc-d-block">
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
      <div id="userPosts">
        <Card className={classes.cardRoot}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height=""
              image="https://hddesktopwallpapers.in/wp-content/uploads/2015/09/bright-wallpapers.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default PostArea;
