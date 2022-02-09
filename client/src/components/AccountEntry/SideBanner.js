import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImg from "../../images/bg-img.png";
import bubble from "../../icons/bubble.svg";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    background: `linear-gradient(180deg, rgba(58, 141, 255, .85) 0%, rgba(134, 185, 255, .85) 100%), url(${bgImg})`,
    backgroundSize: "cover",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
  },
  icon: {
    width: 86,
    height: 85,
  },
  text: {
    marginTop: 30,
    color: "#fff",
    fontSize: 35,
    textAlign: "center",
    padding: "10px 50px"
  }
}))

const SideBanner = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} xs={12} sm={4}>
      <Box className={classes.content}>
        <img src={bubble} alt="chat icon" className={classes.icon} />
        <Typography className={classes.text}>
          Converse with anyone with any language
        </Typography>
      </Box>
    </Grid>
  )
}

export default SideBanner;