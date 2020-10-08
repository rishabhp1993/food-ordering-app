import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import "./Details.css";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import CardContent from "@material-ui/core/CardContent";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const styles = (theme) =>
  createStyles({
    restdetailscont: {
      backgroundColor: "#e7e7e7",
      padding: theme.spacing(2),
      display: "flex",
    },
    restitemscont: {
      padding: theme.spacing(2),
      display: "flex",
    },
    img: {
      width: "100%",
    },
    currency: {
      marginRight: "5px",
      fontWeight: "bold",
      fontSize: "1.5 rem",
    },
    centreinsmall: {
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
        justifyContent: "center",
      },
    },
    nopad: {
      padding: "0",
      margin: "0",
    },
    notoppad: {
      paddingTop: "0",
    },
    nobotpad: {
      paddingBottom: "0",
    },
  });

class Details extends Component {
  constructor(props) {
    super();

    this.state = {
      restdetails: {},
      menu: [
        {
          cuisineid: "1",
          cuisine: "Chinese",
          items: [
            { itemid: "1", item: "Veg Noodles", price: 200, type: "veg" },
            { itemid: "2", item: "Rice Bowl", price: 350, type: "veg" },
            { itemid: "3", item: "Shushi", price: 150, type: "nonveg" },
            { itemid: "4", item: "Hot and Sour Soup", price: 300, type: "veg" },
            { itemid: "5", item: "Bean Curd", price: 150, type: "nonveg" },
            { itemid: "6", item: "Dumplings", price: 250, type: "nonveg" },
          ],
        },
        {
          cuisineid: "2",
          cuisine: "Indian",
          items: [
            { itemid: "7", item: "Samosa", price: 50, type: "veg" },
            { itemid: "8", item: "Rajma Chawal", price: 150, type: "veg" },
            { itemid: "9", item: "Biryani", price: 250, type: "nonveg" },
            {
              itemid: "10",
              item: "Hot and Sour Soup",
              price: 300,
              type: "nonveg",
            },
            { itemid: "11", item: "Bean Curd", price: 150, type: "veg" },
            { itemid: "12", item: "Kassa", price: 250, type: "nonveg" },
          ],
        },
      ],
      cart: [],
      isLoaded: false,
      showmsg: false,
      msg: "",
    };
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.setIsLoaded = this.setIsLoaded.bind(this);
    this.addItemHandler = this.addItemHandler.bind(this);
    this.substractItemHandler = this.substractItemHandler.bind(this);
    this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
  }
  handleAddItemToCart(e) {
    let dataitemid = e.currentTarget.getAttribute("data-itemid");
    let datacuisineid = e.currentTarget.getAttribute("data-cuisineid");
    let filtered = this.state.restdetails.categories.filter(
      (x) => x.id === datacuisineid
    );
    let doublefilter = filtered[0].item_list.filter((y) => y.id === dataitemid);
    if (this.state.cart.length !== 0) {
      let filteredcart = this.state.cart.filter(
        (cartitem) => cartitem.item.id === dataitemid
      );
      if (filteredcart.length !== 0) {
        this.setState((prevState) => ({
          cart: prevState.cart.map((el) =>
            el.item.id === dataitemid
              ? { ...el, quantity: el.quantity + 1 }
              : el
          ),
        }));
      } else {
        let obj = { item: doublefilter[0], quantity: 1 };
        this.state.cart.push(obj);
        this.setState({ cart: this.state.cart, showmsg: true });
        setTimeout(this.closeSuccessMsg, 5000);
      }
    } else {
      let obj = { item: doublefilter[0], quantity: 1 };
      this.state.cart.push(obj);
      this.setState({
        cart: this.state.cart,
        showmsg: true,
        msg: "Item added to cart!",
      });
      setTimeout(this.closeSuccessMsg, 5000);
    }
  }
  componentDidMount() {
    fetch(
      "http://192.168.0.106:8080/api/restaurant/" +
        this.props.match.params.restaurantid
    )
      .then((response) => response.json())
      .then((data) => this.setState({ restdetails: data }, this.setIsLoaded));
  }
  setIsLoaded() {
    this.setState({ isLoaded: true });
  }
  addItemHandler(e) {
    let dataitemid = e.currentTarget.getAttribute("data-itemid");

    this.setState((prevState) => ({
      cart: prevState.cart.map((el) =>
        el.item.id === dataitemid ? { ...el, quantity: el.quantity + 1 } : el
      ),
    }));
    this.setState({ showmsg: true, msg: "Item quantity increased by 1!" });
    setTimeout(this.closeSuccessMsg, 5000);
  }
  substractItemHandler(e) {
    let dataitemid = e.currentTarget.getAttribute("data-itemid");
    let dataitemquantity = e.currentTarget.getAttribute("data-quantity");
    if (dataitemquantity !== "1") {
      this.setState((prevState) => ({
        cart: prevState.cart.map((el) =>
          el.item.id === dataitemid ? { ...el, quantity: el.quantity - 1 } : el
        ),
      }));
      this.setState({ showmsg: true, msg: "Item quantity decreased by 1!" });
      setTimeout(this.closeSuccessMsg, 5000);
    } else {
      this.setState((prevState) => ({
        cart: prevState.cart.filter((x) => x.item.id !== dataitemid),
      }));
    }
  }
  closeSuccessMsg() {
    this.setState({ showmsg: false });
  }
  render() {
    const { classes } = this.props;
    console.log(this.props.match.params.restaurantid);
    return this.state.isLoaded === true ? (
      <>
        <div className={classes.restdetailscont}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={3}>
              <img
                className={classes.img}
                alt="complex"
                src={this.state.restdetails.photo_URL}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={9}
              container
              direction={"column"}
              className={classes.centreinsmall}
              spacing={3}
            >
              <Grid item>
                <Typography color="textPrimary" variant="h4">
                  {this.state.restdetails.restaurant_name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.centreinsmall}
                >
                  {this.state.restdetails.address.locality}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {this.state.restdetails.categories.map(
                    (categories) => categories.category_name + "," + " "
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid xs={6} lg={6} md={6}>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      className={classes.centreinsmall}
                    >
                      <StarIcon fontSize="small"></StarIcon>
                      <Typography>4.4</Typography>
                    </Box>
                    <Typography color={"textSecondary"} variant="subtitle2">
                      AVERAGE RATING BY
                    </Typography>
                    <Typography color={"textSecondary"} variant="subtitle2">
                      {this.state.restdetails.number_customers_rated} CUSTOMERS
                    </Typography>
                  </Grid>
                  <Grid xs={6} lg={6} md={6}>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      className={classes.centreinsmall}
                    >
                      <Typography className={classes.currency}>₹</Typography>
                      <Typography>
                        {this.state.restdetails.average_price}
                      </Typography>
                    </Box>
                    <Typography color={"textSecondary"} variant="subtitle2">
                      AVERAGE COST FOR
                    </Typography>
                    <Typography color={"textSecondary"} variant="subtitle2">
                      2 PEOPLE
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.restitemscont}>
          <Grid container spacing="4">
            <Grid item xs="12" lg="6">
              <List>
                {this.state.restdetails.categories.map((csngrp) => (
                  <div key={csngrp.id}>
                    <Typography variant="subtitle1">
                      {csngrp.category_name.toUpperCase()}
                    </Typography>
                    <Divider />
                    {csngrp.item_list.map((itemgrp) => (
                      <ListItem key={itemgrp.id}>
                        <ListItemIcon>
                          <i
                            className={
                              itemgrp.item_type === "VEG"
                                ? "fa fa-circle veg"
                                : " fa fa-circle nonveg"
                            }
                          ></i>
                        </ListItemIcon>
                        <ListItemText
                          color={"textSecondary"}
                          primary={itemgrp.item_name}
                        />
                        <Typography>₹ {itemgrp.price}</Typography>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            data-cuisineid={csngrp.id}
                            data-itemid={itemgrp.id}
                            onClick={this.handleAddItemToCart}
                          >
                            <AddIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </div>
                ))}
              </List>
            </Grid>
            <Grid item xs="12" lg="6">
              <Card>
                <CardHeader
                  avatar={
                    <Badge
                      badgeContent={this.state.cart.length}
                      color="primary"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  }
                  title={
                    <Typography variant="h6" component="h2">
                      <b>My Cart</b>
                    </Typography>
                  }
                  className={classes.nobotpad}
                ></CardHeader>
                <CardContent className={classes.notoppad}>
                  <List className={classes.nopad}>
                    {this.state.cart.map((cartitem) => (
                      <ListItem className={classes.nopad}>
                        <Grid item lg="1">
                          <ListItemIcon>
                            <i
                              className={
                                cartitem.item.item_type === "VEG"
                                  ? "fa fa-stop-circle-o veg"
                                  : "fa fa-stop-circle-o nonveg"
                              }
                            ></i>
                          </ListItemIcon>
                        </Grid>
                        <Grid item lg="5">
                          <ListItemText
                            style={{ color: "gray" }}
                            primary={cartitem.item.item_name}
                          />
                        </Grid>
                        <Grid item lg="3">
                          <ListItemText
                            primary={
                              <Box>
                                <IconButton
                                  onClick={this.substractItemHandler}
                                  edge="end"
                                  aria-label="comments"
                                  data-itemid={cartitem.item.id}
                                  data-quantity={cartitem.quantity}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="comments">
                                  <Typography>{cartitem.quantity}</Typography>
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="comments"
                                  onClick={this.addItemHandler}
                                  data-itemid={cartitem.item.id}
                                  data-quantity={cartitem.quantity}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            }
                          />
                        </Grid>
                        <Grid item lg="3">
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
                    <ListItem className={classes.nopad}>
                      <Typography>
                        <b>TOTAL AMOUNT</b>
                      </Typography>
                      <ListItemSecondaryAction>
                        <Typography>
                          ₹
                          <b>
                            {this.state.cart.reduce(
                              (total, item) =>
                                total + item.quantity * item.item.price,
                              0
                            )}
                          </b>
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
        <Snackbar
          open={this.state.showmsg}
          message={this.state.msg}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
      </>
    ) : (
      "Please Wait"
    );
  }
}

export default withStyles(styles)(Details);
