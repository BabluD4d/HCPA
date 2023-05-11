import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
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
export default function UserList() {
  const [UserData, setUserData] = useState();
  const [UserDataEdit, setUserDataEdit] = useState();
  const [userId, setuserId] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const Navigate = useNavigate();
  const GetData = () => {
    ExportUser.UserAll().then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          console.log(resp.data);
          setUserData(resp.data.data);
        }
      }
    });
  };
  useEffect(() => {
    GetData();
  }, []);
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
        console.log(resp);
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
    },
  });
  const hendleEditUser = (val) => {
    setUserDataEdit(val);
    setTimeout(() => {
      setModalShow(true);
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
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        User List
      </Typography>
      <hr height={3} />
      <Grid container spacing={1}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Box mt={8}>
            <Table striped hover>
              <thead
                style={{
                  paddingBlock: "30px",
                  backgroundColor: "#0CB4D0",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>View Activity</th>
                </tr>
              </thead>
              <tbody>
                {UserData?.map((val, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mobile_number}</td>
                    <td>{val.status == "1" ? "Active" : "..."}</td>
                    <td>{val.id==1?"No Action":<>  <EditIcon
                        onClick={() => {
                          hendleEditUser(val);
                        }}
                        sx={{ color: "#0CB4D0" }}
                      />{" "}
                      &nbsp;
                      <DeleteIcon onClick={()=>hendleUserDelete(val.id)} sx={{ color: "red" }} />{" "}</>}
                    
                    </td>
                    <td
                      onClick={() => {setTimeout(() => {
                        localStorage.setItem("UserProduct_id",val.id)
                      });;Navigate("/UserList/product/active")}}
                      style={{ color: "#0CB4D0", cursor: "pointer" }}
                    >
                      {" "}
                      <RemoveRedEyeIcon
                        sx={{
                          color: "#0CB4D0",
                          marginBottom: "10px",
                          fontSize: "28px",
                        }}
                      />{" "}
                      &nbsp; View{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination count={10} />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => Navigate("/CreateUser")}
            sx={{ marginLeft: "10%" }}
            className={"A1"}
            variant="contained"
          >
            Add User
          </Button>
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
          <Grid container spacing={4} mt={2}>
          <Grid xl={1}> </Grid>
            <Grid xl={5}>  <Button
                type="button"
                sx={{ marginLeft: "10px",color:"white",backgroundColor:"red" }}
                // className={"A1"}
                variant="contained"
                onClick={()=>{hendleDeleteUser()}}
              >
                Delete
              </Button></Grid>
            <Grid xl={6}>
              <Button
                type="button"
                sx={{ marginLeft: "10px" }}
                onClick={()=>{setModalShow1(false)}}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
