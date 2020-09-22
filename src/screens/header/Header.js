import React, { Component } from "react";
import { createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#253338",
      main: "#253338",
      dark: "#253338",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ddd",
      main: "#ddd",
      dark: "#ddd",
      contrastText: "#000",
    },
  },
});

const styles = (theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    grow: {
      flexGrow: 1,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    searchIcon: {
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    search: {
      position: "relative",
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "300px",
      },
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0, 0, 2, 0),
      },
    },
    inputRoot: {
      color: "white",
      width: "300px",
      paddingLeft: "30px",
      "&::placeholder": {
        color: "white",
      }
    },
    inputFocused: {
      borderBottom: "2px solid #fff",
    },
    signinbutton: {
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0, 0, 2, 0),
      },
    },
  });

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ThemeProvider theme={outerTheme}>
          <AppBar position="static" color="primary">
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <FastfoodIcon fontSize="large" />
              </IconButton>

              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <TextField
                  id="standard-required"
                  InputProps={{
                    classes: {
                      input: classes.inputRoot,
                      focused: classes.inputFocused,
                    },
                  }}
                  placeholder="Search by Restraunt Name..."
                />
              </div>
              <div className={classes.grow} />
              <Button
                variant="contained"
                color="default"
                className={classes.signinbutton}
                startIcon={<AccountCircle />}
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
