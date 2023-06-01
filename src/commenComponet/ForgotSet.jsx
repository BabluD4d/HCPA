import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../img/title.svg";
import ExportLogin from "../Api/Auth/Login/ExportLogin";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
const theme = createTheme();
function ForgotSet() {
  const params = useParams();
  const [loader, setloader] = React.useState(false);
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: params.email,
      token: params.token,
      password: "",
      CnfP:""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .required("Enter your password"),
        CnfP: Yup.string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password'), null], "Passwords doesn't match")
    }),
    onSubmit: (values) => {
      setloader(true);
      ExportLogin.ForgotSetUpdate(values)
        .then((resp) => {
          if (resp.data) {
            if (resp.data.message == "change  password") {
              setloader(false);
              toast.success("Password change successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              Navigate("/")
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
            Change password
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
             <Box  sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              name="CnfP"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.CnfP}
              autoComplete="current-CnfP"
            />
            {formik.touched.CnfP && formik.errors.CnfP ? (
              <div style={{ color: "red" }}>{formik.errors.CnfP}</div>
            ) : null}
            </Box>
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
                Change Password
              </Button>
            )}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default ForgotSet;
