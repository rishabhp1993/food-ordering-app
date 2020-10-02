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
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import outerTheme from "../../common/Theme";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./Header.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

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
      },
    },
    inputFocused: {
      borderBottom: "2px solid #fff",
    },
    signinbutton: {
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(0, 0, 2, 0),
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      border: 0,
      outline: "0",
    },
    modalcontent: {
      padding: theme.spacing(2),
    },
    formcontrol: {
      "& .MuiFormControl-root": {
        width: "100%",
        margin: theme.spacing(1, 0),
      },
      "& .MuiButton-root": {
        margin: theme.spacing(2, 0),
      },
    },
    popover: { marginTop: theme.spacing(5) },
  });

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      modalopen: false,
      tabNo: 0,
      userid: null,
      password: null,
      isloggedin: false,
      anchorEl: null,
      isopen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("isLoggedIn")) {
      this.setState({ isloggedin: true });
    } else {
      this.setState({ isloggedin: false });
    }
  }
  handleOpen() {
    this.setState({ modalopen: true });
  }

  handleClose() {
    this.setState({ modalopen: false });
  }
  handleTabChange(event, tab) {
    this.setState({ tabNo: tab });
  }

  handleSearchKeyDown(event) {
    this.props.searchhandler(event.target.value);
  }
  handleUserIdChange(e) {
    this.setState({ userid: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleFormSubmit() {
    if (this.state.userid == null) {
      this.setState({ userid: "" });
    }
    if (this.state.password == null) {
      this.setState({ password: "" });
    }
    if (this.state.userid === "admin" && this.state.password === "admin") {
      localStorage.setItem("isLoggedIn", true);
      this.setState({ isloggedin: true, modalopen: false });
    }
  }
  handleCloseMenu() {
    this.setState({ anchorEl: null, isopen: false });
  }
  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget, isopen: true });
  }
  handleLogout() {
    localStorage.removeItem("isLoggedIn");
    this.setState({ isloggedin: false });
    this.handleCloseMenu();
  }
  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div className={classes.root}>
        <ThemeProvider theme={outerTheme}>
          <AppBar position="static" style={{ background: "#253338" }}>
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
                  onKeyUp={this.handleSearchKeyDown}
                />
              </div>
              <div className={classes.grow} />
              <Button
                variant="contained"
                color="default"
                startIcon={<AccountCircle />}
                onClick={this.handleOpen}
                className={
                  this.state.isloggedin ? "displaynone" : "displayblock"
                }
              >
                Login
              </Button>
              <div>
                <IconButton
                  className={
                    this.state.isloggedin ? "displayblock" : "displaynone"
                  }
                  edge="end"
                  color="inherit"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                >
                  <AccountCircleIcon />
                  <Typography style={{ marginLeft: "5px" }}>UpGrad</Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={this.state.isopen}
                  onClose={this.handleCloseMenu}
                  className={classes.popover}
                >
                  <MenuItem
                    component={Link}
                    to={"/profile"}
                    onClick={this.handleProfileClick}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.modalopen}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modalopen}>
            <div className={classes.paper}>
              <Paper square className={classes.modalcontent}>
                <Tabs
                  value={this.state.tabNo}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleTabChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="LOGIN" />
                  <Tab label="SIGNUP" />
                </Tabs>
                <div>
                  <div
                    className={
                      this.state.tabNo === 0 ? "displayblock" : "displaynone"
                    }
                  >
                    <div className={classes.formcontrol}>
                      <div>
                        <TextField
                          onChange={this.handleUserIdChange}
                          helperText={
                            this.state.userid === "" ? "required" : ""
                          }
                          label="Contact No"
                          required
                        />
                      </div>
                      <div>
                        <TextField
                          onChange={this.handlePasswordChange}
                          type="password"
                          label="Password"
                          helperText={
                            this.state.password === "" ? "required" : ""
                          }
                          required
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          onClick={this.handleFormSubmit}
                          color="primary"
                        >
                          LOGIN
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.tabNo === 1 ? "displayblock" : "displaynone"
                    }
                  >
                    <form className={classes.formcontrol}>
                      <div>
                        <TextField label="First Name" required />
                      </div>
                      <div>
                        <TextField label="Last Name" required />
                      </div>
                      <div>
                        <TextField label="Email" required />
                      </div>
                      <div>
                        <TextField type="password" label="Password" required />
                      </div>
                      <div>
                        <TextField
                          type="number"
                          label="Contact Number"
                          required
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Button variant="contained" color="primary">
                          SIGNUP
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
