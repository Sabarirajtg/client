import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function PaymentPage(props) {
  const [openOTP, setOpenOTP] = useState(false);

  const handlePay = (event) => {
    event.preventDefault();

    window.location.replace("/purchases");
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter Card Number"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="date"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="CVV"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Phone Number"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    style={{ height: "55px" }}
                    variant="outlined"
                    onClick={() => setOpenOTP(true)}
                  >
                    Send OTP
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {openOTP && (
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Enter OTP"
                      autoFocus
                    />
                  )}
                </Grid>
              </Grid>
              {/* <br />
              <Grid container spacing={2}></Grid> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handlePay}
                sx={{ mt: 3, mb: 2 }}
              >
                Pay now
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/home" variant="body2">
                    Go back
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
