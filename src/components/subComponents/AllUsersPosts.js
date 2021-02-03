import React, { useState, useEffect, useContext, useMemo, useRef } from "react";

import { Context } from "../../App";
import serverAPI from "../helpers/serverAPI";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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
    marginTop: "20px",
  },
}));

function PostArea() {
  const classes = useStyles();
  const { userState, dispatch, allUsersPosts, setAllUsersPosts } = useContext(
    Context
  );

  const isMounted = useRef(true);

  const getAllUsersPosts = useMemo(() => {
    return async () => {
      try {
        const res = await fetch(serverAPI.getAllUsersPosts);
        const resData = await res.json();
        if (isMounted) {
          console.log(resData);
          setAllUsersPosts(resData);
        }
      } catch (error) {
        if (isMounted) {
          console.log(error);
          return null;
        }
      }
    };
  }, [setAllUsersPosts]);
  useEffect(() => {
    getAllUsersPosts();
    console.log("dfdf");
    return () => (isMounted.current = false);
  }, [getAllUsersPosts]);
  return (
    <div id="userPosts">
      {allUsersPosts.map((post) => (
        <Card className={`${classes.cardRoot} postCard`} key={post._id}>
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
            title={`${post.ref.ref_name}`}
            subheader="September 14, 2016"
          />
          <CardActionArea>
            {(
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height=""
                image="https://hddesktopwallpapers.in/wp-content/uploads/2015/09/bright-wallpapers.jpg"
                title="Contemplative Reptile"
              />
            ) && post.photo}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.textContent}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Like
            </Button>
            <Button size="small" color="primary">
              Comments
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default PostArea;
