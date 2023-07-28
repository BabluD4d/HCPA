import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../img/title.svg";
import { CoustomLogin } from "../Api/Auth/Login/CoustomLogin";
import ExportLogin from "../Api/Auth/Login/ExportLogin";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [loader, setloader] = React.useState(false);
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .required("Enter your password"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
    }),
    onSubmit: (values) => {
      setloader(true)
      ExportLogin.Login(values)
        .then((resp) => {
          setloader(false)
          setTimeout(() => {
            
            if (resp.data.message == "Credentials are wrong") {
              toast.error("Credentials are wrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              setloader(false)
              if (resp.data.data) {
                localStorage.setItem("Token", resp.data.data.token);
                localStorage.setItem("userdata", JSON.stringify(resp.data.data));
                localStorage.setItem("role", resp.data.data.role);
                if (resp.data.data.role !=3) {
                  Navigate("/Admin");
                } else {
                  Navigate("/Home");
                }
              }
            }
          });
        })
        .catch((err) => {
          setloader(false)
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
    
      <Container component="main" maxWidth="xs">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            // display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ marginLeft: "44%" }} src={Logo} width={60} alt="" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete="current-password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                 {loader ? (
        <div >
          <center>
            <ColorRing
              visible={true}
              height="60"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#0CB4D0", "#0CB4D0", "#0CB4D0", "#0CB4D0", "#0CB4D0"]}
            />
          </center>
        </div>
      ) : (
        <>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            </>)}
            <Grid container>
              <Grid item xs>
                <Link to={"/ForgotPassword"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                {/* <Link to="/signup" variant="body2">
                 Create Account
                </Link> */}
              </Grid>
              <Grid item xs>
                <Link to="/signup" variant="body2">
                  Create Account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      
    </ThemeProvider>
  );
}
