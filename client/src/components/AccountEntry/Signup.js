import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import SideBanner from "./SideBanner";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formContent: {
    height: 500,
    width: 650,
    maxWidth: "80%",
    margin: "auto",
    marginTop: 120,
  },
  formControl: {
    width: "100%",
  },
  input: {
    padding: "10px 5px",
  },
  header: {
    fontSize: 40,
    fontWeight: 600,
  },
  inputContainer: {
    marginTop: 30,
  },
  adornment: {
    color: "#3A8DFF",
    cursor: "pointer",
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#3A8DFF",
    color: "#fff",
    width: 160,
    height: 56,
    borderRadius: "3px",
    fontWeight: 700,
    fontSize: 16,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <SideBanner />
      <Grid xs={12} sm={8}>
        <Header text="Already have an account?" btnText="Login" route="login" />
        <form onSubmit={handleRegister}>
          <Grid className={classes.formContent}>
            <Typography className={classes.header}>
              Create an account.
            </Typography>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.formControl}
              >
                <Box className={classes.inputContainer}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: 24, color: "#B0B0B0" },
                    }}
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                margin="normal"
                required
                className={classes.formControl}
              >
                <Box className={classes.inputContainer}>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: 24, color: "#B0B0B0" },
                    }}
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                error={!!formErrorMessage.confirmPassword}
                className={classes.formControl}
              >
                <Box className={classes.inputContainer}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: 24, color: "#B0B0B0" },
                    }}
                  />
                </Box>
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={classes.btnContainer}>
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                size="large"
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
