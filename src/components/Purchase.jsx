import { ExitToApp, Home, LocalMall, ShoppingCart } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, CardContent, CardMedia, Dialog } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import "../CSS/Purchase.css";
import User from "../services/User";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  let localCart = localStorage.getItem("localCart");

  // console.log(localCart);
  if (localCart === "undefined" || localCart === "null" || localCart === null) {
    localCart = [];
  } else {
    console.log(localCart);
    localCart = JSON.parse(localCart);
  }

  const theme = useTheme();
  const [purchase, setPurchase] = useState();
  const [open, setOpen] = React.useState(false);
  const [cartData] = useState(localCart);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handlePurchaseOpen = (date, total, products) => {
    console.log(products);
  };

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    User.getPurchases(localStorage.getItem("userId")).then((res) => {
      setPurchase(res.data.data.purchases);
    });
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkOut = () => {
    let total = 0;
    let products = [];
    for (let i in cartData) {
      total += cartData[i].quantity * cartData[i].price;
      products.push(cartData[i].id);
    }
    let data = { total: total, products: products };
    User.addPurchase(localStorage.getItem("userId"), data);
  };

  if (localStorage.getItem("isLoggedIn") === "false") {
    return <Redirect to="/" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "rgb(86, 100, 210)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            E-Commerce
          </Typography>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{ color: "white" }}
          >
            <ShoppingCart sx={{ flexGrow: 0.06 }} />
          </Button>
          <ExitToApp />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component={Link} href="/home">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} href="/purchases">
            <ListItemIcon>
              <LocalMall />
            </ListItemIcon>
            <ListItemText primary="Purchase history" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative" }}
          style={{ backgroundColor: "rgb(86, 100, 210)" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cart
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {cartData &&
            cartData.map((data) => (
              <div>
                <ListItem button>
                  <CardMedia component="img" height="140" image={data.img} />
                  <ListItemText primary={data.quantity} secondary={data.name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          <Button
            variant="contained"
            onClick={checkOut}
            style={{ backgroundColor: "rgb(86, 100, 210)" }}
          >
            Checkout
          </Button>
        </List>
      </Dialog>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <List>
          {purchase &&
            purchase.map((data) => (
              <div key={data._id}>
                <ListItem
                  button
                  onClick={() =>
                    handlePurchaseOpen(data.date, data.total, data.products)
                  }
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      style={{ marginBottom: "150px" }}
                      component="div"
                    >
                      {"Purchased on " + data.date.slice(0, 10)}
                    </Typography>
                  </CardContent>
                  <ListItemText
                    style={{ position: "absolute", marginLeft: "15px" }}
                    primary={"Total : ₹" + data.total}
                  />
                  {data.products &&
                    data.products !== [] &&
                    data.products.map((product) => (
                      <Card
                        sx={{ minWidth: 200 }}
                        style={{ float: "left", margin: "15px" }}
                        key={product._id}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.img}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {product.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                </ListItem>
                <Divider />
              </div>
            ))}
          {/* <Button variant="contained">Checkout</Button> */}
        </List>
      </Box>
    </Box>
  );
}
