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
import CoustomRegistration from "../Api/Auth/registration/CoustomRegistration";
import Logo from "../img/title.svg";
import { ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
const theme = createTheme();

export default function Registration() {
  const [loader, setloader] = React.useState(false);
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile_number: "",
      role_id: 3,
      status: true,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .required("Enter your password"),
      mobile_number: Yup.number().required("Enter your Mobile Number"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
      name: Yup.string().required("Enter your name"),
    }),
    onSubmit: (values) => {
      setloader(true);
      CoustomRegistration(values, "RegistrationUser", Navigate, setloader);
    },
  });
  return (
    <ThemeProvider theme={theme}>
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

      <Container component="main" maxWidth="xs">
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
          {/* <Avatar sx={{ ml: "42%", mb: "10px",width:"80px",height:"80px"  }}> */}
          <img style={{ marginLeft: "44%" }} src={Logo} width={60} alt="" />
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              // autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
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
            <TextField
              margin="normal"
              fullWidth
              name="mobile_number"
              label="Mobile"
              type="number"
              id="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile_number}
              autoComplete="current-number"
            />
            {formik.touched.mobile_number && formik.errors.mobile_number ? (
              <div style={{ color: "red" }}>{formik.errors.mobile_number}</div>
            ) : null}
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
                    colors={[
                      "#0CB4D0",
                      "#0CB4D0",
                      "#0CB4D0",
                      "#0CB4D0",
                      "#0CB4D0",
                    ]}
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
                  Sign Up
                </Button>
              </>
            )}
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
                <Link to="/" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
