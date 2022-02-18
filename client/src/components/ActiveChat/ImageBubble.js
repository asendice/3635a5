import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ImageList, ImageListItem } from "@material-ui/core";

const useStyles = makeStyles(() => ({

  img: {
    width: 150,
    height: 150,
    borderRadius: "10px 10px 0 10px",
  }
}));

const ImageBubble = (props) => {
  const classes = useStyles();
  const { urls } = props;
  return (
    <ImageList className={classes.imgList} cols={urls.length} rowHeight={150}>
      {urls.map((url) => (
        <ImageListItem key={url}>
          <img
            alt={url}
            src={url}
            className={classes.img}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageBubble;
