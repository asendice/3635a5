import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: 375,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: 40,
    marginTop: 30,
  },

  text: {
    color: "#B0B0B0"
  },

  btn: {
    color: "#3A8DFF",
    width: 170,
    height: 54,
    boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2)",
    borderRadius: 5,
  }

}))

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { text, route, btnText } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>{text}</Typography>
      <Button className={classes.btn} onClick={() => history.push(`/${route}`)}>{btnText}</Button>
    </Box>
  )

}

export default Header;