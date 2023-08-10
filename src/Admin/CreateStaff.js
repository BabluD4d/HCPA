import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import ExportRegistration from '../Api/Auth/registration/ExportRegistration';
// import CoustomRegistration from '../Api/Auth/registration/CoustomRegistration';


const CreateStaff = () => {
  const [roleData, setroleData] = useState()
    const Navigate = useNavigate()
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
        name: "",
        mobile_number: "",
        role_id:"",
        clients:"",
        bookings:""
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
          role_id: Yup.string()
          .required("Enter your access type "),
          bookings: Yup.string()
          .required("Enter your bookings available"),
      }),
      onSubmit: (values) => {
        // CoustomRegistration(values, "Registration",Navigate)
        ExportRegistration.CreateStaff(values)
        .then((resp) => {
          if (resp.data.message == "create user successfully") { 
            toast.success("Create User successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            Navigate("/UserList");
          } else {
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
          }
        })
        .catch((err) =>
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
      },
    });
    const GetData = () => {
      ExportRegistration.getRoleId()
        .then((resp) => {
          if (resp.ok) {
            if (resp.data) {
             
              setroleData(resp.data.data);
              console.log(resp.data.data)
             
            } 
          }
        })
        .catch((err) => {
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
    };
    useEffect(() => {
      GetData()
    }, [])
    
  return (
    <div>
       <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>
        Add HCPA Staff
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
                    <TextField
                      fullWidth
                      id="fullWidth"
                      label=" No. of Clients Assgned"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      name="clients"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.clients}
                      autoComplete="current-number"
                  />
                  {formik.touched.clients && formik.errors.clients ? (
                      <div style={{ color: "red" }}>{formik.errors.clients}</div>
                  ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Box >
                <FormControl mt={3} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Access Type
                  </InputLabel>
                  <Select
                  disabled={localStorage.getItem("role") == 1?false:true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label=" Access Type"
                    name="role_id"
                    onChange={formik.handleChange}
                    value={formik.values.role_id}
                    onBlur={formik.handleBlur}
                    autoComplete="current-number"
                    // onChange={handleChange}
                  >{roleData?.map((val,i)=> val.id==3?null:<MenuItem value={val.id}>{val.role_name}</MenuItem>
                  )}
                  </Select>
                   {formik.touched.role_id && formik.errors.role_id ? (
                      <div style={{ color: "red" }}>{formik.errors.role_id}</div>
                  ) : null}
                </FormControl>
                </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                <Box>
                <FormControl mt={3} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                  Booking Available
                  </InputLabel>
                  <Select
                  disabled={localStorage.getItem("role") == 1?false:true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Booking Available"
                    // onChange={handleChange}
                    name="bookings"
                    onChange={formik.handleChange}
                    value={formik.values.bookings}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                  {formik.touched.bookings && formik.errors.bookings ? (
                      <div style={{ color: "red" }}>{formik.errors.bookings}</div>
                    ) : null}
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

export default CreateStaff
