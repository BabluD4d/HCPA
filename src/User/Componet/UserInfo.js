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
      setTimeout(() => {
        ExportChangePassword.ChangePassword(values)
          .then((resp) => {
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
    <div>
      <Grid container sx={{alignItems:'center'}}>
        <Grid item xs={12} sm={4}>
          <Typography fontSize={{xs:'20px', lg:'30px'}} mb={{xs:1, sm:0}}>Profile</Typography>
        </Grid> 
        <Grid item xs={12} sm={8} sx={{textAlign:'right'}}>
          <Button onClick={() => setShow(true)} className="Edit" variant="outlined" sx={{width:{xs:'100%', sm:'inherit'}}}>
            Change Password
          </Button>
          <Button onClick={() => setModalShow(!modalShow)} className="Edit" variant="outlined"  sx={{width:{xs:'100%', sm:'inherit'}, ml:{xs:0, sm:1}, mt:{xs:1, sm:0}}}>
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      <hr height={3} />
      
      {
      modalShow ? <EditProfil setModalShow={setModalShow} GetData={GetData} Data={Data} />
      :
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography mt={{xs:2, md:4}} mb={2} sx={{ fontSize: {xs:'20px', md:"24px"} }}>Personal information</Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Name: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"}, textTransform:'capitalize' }}>{Data?.name}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>ID: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.user_id}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Email: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.email}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Mobile: <Typography variant="span" sx={{ml:1,  fontSize: {xs:'14px', md:"16px"} }}>{Data?.mobile_number}</Typography></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography mt={{xs:2, md:4}} mb={2} sx={{ fontSize: {xs:'20px', md:"24px"} }}>Business information</Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Busines Name: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.business_name}</Typography></Typography>          
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Busines Type: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.business_type}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Busines Address: <Typography variant="span" sx={{ ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.business_address}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Busines Email: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.business_email}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Busines Phone Number: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.business_phone_no}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>States Operating In: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.states_operating_in}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>ABN Name: <Typography variant="span" sx={{ ml:1,fontSize: {xs:'14px', md:"16px"} }}>{Data?.abn_name}</Typography></Typography>
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Legal RegistrationABN Name: <Typography variant="span" sx={{ ml:1,fontSize: {xs:'14px', md:"16px"} }}>{Data?.registered_abn_name}</Typography></Typography>          
          <Typography sx={{ fontSize: {xs:'16px', md:"18px"} }}>Trading Name: <Typography variant="span" sx={{ml:1, fontSize: {xs:'14px', md:"16px"} }}>{Data?.trading_name}</Typography></Typography>
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
