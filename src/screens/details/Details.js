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
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

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

    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.restdetailscont}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={3}>
              <img
                className={classes.img}
                alt="complex"
                src="https://techcrunch.com/wp-content/uploads/2019/08/GettyImages-664302116.jpg?w=1390&crop=1"
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
                  Loud Silence
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.centreinsmall}
                >
                  CBD-BELAPUR
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  Chinese, continental, Indian, Italian, Snacks
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
                      654 CUSTOMERS
                    </Typography>
                  </Grid>
                  <Grid xs={6} lg={6} md={6}>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      className={classes.centreinsmall}
                    >
                      <Typography className={classes.currency}>₹</Typography>
                      <Typography>365</Typography>
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
                <Typography variant="subtitle1">CHINESE</Typography>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-circle veg"></i>
                  </ListItemIcon>
                  <ListItemText primary="Pizza" />
                  <Typography>₹ 600</Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-circle veg"></i>
                  </ListItemIcon>
                  <ListItemText primary="Cake" />
                  <Typography>₹ 800</Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-circle veg"></i>
                  </ListItemIcon>
                  <ListItemText primary="French Fries" />
                  <Typography>₹ 200</Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-circle veg"></i>
                  </ListItemIcon>
                  <ListItemText primary="Noodles" />
                  <Typography>₹ 200</Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <i className="fa fa-circle veg"></i>
                  </ListItemIcon>
                  <ListItemText primary="Fried Rice" />
                  <Typography>₹ 600</Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs="12" lg="6">
              <Card>
                <CardHeader
                  avatar={
                    <Badge badgeContent={4} color="primary">
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
                    <ListItem className={classes.nopad}>
                      <ListItemIcon>
                        <i className="fa fa-stop-circle-o veg"></i>
                      </ListItemIcon>
                      <ListItemText primary="Pizza" />
                      <ListItemText
                        primary={
                          <Box>
                            <IconButton edge="end" aria-label="comments">
                              <RemoveIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="comments">
                              <Typography>5</Typography>
                            </IconButton>
                            <IconButton edge="end" aria-label="comments">
                              <AddIcon />
                            </IconButton>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Typography>₹ 600</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
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
      </div>
    );
  }
}

export default withStyles(styles)(Details);
