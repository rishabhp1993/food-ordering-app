import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { createStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { constants } from "../../common/util";

const styles = (theme) =>
  createStyles({
    flexgrow: {
      flexGrow: 1,
    },
    root: {
      padding: theme.spacing(6),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
      },
    },
    label: {
      backgroundColor: "orange",
      color: "#fff",
      padding: theme.spacing(0.5),
      fontSize: "1rem",
      display: "flex",
      flexWrap: "nowrap",
      width: "90px",
      alignItems: "center",
      alignContent: "space-between",
    },

    media: {
      height: 140,
    },
    cardcontrol: {
      minHeight: "100px",
    },
    removelinkdec: {
      textDecoration: "none",
    },
  });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchtext: "",
      carddata: [],
    };
    this.filterCards = this.filterCards.bind(this);
    this.getAllRestaurants = this.getAllRestaurants.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ searchtext: nextProps.searchtxt }, this.filterCards);
  }
  componentDidMount() {
    this.getAllRestaurants();
  }
  getAllRestaurants() {
    fetch(constants.baseurl + "/api/restaurant")
      .then((response) => response.json())
      .then((data) => this.setState({ carddata: data.restaurants }));
  }
  filterCards() {
    if (this.state.searchtext.trim() !== "") {
      fetch(
        constants.baseurl +
          "/api/restaurant/name/" +
          this.state.searchtext.trim()
      )
        .then((response) => response.json())
        .then((data) => this.setState({ carddata: data.restaurants }))
        .catch(this.setState({ carddata: null }));
    } else {
      this.getAllRestaurants();
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {this.state.carddata === null ? (
              <Typography>No restaurants with the given name.</Typography>
            ) : (
              <>
                {this.state.carddata.map((restourant) => (
                  <Grid item xs={12} sm={6} lg={3} key={restourant.id}>
                    <Link
                      className={classes.removelinkdec}
                      to={`/details/${restourant.id}`}
                    >
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={restourant.photo_URL}
                            title={restourant.restaurant_name}
                          />
                          <CardContent className={classes.cardcontrol}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {restourant.restaurant_name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {restourant.categories.split(",").join(", ")}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          style={{ justifyContent: "space-between" }}
                        >
                          <div color="secondary" className={classes.label}>
                            <StarIcon className={classes.flexgrow}></StarIcon>
                            <div className={classes.flexgrow}>
                              {restourant.customer_rating +
                                "(" +
                                restourant.number_customers_rated +
                                ")"}
                            </div>
                          </div>
                          <Typography>
                            {"₹" + restourant.average_price + " for 2"}
                          </Typography>
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Home);
