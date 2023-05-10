import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Futer from "../../commenComponet/Futer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import ExportUser from "../../Api/Admin/handleUser/ExportUser";
const UserInfo = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [DataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [Data, setData] = useState([])
  const GetData = () => {
    let obj={
      user_id:DataUser.user_id
  
    }
    ExportUser.GetEditData(obj).then(
      (resp) => {
        if (resp.ok) {
          if (resp.data) {
            let obj={...resp?.data?.data?.user, ...resp.data.data.business
            }
            console.log("user",obj)
            setData(obj);
          }
        }
      }
    );
  }
  useEffect(() => {
    GetData()
  }, [])
  const formik = useFormik({
    initialValues: {
      name:Data?.name?Data.name: "",
      email: Data?.email?Data.email: "",
      // Password: "",
      mobile_number: Data?.mobile_number?Data.mobile_number: "",
      id: DataUser.user_id,
      role_id: DataUser?.role,
      payment_card: Data?.payment_card?Data.payment_card: "",
      business_name: Data?.business_name?Data.business_name: "",
      business_type: Data?.business_type?Data.business_type: "",
      business_email: Data?.business_email?Data.business_email: "",
      business_address: Data?.business_address?Data.business_address: "",
      business_phone_no: Data?.business_phone_no?Data.business_phone_no: "",
      states_operating_in: Data?.states_operating_in?Data.states_operating_in: "",
      abn_name: Data?.abn_name?Data.abn_name: "",
      registered_abn_name: Data?.registered_abn_name?Data.registered_abn_name: "",
      trading_name: Data?.trading_name?Data.trading_name: "",
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
            if (resp.data.msg=="updated successfully") {
              setModalShow(false)
              GetData()
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
            }else{
              toast.error('Something went rong', {
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
            toast.error("Something went rong", {
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
    <div>
      <Grid container spacing={4}>
        <Grid item xs={1}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
            Profile
          </Typography>
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid mt={4} item xs={2}>
          <Button onClick={() => setModalShow(true)} className="Edit" variant="outlined">
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      <hr height={3} />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "24px" }}>
            Personal information
          </Typography>
          <Typography mt={1.5} ml={6} sx={{ fontSize: "18px" }}>
            Name
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            {Data?.name}
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            ID
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            {Data?.user_id}
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Password
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            ********
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Email
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            {Data?.email}
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Mobile
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
          {Data?.mobile_number}
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Payment Card
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
          {Data?.payment_card?Data?.payment_card:"Mastercard ending in 0000"}
          </Typography>
        </Grid>
        <Grid ml={4} item xs={2.5}>
          <Typography mt={4} ml={4} sx={{ fontSize: "24px" }}>
            Business information
          </Typography>
          <Typography mt={1.5} pl={7} sx={{ fontSize: "18px" }}>
            {" "}
            Busines Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Type
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            An ABN
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Address
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            West NSW
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Email
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Lucy@gmail.com
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Mobile
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            +61 123 456 7890
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Phone Number
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            +61 123 456 7890
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            States Operating In
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Mastercard ending in 0000
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            ABN Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Legal RegistrationABN Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Trading Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
        </Grid>
      </Grid>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <Typography mt={2}mb={2} ml={6} sx={{ fontSize: "30px" }}>
          Personal information
          </Typography>
          <hr/>
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
            {/* <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Password"
                type="text"
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
            </Box> */}
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
            <Box mt={3}>
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
                <div style={{ color: "red" }}>
                  {formik.errors.payment_card}
                </div>
              ) : null}
            </Box>
            <Typography mt={3}mb={2} ml={6} sx={{ fontSize: "30px" }}>
            Business information
          </Typography>
          <hr/>
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
                value={formik.values.business_name }
                autoComplete="current-text"
              />
              {formik.touched.business_name  && formik.errors.business_name  ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_name }
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
            {/* <Box mt={3}>
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
            </Box> */}
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
                name="business_addres"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business_addres}
                autoComplete="current-text"
              />
              {formik.touched.business_addres && formik.errors.business_addres ? (
                <div style={{ color: "red" }}>
                  {formik.errors.business_addres}
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
              {formik.touched.business_phone_no && formik.errors.business_phone_no ? (
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
              {formik.touched.states_operating_in && formik.errors.states_operating_in ? (
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
                <div style={{ color: "red" }}>
                  {formik.errors.abn_name}
                </div>
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
              {formik.touched.registered_abn_name && formik.errors.registered_abn_name ? (
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
                <div style={{ color: "red" }}>
                  {formik.errors.trading_name}
                </div>
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
          </Box>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
      <Futer />
    </div>
  );
};

export default UserInfo;
