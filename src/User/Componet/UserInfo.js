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
import EditProfil from "../../Admin/EditProfil";
import ExportChangePassword from "../../Api/user/profile/ExportChangePassword";
const UserInfo = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [Show, setShow] = React.useState(false);
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
      new_password:"",
      confirm_password:  "",
      old_password:"",
      user_id:DataUser.user_id
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      old_password: Yup.string()
      .min(6, "Password must be 6 characters long")
      .required("Enter your password"),
      new_password: Yup.string()
      .min(6, "Password must be 6 characters long")
      .required("Enter your password"),
      confirm_password: Yup.string()
      .required('Please retype your password.')
      .oneOf([Yup.ref('new_password'), null], "Passwords doesn't match")

    }),
    onSubmit: (values) => {
      console.log({ values });
      setTimeout(() => {
        ExportChangePassword.ChangePassword(values)
          .then((resp) => {
            console.log(resp);
            if (resp.data.message == "Password Successfully Updated") {
               setShow(false)
              toast.success(resp.data.message, {
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
              toast.error(resp.data.message, {
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
    <>
    <div style={{height:"90vh",overflow:"auto"}}>
      <Grid container spacing={4}>
        <Grid item xs={1}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
            Profile
          </Typography>
        </Grid> 
        <Grid item xs={7}></Grid>
        <Grid item  mt={4} xs={2}>  <Button onClick={() => setShow(true)} className="Edit" variant="outlined">
              Change Password
          </Button></Grid>
        <Grid mt={4} item xs={2}>
          <Button onClick={() => setModalShow(!modalShow)} className="Edit" variant="outlined">
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      <hr height={3} />
      
      {modalShow? <EditProfil setModalShow={setModalShow} GetData={GetData} Data={Data} />:<Grid container spacing={2}>
        <Grid item xs={2.5}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "24px" }}>
            Personal information
          </Typography>
          <Typography mt={1.5} ml={6} sx={{ fontSize: "20px" }}>
            Name
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            {Data?.name}
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "20px" }}>
            ID
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            {Data?.user_id}
          </Typography>
          {/* <Typography mt={1.7} ml={6} sx={{ fontSize: "20px" }}>
            Password
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            ********
          </Typography> */}
          <Typography mt={1.7} ml={6} sx={{ fontSize: "20px" }}>
            Email
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            {Data?.email}
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "20px" }}>
            Mobile
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
          {Data?.mobile_number}
          </Typography>
          {/* <Typography mt={1.7} ml={6} sx={{ fontSize: "20px" }}>
            Payment Card
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
          {Data?.payment_card?Data?.payment_card:"Mastercard ending in 0000"}
          </Typography> */}
        </Grid>
        <Grid ml={4} item xs={2.5}>
          <Typography mt={4} ml={4} sx={{ fontSize: "24px" }}>
            Business information
          </Typography>
          <Typography mt={1.5} pl={7} sx={{ fontSize: "20px" }}>
            {" "}
            Busines Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.business_name}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            Busines Type
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.business_type}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            Busines Address
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
           {Data?.business_address}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            Busines Email
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.business_email}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            Busines Phone Number
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.business_phone_no}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            States Operating In
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.states_operating_in}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            ABN Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.abn_name}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            Legal RegistrationABN Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.registered_abn_name}
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "20px" }}>
            Trading Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
          {Data?.trading_name}
          </Typography>
        </Grid>
      </Grid>}
      <Modal
       show={Show}
       onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              name="old_password"
              label="Old Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.old_password}
              autoComplete="current-old_password"
            />
            {formik.touched.old_password && formik.errors.old_password ? (
              <div style={{ color: "red" }}>{formik.errors.old_password}</div>
            ) : null}
            <TextField
              margin="normal"
              fullWidth
              name="new_password"
              label="New Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.new_password}
              autoComplete="current-new_password"
            />
            {formik.touched.new_password && formik.errors.new_password ? (
              <div style={{ color: "red" }}>{formik.errors.new_password}</div>
            ) : null}
             <Box  sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              autoComplete="current-confirm_password"
            />
            {formik.touched.confirm_password && formik.errors.confirm_password ? (
              <div style={{ color: "red" }}>{formik.errors.confirm_password}</div>
            ) : null}
            </Box>
       
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
           
          </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
      {/* <Futer /> */}
    </>
  );
};

export default UserInfo;
