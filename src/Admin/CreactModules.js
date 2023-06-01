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
      <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Create Modelus
        </Typography>
        <hr height={3} />
        <div style={{ display: "flex" }}>
          <ArrowBackIcon onClick={() => Navigate(-1)} style={{ color: "#0cb4d0", fontSize: "50px" }} />
        </div>
        <Box mt={5}>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Box mt={5}>
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
                label="Modelus Name "
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
                  sx={{ marginLeft: "10px" }}
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
                  autoComplete="current-number"
             
             
                >
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
                    labelPlacement="Unlock
                    "
                  />
                </RadioGroup>
                {/* {formik.values.module_status} */}
                {formik.touched.module_status && formik.errors.module_status ? (
                  <div style={{ color: "red" }}>{formik.errors.module_status}</div>
              ) : null}
              </FormControl>
              </Box>
              <Box mt={5}>
                <Button
                type="submit"
                  sx={{ marginLeft: "10px" }}
                  className={"A1"}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
              </Box>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
