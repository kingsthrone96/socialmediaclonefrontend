import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));
function LeftSide({ userState, dispatch }) {
  const classes = useStyles();
  return (
    <div id="leftArea">
      <Avatar
        alt="Remy Sharp"
        src={
          userState.user.profile
            ? userState.user.profile.currentProfilePicture
            : ""
        }
        className={classes.large}
      />
      <h4 id="profileName">{userState.user.name}</h4>
      <div className={classes.root}>
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
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default LeftSide;
