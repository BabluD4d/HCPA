import {
  Box,
  Button,
  Grid,
  Pagination,
  TableContainer,
  Paper,  
  TextField,
  Typography,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import ExportUser from "../Api/Admin/handleUser/ExportUser";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { styled } from "@mui/material/styles";

export default function UserList() {
  const [UserData, setUserData] = useState();
  const [UserDataEdit, setUserDataEdit] = useState();
  const [userId, setuserId] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [Count, setCount] = useState()
  const [loader, setloader] = useState(true);
  const Navigate = useNavigate();
  const GetData = () => {
    let obj = {
      "order": "desc",
      "sort": "user_id",
      "limit": 10,
      "page": 1
    }
    ExportUser.UserAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setCount(resp.data.count);
          setUserData(resp.data.data);
          setloader(false)
        }else{
          setloader(false)
        }
      }
    })
    .catch((err) =>{
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
      setloader(false)
    }
  )
  };
  useEffect(() => {
    GetData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0CB4D0",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const formik = useFormik({
    initialValues: {
      id: UserDataEdit?.id ? UserDataEdit?.id : "",
      email: UserDataEdit?.email ? UserDataEdit.email : "",
      // password: UserDataEdit?.password ? UserDataEdit.password : "",
      name: UserDataEdit?.name ? UserDataEdit.name : "",
      mobile_number: UserDataEdit?.mobile_number
        ? UserDataEdit?.mobile_number
        : "",
      status: UserDataEdit?.status ? UserDataEdit.status : "",
      // role_id: 3,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      // password: Yup.string()
      //   .min(8, "Password must be 8 characters long")
      //   .required("Enter your password"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
      name: Yup.string().required("Enter your name"),
      mobile_number: Yup.string().required("Enter your Mobile Number"),
    }),
    onSubmit: (values) => {
      // CoustomRegistration(values, "Registration")
      ExportUser.userUpdateUserList(values)
      .then((resp) => {
        if (resp.data.message=="the record has updated") {
          GetData()
          setModalShow(false)
        toast.success("User updated successfully", {
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
    },
  });

  const hendleEditUser = (val) => {
    setUserDataEdit(val);
    setTimeout(() => {
      setModalShow(true)
    });
  };

  const hendleUserDelete = (val) => {
    setuserId(val);
    setTimeout(() => {
      setModalShow1(true);
    });
  };

  const hendleDeleteUser=()=>{
    ExportUser.userDelete(userId).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          if(resp.data.message=="the record has deleted"){
            GetData()
               setModalShow1(false)
          }
          // setUserData(resp.data.data);
        }
      }
    });
  }
  const hendlePagintion = (event, value) => {
    let obj = {
      "order": "desc",
      "sort": "user_id",
      "limit": 10,
      "page": value
    }
    ExportUser.UserAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setCount(resp.data.count);
          setUserData(resp.data.data);
          setloader(false)
        }else{
          setloader(false)
        }
      }
    });
  }
  return (
    <div>
    {
      loader ?
      <div style={{marginTop:"24%"}}>
        <center >
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#0CB4D0", "#0CB4D0", "#0CB4D0", "#0CB4D0", "#0CB4D0"]}
          />
        </center>
      </div>
      :
      <>
        <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #dee2e6', paddingBottom:'15px', marginBottom:'40px'}}>User List</Typography>
        <Grid container>
          <Grid item xs={12} textAlign="right">
            <Button sx={{width:{xs:'100%', sm:'auto'}}} onClick={() => Navigate("/CreateUser")} className={"A1"} variant="contained">Add User</Button>
          </Grid>
          <Grid className="userlist-ar" item xs={12}>
            <Box mt={4} className="table-com-ar">
              <TableContainer component={Paper} sx={{mb:2}}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell> Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Mobile</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                      <StyledTableCell>View Activity</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    UserData?.map((val, i) => (
                      <TableRow>
                        <StyledTableCell>{i + 1}</StyledTableCell>
                        <StyledTableCell>{val.name}</StyledTableCell>
                        <StyledTableCell>{val.email}</StyledTableCell>
                        <StyledTableCell>{val.mobile_number}</StyledTableCell>
                        <StyledTableCell>{val.status == "1" ? "Active" : "..."}</StyledTableCell>
                        <StyledTableCell>{val.id==1?"No Action":<>  <EditIcon onClick={() => {hendleEditUser(val);}} sx={{ color: "#0CB4D0" }} /> &nbsp; <DeleteIcon onClick={()=>hendleUserDelete(val.id)} sx={{ color: "red" }} />{" "}</>}</StyledTableCell>
                        <StyledTableCell onClick={() => {setTimeout(() => {Navigate("/UserList/product/active")});localStorage.setItem("UserProduct_id",val.id)}} style={{ color: "#0CB4D0", cursor: "pointer" }}><RemoveRedEyeIcon sx={{color: "#0CB4D0", marginBottom: "10px", fontSize: "28px"}} />&nbsp; View</StyledTableCell>
                      </TableRow>
                    ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination sx={{mb:5}} onChange={hendlePagintion} count={Math.ceil(Count / 10)} />
            </Box>
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
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
                type="text"
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
              <Button
              sx={{width: {xs:'100%', sm:'auto'}}}
                type="submit"
                className={"A1"}
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </Box>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Delete User  ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to Delete this user ?</p>
          <Grid container spacing={4}>
            <Grid item xl={4}>
              <Button
                type="button"
                sx={{color:"white",backgroundColor:"red" }}
                variant="contained"
                onClick={()=>{hendleDeleteUser()}}
              >
                Delete
              </Button></Grid>
            <Grid item xl={8}>
              <Button
                type="button"
                onClick={()=>{setModalShow1(false)}}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Modal.Body>
      </Modal>
      </>}
    </div>
  );
}
