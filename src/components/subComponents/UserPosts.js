import React, { useState, useEffect } from "react";

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

function UserPosts({ usersPosts }) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(usersPosts);
  }, [usersPosts]);
  return (
    <div id="userPosts">
      {posts.map((post) => (
        <Card className={`${classes.cardRoot} postCard`} key={post._id}>
          <CardHeader
            avatar={
              <Avatar src={post.ref.ref_pic || ''}>
                
                {post.ref.ref_name[0].toLocaleUpperCase()}
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
            {post.photo ? (
              <CardMedia
                component="img"
                alt={post.ref.ref_name}
                height=""
                image={post.photo}
                title={post.ref.ref_name}
              />
            ) : (
              ""
            )}
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

export default UserPosts;
