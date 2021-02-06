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
              <Avatar src="https://th.bing.com/th/id/R94294ba1011d000c39b9a18d3f626a6a?rik=PjDl2mRHB%2fSCAQ&riu=http%3a%2f%2fstatic.muctim.com.vn%2fdata%2fteen360%2fpictures%2f2020%2f07%2f24%2f1595602853_its-okay-to-not-be-okay-netflix-seo-ye-ji-scaled-1593568786475819819524.jpg&ehk=o8EqorTP%2fXvuFkIwJ7JEkdxsanPLE37x2z%2bgiNFcv%2bc%3d&risl=&pid=ImgRaw">
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
