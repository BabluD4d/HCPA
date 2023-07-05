import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ExportModiles from "../Api/Admin/Modules/ExportModiles";

export default function CreactModules() {
  const Navigate = useNavigate()
  const [ProductData, setProductData] = useState(JSON.parse(localStorage.getItem("Product")))
  const formik = useFormik({
    initialValues: {
      product_id:ProductData.products_id,
      module_status:false,
      module_name: "",
    },
    validationSchema: Yup.object({
      module_name: Yup.string()
            .required("Enter your product name"),
    }),
    onSubmit: (values) => {
        ExportModiles.CreateModules(values)
        .then((resp) => {
          if (resp.data.message=="Module save successfully") {
            toast.success('Module Created successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              Navigate(-1)
          }else{
            if(resp.data.errors.module_name[0]){
              toast.error(resp.data.errors.module_name[0], {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              })
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
              })
          }
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
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>Create Modules</Typography>
      <Box mt={5}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12} md={2} lg={3} mb={2}>
              <div style={{ display: "flex" }}>
                <ArrowBackIcon className='back-icon-proact' onClick={() => Navigate(-1)} />
              </div>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Box>
                <TextField
                  disabled
                  id="filled-disabled"
                  label="Product Name"
                  defaultValue="Hello World"
                  variant="filled"
                  fullWidth
                  value={ProductData?.product_name}
                />
              </Box>
              <Box mt={5}>
                <TextField
                  fullWidth
                  id="fullWidth"
                  label="Modules Name "
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  name="module_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.module_name}
                  autoComplete="current-number"
              />
              {formik.touched.module_name && formik.errors.module_name ? (
                  <div style={{ color: "red" }}>{formik.errors.module_name}</div>
              ) : null}
              </Box>
              <Box mt={5}>
                <FormControl>
                  <FormLabel
                    id="demo-form-control-label-placement"
                  >
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    defaultValue="top"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.module_status}
                    autoComplete="current-number" >
                    <FormControlLabel
                      value={true}
                      name="module_status"
                      control={<Radio />}
                      label="Lock"
                      labelPlacement="Lock"
                    />
                    <FormControlLabel
                      defaultChecked
                      value={false}
                      name="module_status"
                      control={<Radio />}
                      label="Unlock"
                      labelPlacement="Unlock"
                    />
                  </RadioGroup>
                  {/* {formik.values.module_status} */}
                  {formik.touched.module_status && formik.errors.module_status ? (
                    <div style={{ color: "red" }}>{formik.errors.module_status}</div>
                ) : null}
                </FormControl>
              </Box>
              <Box mt={3}>
                <Button
                type="submit"
                sx={{width:{xs:'100%', sm:'auto'}}}
                  className={"A1"}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
