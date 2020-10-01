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
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

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
      activeStep: 0,
      tabNo: 0,
      tileData: [
        {
          img: "image",
          id: 1,
        },
        {
          img: "image",
          id: 2,
        },
        {
          img: "image",
          id: 3,
        },
      ],
      selectedtile: 0,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tileSelectHandler = this.tileSelectHandler.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
      case 1:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      default:
        return "Unknown step";
    }
  }

  handleNext() {
    console.log(this.state);
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
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
  tileSelectHandler(tileno) {
    this.setState({
      selectedtile: tileno,
    });
  }
  handleFormSubmit() {}

  render() {
    const { classes } = this.props;
    console.log(this.state.selectedtile);
    return (
      <div className={classes.root}>
        <Grid container spacing="4">
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
                    <Tabs value={this.state.tabNo} onChange={this.handleChange}>
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
                      {this.state.tileData.map((tile) => (
                        <GridListTile className={classes.root}>
                          <Card
                            className={
                              this.state.selectedtile === tile.id
                                ? classes.cardselected
                                : classes.card
                            }
                          >
                            <CardContent>
                              <Typography>Nishuvi, Ground Floor, 75</Typography>
                              <Typography>
                                Dr. Annie Basant Road, Worli
                              </Typography>
                              <Typography>Mumbai</Typography>
                              <Typography>Maharashtra</Typography>
                              <Typography>500032</Typography>
                            </CardContent>
                            <CardActions>
                              <IconButton
                                className={classes.alignright}
                                key={tile.id}
                                onClick={() => this.tileSelectHandler(tile.id)}
                              >
                                <CheckCircleIcon
                                  className={
                                    this.state.selectedtile === tile.id
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
                    <form
                      className={classes.formcontrol}
                      onSubmit={this.handleFormSubmit}
                    >
                      <div>
                        <TextField label="Flat/ Buildnin No." required />
                      </div>
                      <div>
                        <TextField label="Locality" required />
                      </div>
                      <div>
                        <TextField label="City" required />
                      </div>
                      <div>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">
                            State
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={""}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <TextField
                          type="number"
                          helperText="required"
                          label="Pincode"
                          required
                        />
                      </div>
                      <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
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
                        value={"cod"}
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label="Cash on Delivery"
                        />
                        <FormControlLabel
                          value="wallet"
                          control={<Radio />}
                          label="Wallet"
                        />
                        <FormControlLabel
                          value="netbanking"
                          control={<Radio />}
                          label="Net Banking"
                        />
                        <FormControlLabel
                          value="dcc"
                          control={<Radio />}
                          label="(Debit / Credit Card"
                        />
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
              ></CardHeader>
              <CardContent className={classes.notoppad}>
                <List className={classes.nopad}>
                  <Typography component="h3">Loud Silence</Typography>
                  <ListItem className={classes.nopad}>
                    <ListItemIcon>
                      <i className="fa fa-stop-circle-o veg"></i>
                    </ListItemIcon>
                    <ListItemText primary="Pizza" />
                    <ListItemText
                      primary={
                        <Box>
                          <IconButton edge="end" aria-label="comments">
                            <Typography>5</Typography>
                          </IconButton>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography>₹ 600</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem className={classes.nopad}>
                    <Typography>
                      <b>TOTAL AMOUNT</b>
                    </Typography>
                    <ListItemSecondaryAction>
                      <Typography>
                        <b>₹ 600</b>
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
              <CardContent>
                <Button fullWidth variant="contained" color="primary">
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Checkout);
