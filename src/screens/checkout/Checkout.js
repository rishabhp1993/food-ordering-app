import React, { Component } from "react";
import { createStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./Checkout.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { constants } from "../../common/util";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import { Redirect } from "react-router";

const styles = (theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    gridList: {
      padding: theme.spacing(2, 0),
    },
    card: {
      boxShadow: "0 0",
    },
    cardselected: {
      boxShadow: " 2px 2px 0px 3px #e0265f;",
      margin: theme.spacing(1),
    },
    alignright: {
      marginLeft: "auto",
    },
    formcontrol: {
      padding: theme.spacing(1, 0),
      "& .MuiFormControl-root": {
        margin: theme.spacing(1),
        width: 200,
      },
      "& .MuiButton-root": {
        margin: theme.spacing(2, 0),
      },
      "& .MuiFormControlLabel-root": {
        margin: theme.spacing(1, 0),
      },
    },
  });

class Checkout extends Component {
  constructor(props) {
    super();
    this.state = {
      tileData: [],
      restname: null,
      restid: null,
      activeStep: 0,
      tabNo: 0,
      selectedtile: "",
      addresses: [],
      states: [],
      flatbuildingname: null,
      locality: null,
      adstate: null,
      pincode: null,
      city: null,
      pincodehelper: "",
      paymentmethods: [],
      selectedpaymentmethod: "",
      showmsg: false,
      msg: "",
      disableplaceorderbtn: false,
      isLoggedIn: true,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tileSelectHandler = this.tileSelectHandler.bind(this);
    this.handleFlatBuildingChange = this.handleFlatBuildingChange.bind(this);
    this.handleLocalityChange = this.handleLocalityChange.bind(this);
    this.handlePincodeChange = this.handlePincodeChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.pmHandler = this.pmHandler.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
    this.closeMsg = this.closeMsg.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state && sessionStorage.getItem("accesstoken")) {
      this.getAllAddress();
      this.getAllStates();
      this.getAllPaymentMethods();
      this.setState({
        tileData: this.props.location.state.finalcart,
        restname: this.props.location.state.restaurantname,
        restid: this.props.location.state.restaurantid,
        isLoggedIn: true,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }
  closeMsg() {
    setTimeout(() => this.setState({ showmsg: false }), 5000);
  }
  getAllAddress() {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json;charset=UTF-8",
        authorization: sessionStorage.getItem("accesstoken"),
      },
    };
    fetch(constants.baseurl + "/api/address/customer", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ addresses: data.addresses }));
  }
  getAllStates() {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json;charset=UTF-8",
      },
    };
    fetch(constants.baseurl + "/api/states", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ states: data.states }));
  }
  getAllPaymentMethods() {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json;charset=UTF-8",
      },
    };
    fetch(constants.baseurl + "/api/payment", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ paymentmethods: data.paymentMethods }));
  }
  handleNext() {
    if (this.state.tabNo === 0 && this.state.selectedtile !== "") {
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    }
  }
  handleBack() {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  }
  handleReset() {
    this.setState({
      activeStep: 0,
    });
  }
  handleChange(event, tab) {
    this.setState({ tabNo: tab });
  }
  tileSelectHandler(id) {
    this.setState({ selectedtile: id });
  }
  handleFlatBuildingChange(e) {
    this.setState({ flatbuildingname: e.target.value });
  }
  handleLocalityChange(e) {
    this.setState({ locality: e.target.value });
  }
  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }
  handlePincodeChange(e) {
    this.setState({ pincode: e.target.value });
  }
  handleStateChange(e) {
    this.setState({ adstate: e.target.value });
  }
  handleFormSubmit() {
    if (this.state.flatbuildingname === null) {
      this.setState({ flatbuildingname: "" });
    }
    if (this.state.locality === null) {
      this.setState({ locality: "" });
    }
    if (this.state.pincode === null || this.state.pincode === "") {
      this.setState({ pincodehelper: "required" });
    } else {
      if (this.state.pincode.length !== 6) {
        this.setState({
          pincodehelper:
            "Pincode must contain only numbers and must be 6 digits long",
        });
      } else {
        this.setState({ pincodehelper: "required" });
      }
    }
    if (this.state.city === null) {
      this.setState({ city: "" });
    }
    if (this.state.adstate === null) {
      this.setState({ adstate: "" });
    }
    if (
      this.state.flatbuildingname !== null &&
      this.state.locality !== null &&
      this.state.pincode !== null &&
      this.state.city !== null &&
      this.state.adstate !== null &&
      this.state.flatbuildingname !== "" &&
      this.state.locality !== "" &&
      this.state.pincode !== "" &&
      this.state.city !== "" &&
      this.state.pincode.length === 6 &&
      this.state.adstate !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("accesstoken"),
        },
        body: JSON.stringify({
          city: this.state.city,
          flat_building_name: this.state.flatbuildingname,
          locality: this.state.locality,
          pincode: this.state.pincode,
          state_uuid: this.state.adstate,
        }),
      };
      fetch(constants.baseurl + "/api/address", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ADDRESS SUCCESSFULLY REGISTERED") {
            this.setState({
              tabNo: 0,
              flatbuildingname: null,
              adstate: null,
              city: null,
              pincode: null,
              locality: null,
              pincodehelper: "",
            });
            this.getAllAddress();
          } else {
            alert(data.status);
          }
        });
    }
  }
  pmHandler(e) {
    this.setState({ selectedpaymentmethod: e.target.value });
  }
  checkoutHandler() {
    if (
      this.state.selectedpaymentmethod !== "" &&
      this.state.selectedtile !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({
          address_id: this.state.selectedtile,
          bill: Number(
            this.state.tileData.reduce(
              (total, itement) => total + itement.quantity * itement.item.price,
              0
            )
          ),

          coupon_id: "2ddf6284-ecd0-11e8-8eb2-f2801f1b9fd1",
          discount: 0.0,
          item_quantities: this.state.tileData.map((singleitem) => ({
            item_id: singleitem.item.id,
            price: singleitem.item.price,
            quantity: singleitem.quantity,
          })),
          payment_id: this.state.selectedpaymentmethod,
          restaurant_id: this.state.restid,
        }),
      };
      fetch(constants.baseurl + "/api/order", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ORDER SUCCESSFULLY PLACED") {
            this.setState({
              showmsg: true,
              msg: `Order placed successfully! Your order id is ${data.id}`,
              disableplaceorderbtn: true,
            });

            this.closeMsg();
          } else {
            this.setState({
              showmsg: true,
              msg: `Unable to place your order. Please try again.`,
            });
            this.closeMsg();
          }
        });
    } else {
      this.setState({
        showmsg: true,
        msg: `Please select the required fields.`,
      });
      this.closeMsg();
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.isLoggedIn) {
      return (
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={9} xs={12}>
              <Stepper
                activeStep={this.state.activeStep}
                orientation="vertical"
                style={{ padding: 0 }}
              >
                <Step key={0}>
                  <StepLabel>Delivery</StepLabel>
                  <StepContent>
                    <AppBar position="static">
                      <Tabs
                        value={this.state.tabNo}
                        onChange={this.handleChange}
                      >
                        <Tab label="EXISTING ADDRESS" />
                        <Tab label="NEW ADDRESS" />
                      </Tabs>
                    </AppBar>
                    <div
                      className={
                        this.state.tabNo === 0 ? "displayblock" : "displaynone"
                      }
                    >
                      <GridList
                        cellHeight={230}
                        className={classes.gridList}
                        cols={3}
                      >
                        <div
                          className={
                            this.state.addresses.length === 0
                              ? "displblock"
                              : "displaynone"
                          }
                        >
                          <Typography>
                            No address added. Please add a new address.
                          </Typography>
                        </div>
                        {this.state.addresses.map((address) => (
                          <GridListTile
                            key={address.id}
                            className={classes.root}
                          >
                            <Card
                              className={
                                this.state.selectedtile === address.id
                                  ? classes.cardselected
                                  : classes.card
                              }
                            >
                              <CardContent>
                                <Typography>
                                  {address.flat_building_name}
                                </Typography>
                                <Typography>{address.locality}</Typography>
                                <Typography>{address.city}</Typography>
                                <Typography>
                                  {address.state.state_name}
                                </Typography>
                                <Typography>{address.pincode}</Typography>
                              </CardContent>
                              <CardActions>
                                <IconButton
                                  className={classes.alignright}
                                  key={address.id}
                                  onClick={() =>
                                    this.tileSelectHandler(address.id)
                                  }
                                >
                                  <CheckCircleIcon
                                    className={
                                      this.state.selectedtile === address.id
                                        ? "iconcolorgreen"
                                        : "iconcolordefault"
                                    }
                                  />
                                </IconButton>
                              </CardActions>
                            </Card>
                          </GridListTile>
                        ))}
                      </GridList>
                    </div>

                    <div
                      className={
                        this.state.tabNo === 1 ? "displayblock" : "displaynone"
                      }
                    >
                      <form className={classes.formcontrol}>
                        <div>
                          <TextField
                            helperText={
                              this.state.flatbuildingname === ""
                                ? "required"
                                : ""
                            }
                            onChange={this.handleFlatBuildingChange}
                            label="Flat/ Buildnin No."
                          />
                        </div>
                        <div>
                          <TextField
                            helperText={
                              this.state.locality === "" ? "required" : ""
                            }
                            onChange={this.handleLocalityChange}
                            label="Locality"
                          />
                        </div>
                        <div>
                          <TextField
                            helperText={
                              this.state.city === "" ? "required" : ""
                            }
                            label="City"
                            onChange={this.handleCityChange}
                          />
                        </div>
                        <div>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                              State
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={
                                this.state.adstate === null
                                  ? ""
                                  : this.state.adstate
                              }
                              onChange={this.handleStateChange}
                            >
                              {this.state.states.map((state) => (
                                <MenuItem key={state.id} value={state.id}>
                                  {state.state_name}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {this.state.adstate === "" ? "required" : ""}
                            </FormHelperText>
                          </FormControl>
                        </div>
                        <div>
                          <TextField
                            type="number"
                            label="Pincode"
                            helperText={this.state.pincodehelper}
                            onChange={this.handlePincodeChange}
                          />
                        </div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.handleFormSubmit}
                        >
                          SAVE ADDRESS
                        </Button>
                      </form>
                    </div>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button disabled onClick={this.handleBack}>
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
                <Step key={1}>
                  <StepLabel>Payment</StepLabel>
                  <StepContent>
                    <form className={classes.formcontrol}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Select Mode of Payment
                        </FormLabel>
                        <RadioGroup
                          aria-label="payment"
                          name="payment"
                          value={this.state.selectedpaymentmethod}
                        >
                          {this.state.paymentmethods.map((pm) => (
                            <FormControlLabel
                              value={pm.id}
                              control={<Radio />}
                              label={pm.payment_name}
                              onClick={this.pmHandler}
                              key={pm.id}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </form>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={this.props.activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          Finish
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              </Stepper>

              {this.state.activeStep === 2 && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>
                    View the summary and place your order now!
                  </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    CHANGE
                  </Button>
                </Paper>
              )}
            </Grid>
            <Grid item lg={3} xs={12}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6" component="h2">
                      Summary
                    </Typography>
                  }
                  className={classes.nobotpad}
                  style={{ paddingBottom: "0px" }}
                ></CardHeader>
                <CardContent className={classes.notoppad}>
                  <List className={classes.nopad}>
                    <ListItem>
                      <Typography component="h3">
                        {this.state.restname}
                      </Typography>
                    </ListItem>
                    {this.state.tileData.map((cartitem) => (
                      <ListItem
                        key={cartitem.item.id}
                        className={classes.nopad}
                      >
                        <Grid item lg={1}>
                          <ListItemIcon style={{ minWidth: "0px" }}>
                            <i
                              className={
                                cartitem.item.item_type === "VEG"
                                  ? "fa fa-stop-circle-o veg"
                                  : "fa fa-stop-circle-o nonveg"
                              }
                            ></i>
                          </ListItemIcon>
                        </Grid>
                        <Grid item lg={7}>
                          <ListItemText primary={cartitem.item.item_name} />
                        </Grid>
                        <Grid item lg={2}>
                          <ListItemText
                            primary={
                              <Typography>{cartitem.quantity}</Typography>
                            }
                          />
                        </Grid>
                        <Grid item lg={2}>
                          <ListItemSecondaryAction>
                            <Typography>
                              ₹{" "}
                              {(
                                cartitem.item.price * cartitem.quantity
                              ).toFixed(2)}
                            </Typography>
                          </ListItemSecondaryAction>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <List>
                    <ListItem className={classes.nopad}>
                      <Typography>
                        <b>TOTAL AMOUNT</b>
                      </Typography>
                      <ListItemSecondaryAction>
                        <Typography>
                          <b>
                            ₹{" "}
                            {this.state.tileData
                              .reduce(
                                (total, itement) =>
                                  total + itement.quantity * itement.item.price,
                                0
                              )
                              .toFixed(2)}
                          </b>
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
                <CardContent>
                  <Button
                    disabled={this.state.disableplaceorderbtn}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.checkoutHandler}
                  >
                    Checkout
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
    } else {
      return <Redirect to="/home" />;
    }
  }
}

export default withStyles(styles)(Checkout);
