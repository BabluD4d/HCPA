import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ExportUser from "../Api/Admin/handleUser/ExportUser";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function EditProfil(props) {
  const { Data, GetData, setModalShow } = props;
  const [DataUser, setDataUser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const formik = useFormik({
    initialValues: {
      name: Data?.name ? Data.name : "",
      email: Data?.email ? Data.email : "",
      // Password: "",
      mobile_number: Data?.mobile_number ? Data.mobile_number : "",
      id: DataUser.user_id,
      role_id: DataUser?.role,
      payment_card: Data?.payment_card ? Data.payment_card : "",
      business_name: Data?.business_name ? Data.business_name : "",
      business_type: Data?.business_type ? Data.business_type : "",
      business_email: Data?.business_email ? Data.business_email : "",
      business_address: Data?.business_address ? Data.business_address : "",
      business_phone_no: Data?.business_phone_no ? Data.business_phone_no : "",
      states_operating_in: Data?.states_operating_in
        ? Data.states_operating_in
        : "",
      abn_name: Data?.abn_name ? Data.abn_name : "",
      registered_abn_name: Data?.registered_abn_name
        ? Data.registered_abn_name
        : "",
      trading_name: Data?.trading_name ? Data.trading_name : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Enter your name"),
      // password: Yup.string()
      //   .min(6, "Password must be 6 characters long")
      //   .required("Enter your password"),
      mobile_number: Yup.number().required("Enter your Mobile Number"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      setTimeout(() => {
        ExportUser.userUpdate(values)
          .then((resp) => {
            console.log(resp);
            if (resp.data.msg == "updated successfully") {
              setModalShow(false);
              GetData();
              toast.success("Profile updated successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              // Navigate("/Admin/AllDocumentAdmin");
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
      }, 1000);
    },
  });
  return (
    <div style={{height:"100vh",overflow:"auto"}}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <Grid container >
          <Grid xl={0.7} xs={0.7} sm={1}>
            </Grid>
          <Grid xl={5} xs={5} sm={11}>
            <Typography  mb={2}  sx={{ fontSize: "30px" }}>
              Personal information
            </Typography>
            <hr />
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
                <div style={{ color: "red" }}>
                  {formik.errors.mobile_number}
                </div>
              ) : null}
            </Box>
            {/* <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Payment Card"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="payment_card"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment_card}
                autoComplete="current-text"
              />
              {formik.touched.payment_card && formik.errors.payment_card ? (
                <div style={{ color: "red" }}>{formik.errors.payment_card}</div>
              ) : null}
            </Box> */}
          </Grid>
          <Grid xl={0.6} xs={0.6} sm={1}>
            </Grid>
          <Grid xs={5} xl={5}sm={11}>
            <Typography  mb={2} sx={{ fontSize: "30px" }}>
              Business information
            </Typography>
            <hr />
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Busines Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="business_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_name}
                autoComplete="current-text"
              />
              {formik.touched.business_name && formik.errors.business_name ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_name}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Busines Type"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="business_type"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_type}
                autoComplete="current-text"
              />
              {formik.touched.business_type && formik.errors.business_type ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_type}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Busines Email"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="business_email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_email}
                autoComplete="current-text"
              />
              {formik.touched.business_email && formik.errors.business_email ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_email}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Busines Address"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="business_address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_address}
                autoComplete="current-text"
              />
              {formik.touched.business_address &&
              formik.errors.business_address ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_address}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Busines Phone Number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="business_phone_no"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_phone_no}
                autoComplete="current-number"
              />
              {formik.touched.business_phone_no &&
              formik.errors.business_phone_no ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_phone_no}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="States Operating"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="states_operating_in"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.states_operating_in}
                autoComplete="current-text"
              />
              {formik.touched.states_operating_in &&
              formik.errors.states_operating_in ? (
                <div style={{ color: "red" }}>
                  {formik.errors.states_operating_in}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="ABN Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="abn_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.abn_name}
                autoComplete="current-text"
              />
              {formik.touched.abn_name && formik.errors.abn_name ? (
                <div style={{ color: "red" }}>{formik.errors.abn_name}</div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Legal RegistrationABN Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="registered_abn_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.registered_abn_name}
                autoComplete="current-text"
              />
              {formik.touched.registered_abn_name &&
              formik.errors.registered_abn_name ? (
                <div style={{ color: "red" }}>
                  {formik.errors.registered_abn_name}
                </div>
              ) : null}
            </Box>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Trading Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="trading_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.trading_name}
                autoComplete="current-text"
              />
              {formik.touched.trading_name && formik.errors.trading_name ? (
                <div style={{ color: "red" }}>{formik.errors.trading_name}</div>
              ) : null}
            </Box>
            <Box mt={5}>
              <Button
                sx={{ marginLeft: "10px" }}
                type="submit"
                className={"A1"}
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </Grid>
          <Grid xl={0.7} xs={0.7} sm={1}>
            </Grid>
        </Grid>
      </Box>
    </div>
  );
}
