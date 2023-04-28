import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from "yup";
import ExportApi from '../Api/ExportApi';
import { Link } from 'react-router-dom';
import CoustomForgot from '../Api/Auth/Forgetpass/CoustomForgot';
import Logo from '../img/title.svg'
const theme = createTheme();
export default function ForgotPassword() {
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
            console.log(CoustomForgot(values,"Forgot"))
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        // display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignContent: "center",
                        justifyContent: "center"
                    }}
                >
                   <img
                    style={{ marginLeft: "44%" }}
                    src={Logo}
                    width={60}
                    alt=""
                  />
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Forgot password
                        </Button>
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
    )
}
