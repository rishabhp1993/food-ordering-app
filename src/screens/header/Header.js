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
import Snackbar from "@material-ui/core/Snackbar";
import { constants } from "../../common/util";

//Styles
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
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
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
      userid: "",
      password: "",
      useridreq: false,
      passwordreq: false,
      isloggedin: false,
      anchorEl: null,
      isopen: false,
      firstname: null,
      lastname: null,
      email: null,
      contactno: null,
      setpassword: null,
      incorrectcredentials: false,
      invalidphoneno: false,
      showmsg: false,
      msg: "",
      userdetails: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignupSignupSubmit = this.handleSignupSignupSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSetPasswordChange = this.handleSetPasswordChange.bind(this);
    this.handleContactNoChange = this.handleContactNoChange.bind(this);
    this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
  }
  componentDidMount() {
    //Checking if access token is available
    if (sessionStorage.getItem("accesstoken") !== null) {
      //Setting state to logged in
      this.setState({ isloggedin: true });
    } else {
      //Setting state to logged out
      this.setState({ isloggedin: false });
    }
  }
  //Metod to handle modal popup open
  handleOpen() {
    this.setState({ modalopen: true });
  }
  //Metod to handle modal popup close
  handleClose() {
    this.setState({
      modalopen: false,
      userid: "",
      password: "",
      firstname: null,
      lastname: null,
      email: null,
      contactno: null,
      setpassword: null,
      incorrectcredentials: false,
      invalidphoneno: false,
      useridreq: false,
      passwordreq: false,
    });
  }
  //Metod to handle cahnging of tabs in login/signup modal
  handleTabChange(event, tab) {
    this.setState({ tabNo: tab });
  }
  //Metod to handle search input
  handleSearchKeyDown(event) {
    this.props.searchhandler(event.target.value);
  }
  //Metod to handle change in first name
  handleFirstNameChange(e) {
    this.setState({ firstname: e.target.value });
  }
  //Metod to handle change in last name
  handleLastNameChange(e) {
    this.setState({ lastname: e.target.value });
  }
  //Metod to handle change in email
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  //Metod to handle password change
  handleSetPasswordChange(e) {
    this.setState({ setpassword: e.target.value });
  }
  //Metod to handle change in contact no.
  handleContactNoChange(e) {
    this.setState({ contactno: e.target.value });
  }
  //Metod to handle change in user id
  handleUserIdChange(e) {
    this.setState({ userid: e.target.value });
  }
  //Metod to handle password change
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  //Metod to handle Login form submit
  handleLoginFormSubmit() {
    if (this.state.userid === "") {
      this.setState({ useridreq: true, invalidphoneno: false });
    } else {
      this.setState({ useridreq: false });
      //Checking if phone number is less than 10 digits
      if (this.state.userid.length !== 10) {
        this.setState({ invalidphoneno: true });
      } else {
        this.setState({ invalidphoneno: false });
      }
    }

    if (this.state.password === "") {
      this.setState({ passwordreq: true });
    } else {
      this.setState({ passwordreq: false });
    }

    if (this.state.password !== "" && this.state.userid !== "") {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json;charset=UTF-8",
          authorization: `Basic ${btoa(
            this.state.userid + ":" + this.state.password
          )}`,
        },
      };
      //Calling Login API
      fetch(`${constants.baseurl}/api/customer/login`, requestOptions)
        .then((response) => {
          //Setting access token
          sessionStorage.setItem(
            "accesstoken",
            response.headers.get("access-token")
          );
          return response.json();
        })
        .then((data) => {
          if (data.message === "LOGGED IN SUCCESSFULLY") {
            sessionStorage.setItem("username", data.first_name);
            this.setState({
              isloggedin: true,
              modalopen: false,
              incorrectcredentials: false,
              showmsg: true,
              msg: data.message,
              userid: "",
              password: "",
            });
            setTimeout(this.closeSuccessMsg, 5000);
          } else if (data.message === "Invalid Credentials") {
            this.setState({ incorrectcredentials: true });
          }
        });
    }
  }
  //Metod to handle Success Login message
  closeSuccessMsg() {
    this.setState({ showmsg: false });
  }
  //Metod to handle Signup form submit
  handleSignupSignupSubmit() {
    if (this.state.firstname == null) {
      this.setState({ firstname: "" });
    }
    if (this.state.lastname == null) {
      this.setState({ lastname: "" });
    }
    if (this.state.email == null) {
      this.setState({ email: "" });
    }
    if (this.state.setpassword == null) {
      this.setState({ setpassword: "" });
    }
    if (this.state.contactno == null) {
      this.setState({ contactno: "" });
    }
    if (
      this.state.firstname !== null &&
      this.state.lastname !== null &&
      this.state.email !== null &&
      this.state.setpassword !== null &&
      this.state.contactno !== null &&
      this.state.firstname !== "" &&
      this.state.lastname !== "" &&
      this.state.email !== "" &&
      this.state.setpassword !== "" &&
      this.state.contactno !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_number: this.state.contactno,
          email_address: this.state.email,
          first_name: this.state.firstname,
          last_name: this.state.lastname,
          password: this.state.setpassword,
        }),
      };
      //Calling Signup API
      fetch(`${constants.baseurl}/api/customer/signup`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "CUSTOMER SUCCESSFULLY REGISTERED") {
            this.setState({
              showmsg: true,
              msg: data.status,
              modalopen: false,
            });
          } else {
            this.setState({ msg: data.message, showmsg: true });
          }
        });
    }
  }
  //Metod to clsoe message
  handleCloseMenu() {
    this.setState({ anchorEl: null, isopen: false });
  }
  //Metod to handle menu
  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget, isopen: true });
  }
  //Metod to handle logout
  handleLogout() {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json;charset=UTF-8",
        authorization: sessionStorage.getItem("accesstoken"),
      },
    };
    fetch(`${constants.baseurl}/api/customer/logout`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "LOGGED OUT SUCCESSFULLY") {
          sessionStorage.removeItem("accesstoken");
          sessionStorage.removeItem("username");
          this.setState({ isloggedin: false });
          this.handleCloseMenu();
        } else {
          alert(data.message);
        }
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ThemeProvider theme={outerTheme}>
          <AppBar position="static" style={{ background: "#253338" }}>
            <Toolbar className={classes.toolbar}>
              <Link to={"/"}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <FastfoodIcon style={{ color: "#fff" }} fontSize="large" />
                </IconButton>
              </Link>

              <div className={classes.grow} />
              {window.location.pathname === "/" ? (
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
              ) : null}
              <div className={classes.grow} />
              <div style={{ margin: "10px 0" }}>
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
              </div>
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
                  <Typography style={{ marginLeft: "5px" }}>
                    {sessionStorage.getItem("username")}
                  </Typography>
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
                          label="Contact No"
                          required
                        />
                      </div>
                      <span
                        className={
                          this.state.invalidphoneno === false
                            ? "displaynone"
                            : "displayblock errortext"
                        }
                      >
                        Invalid Contact
                      </span>
                      <span
                        className={
                          this.state.useridreq === false
                            ? "displaynone"
                            : "displayblock errortext"
                        }
                      >
                        required
                      </span>
                      <div>
                        <TextField
                          onChange={this.handlePasswordChange}
                          type="password"
                          label="Password"
                          required
                        />
                      </div>
                      <span
                        className={
                          this.state.passwordreq === false
                            ? "displaynone"
                            : "displayblock errortext"
                        }
                      >
                        required
                      </span>
                      <span
                        className={
                          this.state.incorrectcredentials === false
                            ? "displaynone"
                            : "displayblock errortext"
                        }
                      >
                        Invalid Credentials
                      </span>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          onClick={this.handleLoginFormSubmit}
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
                    <div className={classes.formcontrol}>
                      <div>
                        <TextField
                          helperText={
                            this.state.firstname === "" ? "required" : ""
                          }
                          onChange={this.handleFirstNameChange}
                          label="First Name"
                          required
                        />
                      </div>
                      <div>
                        <TextField
                          helperText={
                            this.state.lastname === "" ? "required" : ""
                          }
                          onChange={this.handleLastNameChange}
                          label="Last Name"
                          required
                        />
                      </div>
                      <div>
                        <TextField
                          helperText={this.state.email === "" ? "required" : ""}
                          onChange={this.handleEmailChange}
                          label="Email"
                          required
                        />
                      </div>
                      <div>
                        <TextField
                          helperText={
                            this.state.setpassword === "" ? "required" : ""
                          }
                          onChange={this.handleSetPasswordChange}
                          type="password"
                          label="Password"
                          required
                        />
                      </div>
                      <div>
                        <TextField
                          type="number"
                          helperText={
                            this.state.contactno === "" ? "required" : ""
                          }
                          onChange={this.handleContactNoChange}
                          label="Contact Number"
                          required
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSignupSignupSubmit}
                        >
                          SIGNUP
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
        <Snackbar
          open={this.state.showmsg}
          message={this.state.msg}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Header);
