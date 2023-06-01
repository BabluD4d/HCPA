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
import CoustomForgot from "../Api/Auth/Forgetpass/CoustomForgot";
import Logo from "../img/title.svg";
import ExportLogin from "../Api/Auth/Login/ExportLogin";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
const theme = createTheme();
export default function ForgotPassword() {
  const [loader, setloader] = React.useState(false);
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
    }),
    onSubmit: (values) => {
      setloader(true);
      ExportLogin.Forgot(values)
        .then((resp) => {
          if (resp.data) {
            if (resp.data.message == "mail send ") {
              setloader(false);
              toast.success("Please check your mail", {
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
              setloader(false);
              toast.error("Credentials are wwrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
        })
        .catch((err) => {
          setloader(false);
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
            Forgot password
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
            {loader ? (
              <div style={{ marginTop: "5%" }}>
                <center>
                  <ColorRing
                    visible={true}
                    height="100"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Forgot password
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  Sign in
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
