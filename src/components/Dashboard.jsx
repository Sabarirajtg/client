import { ExitToApp, Home, LocalMall, ShoppingCart } from "@mui/icons-material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import { alpha, styled, useTheme } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Product from "../services/Product";
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function Dashboard() {
  let localCart = localStorage.getItem("localCart");

  if (localCart === "undefined" || localCart === "null" || localCart === null) {
    localCart = [];
  } else {
    localCart = JSON.parse(localCart);
  }

  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");
  const [cartData, setCartData] = useState(localCart);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    Product.getAllProducts().then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cartData));
  }, [cartData]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const checkOut = () => {
    let total = 0;
    let products = [];
    for (let i in cartData) {
      total += cartData[i].quantity * cartData[i].netValue;
      products.push(cartData[i].id);
    }
    let data = { total: total, products: products };
    User.addPurchase(localStorage.getItem("userId"), data).then(
      window.location.replace("/payment")
    );
  };

  const addToCart = (id, img, name, price) => {
    let quantity = 1;
    let netValue = price;
    let item = { id, img, name, quantity, price, netValue };
    for (let i in cartData) {
      if (cartData[i].id === item.id) {
        item.quantity += cartData[i].quantity;
        item.netValue += cartData[i].netValue;
        cartData.splice(i, 1);
        break;
      }
    }
    const data = [...cartData, item]; //merge two array of objects
    // localCartData = data;
    setCartData(data);
  };

  const add = (id, name, img, price, quantity, netValue) => {
    let item = { id, img, name, quantity, price, netValue };
    for (let i in cartData) {
      if (cartData[i].id === item.id) {
        item.quantity += 1;
        item.netValue = price * quantity + price;
        cartData.splice(i, 1);
        break;
      }
    }
    const data = [...cartData, item]; //merge two array of objects
    setCartData(data);
  };

  const sub = (id, name, img, price, quantity, netValue) => {
    let item = { id, img, name, quantity, price, netValue };
    for (let i in cartData) {
      if (cartData[i].id === item.id) {
        if (item.quantity === 1) {
          cartData.splice(i, 1);
        } else {
          item.quantity -= 1;
          item.netValue = price * quantity - price;
          cartData.splice(i, 1);
          const data = [...cartData, item]; //merge two array of objects
          setCartData(data);
        }
        break;
      }
    }
  };

  if (localStorage.getItem("isLoggedIn") === "false") {
    return <Redirect to="/" />;
  }

  const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    window.location.replace("/");
  };

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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{ color: "white" }}
          >
            <ShoppingCart sx={{ flexGrow: 0.06 }} />
          </Button>
          <Button onClick={logout} style={{ color: "white" }}>
            <ExitToApp />
          </Button>
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
      <div>
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
            </Toolbar>
          </AppBar>
          <List style={{ position: "relative" }}>
            <TableContainer style={{ padding: "10px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Product</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Net Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData &&
                    cartData.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>
                          <CardMedia
                            component="img"
                            height="140"
                            align="center"
                            image={data.img}
                            style={{ paddingLeft: "100px", width: "250px" }}
                            sx={{ height: 250, padding: 3 }}
                          />
                        </TableCell>
                        <TableCell align="center">{data.name}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() =>
                              add(
                                data.id,
                                data.name,
                                data.img,
                                data.price,
                                data.quantity,
                                data.netValue
                              )
                            }
                          >
                            <AddCircleRoundedIcon />
                          </Button>
                          &nbsp;
                          {data.quantity}
                          &nbsp;
                          <Button
                            variant="contained"
                            onClick={() =>
                              sub(
                                data.id,
                                data.name,
                                data.img,
                                data.price,
                                data.quantity,
                                data.netValue
                              )
                            }
                          >
                            <RemoveRoundedIcon />
                          </Button>
                        </TableCell>
                        <TableCell align="center">{data.price}</TableCell>
                        <TableCell align="center">{data.netValue}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {console.log(cartData)}
            {cartData && cartData.length > 0 && (
              <Button
                variant="contained"
                onClick={checkOut}
                style={{
                  backgroundColor: "rgb(86, 100, 210)",
                  position: "absolute",
                  right: 10,
                }}
              >
                Checkout
              </Button>
            )}
            {cartData && cartData < 1 && <h3>No products found in the cart</h3>}
          </List>
        </Dialog>
      </div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>
          {products &&
            products !== [] &&
            products
              .filter((data) => {
                if (search == null) return data;
                else {
                  if (data.name.toLowerCase().includes(search.toLowerCase())) {
                    return data;
                  } else {
                    return null;
                  }
                }
              })
              .map((product) => (
                <Card
                  sx={{ width: 240 }}
                  style={{ float: "left", margin: "15px" }}
                  key={product._id}
                >
                  <CardMedia component="img" height="140" image={product.img} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <br />
                    <Typography gutterBottom variant="h5" component="div">
                      {"₹" + product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.img,
                          product.name,
                          product.price
                        )
                      }
                      style={{ backgroundColor: "rgb(86, 100, 210)" }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="small"
                      style={{ color: "rgb(86, 100, 210)" }}
                      sx={{ flexGrow: 1 }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              ))}
        </div>
      </Box>
    </Box>
  );
}
