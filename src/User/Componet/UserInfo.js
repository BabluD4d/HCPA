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
        <Grid item xs={9}></Grid>
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
    </div>
      <Futer />
    </>
  );
};

export default UserInfo;
