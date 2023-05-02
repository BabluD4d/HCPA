import React from 'react'
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import CoustomRegistration from '../Api/Auth/registration/CoustomRegistration';
export default function CreateUser() {
  const Navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      mobile_number: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be 8 characters long")
        .required("Enter your password"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
      name: Yup.string()
        .required("Enter your name"),
      mobile_number: Yup.number()
        .required("Enter your Mobile Number"),
    }),
    onSubmit: (values) => {
      CoustomRegistration(values, "Registration")
    },
  });
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Add User
      </Typography>
      <hr height={3} />
      <div style={{ display: "flex" }}>
        <ArrowBackIcon onClick={() => Navigate('/UserList')} style={{ color: "#0cb4d0", fontSize: "50px" }} />
      </div>
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Name"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                name="name"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Email"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="email"
                // autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Password"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="current-password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Mobile"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="mobile_number"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile_number}
                autoComplete="current-number"
            />
            {formik.touched.mobile_number && formik.errors.mobile_number ? (
                <div style={{ color: "red" }}>{formik.errors.mobile_number}</div>
            ) : null}
            </Box>
            <Box mt={5}>
              <Button sx={{ marginLeft: "10px" }} type='submit' className={"A1"} variant="contained">Submit</Button>
            </Box>
            </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </div>
  )
}
