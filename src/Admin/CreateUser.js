import React from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
      mobile_number: "",
      payment:"Pending",
      checklist_status:"Incomplete"
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .required("Enter your password"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
      name: Yup.string()
        .required("Enter your name"),
      mobile_number: Yup.string()
        .required("Enter your Mobile Number"),
    }),
    onSubmit: (values) => {
      CoustomRegistration(values, "Registration", Navigate)
    },
  });
  return (
    <div>
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>
        Add User
      </Typography>
      <Box mt={3}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12} md={2} lg={3} mb={2}>
              <ArrowBackIcon className='back-icon-proact' onClick={() => Navigate('/UserList')} />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <TextField
                      fullWidth
                      id="fullWidth"
                      label="Mobile"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      name="mobile_number"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile_number}
                      autoComplete="current-number"
                  />
                  {formik.touched.mobile_number && formik.errors.mobile_number ? (
                      <div style={{ color: "red" }}>{formik.errors.mobile_number}</div>
                  ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormControl mt={3} fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native"
                        sx={{
                            transform: formik.values.payment === undefined ? 'translate(20px, 18px)!important': 'translate(14px, -6px) scale(0.75)!important',
                            '&.Mui-focused':{
                              transform: 'translate(18px, -6px) scale(0.75)!important',
                            }
                        }}
                      >
                        Payment
                      </InputLabel>
                      <Select
                        disabled={localStorage.getItem("role") == 1?false:true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="payment"
                        name="payment"
                        onChange={formik.handleChange}
                        value={formik.values.payment}
                        onBlur={formik.handleBlur}
                        autoComplete="current-number"
                      >
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Approved"}>Approved</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <FormControl mt={3} fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native"
                        sx={{
                            transform: formik.values.checklist_status === undefined ? 'translate(20px, 18px)!important': 'translate(14px, -6px) scale(0.75)!important',
                            '&.Mui-focused':{
                              transform: 'translate(18px, -6px) scale(0.75)!important',
                            }
                        }}
                      >
                        CheckLists
                      </InputLabel>
                      <Select
                        disabled={localStorage.getItem("role") == 1?false:true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="checklist_status"
                        name="checklist_status"
                        onChange={formik.handleChange}
                        value={formik.values.checklist_status}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value={"Complete"}>Complete</MenuItem>
                        <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button className="w-100 A1" type='submit' variant="contained">Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}
