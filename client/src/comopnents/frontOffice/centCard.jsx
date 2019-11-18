import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import { Avatar } from 'antd';
import profilePicture from "../img/profileImage_nonGender-220.png";
import ShowMore from "react-show-more";
import "./centCard.css";

const useStyles = makeStyles(theme => ({
  expand: {
    color: "#343a40",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    color: "#343a40",
    transform: "rotate(180deg)"
  },
  avatar: {
    margin: 10,
    width: 120,
    height: 120
  }
}));

function MediaControlCard({ item }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  return (
    <div className="post">
      <Avatar
        alt={item.name}
        src={
          item.photo
            ? `http://mediterraneedestalents.org/${item.photo}`
            : profilePicture
        }
        className={classes.avatar}
      />

      <div className="bio">
        <h2 className="card-title">{item.name.toUpperCase()}</h2>
        <ShowMore
          lines={3}
          more={
            <i
              className="fas fa-chevron-down expand"
              onClick={handleExpandClick}
            />
          }
          less={
            <i
              className="fas fa-chevron-up expand-up"
              onClick={handleExpandClick}
            />
          }
        >
          {item.bio}
        </ShowMore>
      </div>
    </div>
  );
}

export default MediaControlCard;
