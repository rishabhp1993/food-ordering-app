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

import { withStyles } from "@material-ui/core/styles";

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
  });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carddata: [
        {
          imageurl:
            "https://techcrunch.com/wp-content/uploads/2019/08/GettyImages-664302116.jpg?w=1390&crop=1",
          title: "Ohri's Rubayat",
          cuisine: "Chinese",
          rating: 4.8,
          ratingcount: 25,
          cost: 450,
        },
        {
          imageurl:
            "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/restaurant_2_0.jpg?itok=O-ku-c9X",
          title: "Kitchen Kingt",
          cuisine: "North Indian",
          rating: 4.2,
          ratingcount: 48,
          cost: 600,
        },
        {
          imageurl:
            "https://media.timeout.com/images/105239239/1372/772/image.jpg",
          title: "Night Sky",
          cuisine: "Arabian, Nort Indian, Continental",
          rating: 3.9,
          ratingcount: 12,
          cost: 900,
        },
        {
          imageurl:
            "https://media-cdn.tripadvisor.com/media/photo-s/0c/4c/6d/98/photo1jpg.jpg",
          title: "13 Dhaba",
          cuisine: "Chinese",
          rating: 3.2,
          ratingcount: 92,
          cost: 800,
        },
        {
          imageurl:
            "https://media-cdn.tripadvisor.com/media/photo-s/04/96/fb/89/african-queen.jpg",
          title: "Mustang",
          cuisine: "Indian, Drinks",
          rating: 4.7,
          ratingcount: 43,
          cost: 1200,
        },
        {
          imageurl:
            "https://img.etimg.com/thumb/msid-70709213,width-300,imgsize-786355,,resizemode-4,quality-100/restaurant-bccl.jpg",
          title: "Sky High",
          cuisine: "Snacks, Drinks, Sweet Dish",
          rating: 4.1,
          ratingcount: 12,
          cost: 1200,
        },
      ],
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {this.state.carddata.map((restourant) => (
            <Grid item xs={12} sm={6} lg={3}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={restourant.imageurl}
                    title={restourant.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {restourant.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {restourant.cuisine}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <div color="secondary" className={classes.label}>
                    <StarIcon className={classes.flexgrow}></StarIcon>
                    <div className={classes.flexgrow}>
                      {restourant.rating + "(" + restourant.ratingcount + ")"}
                    </div>
                  </div>
                  <Typography>{"₹" + restourant.cost + " for 2"}</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
