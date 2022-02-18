import React, { useState } from "react";
import { FormControl, FilledInput, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  postMessage,
  uploadImagesCloudinary,
} from "../../store/utils/thunkCreators";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    padding: "0 10px"
  },
  fileIcon: {
    color: "#777",
    cursor: "pointer"
  },
  hiddenInput: {
    display: "none",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleImages = (event) => {
    setImages((prevImages) => [...prevImages, event.target.files[0]]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const arrayOfImages = await uploadImagesCloudinary(images);
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      attachments: arrayOfImages,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setText("");
    setImages([]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <div>
                <label for="file-input">
                  <FileCopyIcon className={classes.fileIcon} />
                </label>
                <input
                  className={classes.hiddenInput}
                  name="images"
                  id="file-input"
                  type="file"
                  onChange={handleImages}
                />
              </div>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
