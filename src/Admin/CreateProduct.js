import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
export default function CreateProduct() {
  const Navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_status: false
    },
    validationSchema: Yup.object({
      product_name: Yup.string()
            .required("Enter your product name"),
    }),
    onSubmit: (values) => {
        // CoustomRegistration(values, "Registration")
        Exportproduct.CreateProduct(values)
        .then((resp) => {
          console.log(resp)
          if (resp.data.message=="Product save successfully") {
            toast.success('Product Created successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              Navigate('/Productlist')
          }else{
            toast.error('Something went wrong', {
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
        .catch((err) => toast.error('Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }));
    },
});
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Create Product
      </Typography>
      <hr height={3} />
      <div style={{display:"flex"}}>
     <ArrowBackIcon onClick={()=>Navigate('/Productlist')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
      </div>
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Create Product"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              name="product_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.product_name}
              autoComplete="current-number"
          />
          {formik.touched.product_name && formik.errors.product_name ? (
              <div style={{ color: "red" }}>{formik.errors.product_name}</div>
          ) : null}
            <Box mt={5}>
           <Button type="submit"  sx={{marginLeft:"10px"}} className={"A1"} variant="contained">Submit</Button>
           </Box>
           </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </div>
  );
}
