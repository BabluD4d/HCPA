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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import ExportRegistration from "../Api/Auth/registration/ExportRegistration";

export default function UserList() {
  const [UserData, setUserData] = useState();
  const [UserDataStaff, setUserDataStaff] = useState();
  const [UserDataStaffEdit, setUserDataStaffEdit] = useState();
  const [UserDataEdit, setUserDataEdit] = useState();
  const [userId, setuserId] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [Count, setCount] = useState();
  const [CountStaff, setCountStaff] = useState();
  const [loader, setloader] = useState(true);
  const [roleData, setroleData] = useState()
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const Navigate = useNavigate();
  const GetDataStaff = () => {
    let obj = {
      order: "desc",
      limit: 10,
      page: 1,
    };

    ExportUser.UserAllStaff(obj)
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setCountStaff(resp.data.count);
            setUserDataStaff(resp.data.data);
            console.log(resp.data);
            setloader(false);
          } else {
            setloader(false);
          }
        }
      })
      .catch((err) => {
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
        setloader(false);
      });
  };
  const GetData = () => {
    let obj = {
      order: "desc",
      limit: 10,
      page: 1,
    };

    // https://healthcare.digital4design.in/api/user/list/2?order=asc&sort=users.id&limit=10&page=1
    ExportUser.UserAll(obj)
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setCount(resp.data.count);
            setUserData(resp.data.data);
            // console.log(resp.data.count)
            setloader(false);
          } else {
            setloader(false);
          }
        }
      })
      .catch((err) => {
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
        setloader(false);
      });
  };
  useEffect(() => {
    if(Data.access[0].accessibility.UserList.visibility=='No'){
      Navigate("/Profile/Admin")
    }
    GetData();
    GetDataStaff();
    GetDataRole()
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
      status: UserDataEdit?.status ? UserDataEdit.status : true,
      checklist_status: UserDataEdit?.checklist_status  ? UserDataEdit.checklist_status  : "Incomplete",
      // role_id: 3,
      payment:UserDataEdit?.status ? UserDataEdit.status :"Pending"
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
      if(localStorage.getItem("role") == 1||localStorage.getItem("role") == 6){
        ExportUser.userUpdateUserList(values)
          .then((resp) => {
            if (resp.data.message == "the record has updated") {
              GetData();
              setModalShow(false);
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
      }
    },
  });
  const formik1 = useFormik({
    initialValues: {
      id:UserDataStaffEdit?.id?UserDataStaffEdit?.id: "",
      email:UserDataStaffEdit?.email?UserDataStaffEdit?.email: "",
      // password:UserDataStaffEdit??UserDataStaffEdit?: "",
      name:UserDataStaffEdit?.name?UserDataStaffEdit?.name: "",
      mobile_number:UserDataStaffEdit?.mobile_number?UserDataStaffEdit?.mobile_number: "",
      role_id:UserDataStaffEdit?.role_id?UserDataStaffEdit?.role_id:"",
      clients:UserDataStaffEdit?.numbers_clients?UserDataStaffEdit?.numbers_clients:"",
      bookings:UserDataStaffEdit?.booking_status?UserDataStaffEdit?.booking_status:""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
      .email("Please enter valid email address")
      .required("Enter your email"),
      name: Yup.string()
      .required("Enter your name"),
      mobile_number: Yup.string()
      .required("Enter your Mobile Number"),
      role_id: Yup.string()
      .required("Enter your access type "),
      bookings: Yup.string()
      .required("Enter your bookings available"),
    }),
    onSubmit: (values) => {
      // CoustomRegistration(values, "Registration")
      ExportUser.userUpdateStaff(values)
        .then((resp) => {
          console.log({resp})
          if (resp.data.message == "the record has updated") {
            setModalShow2(false);
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
            GetDataStaff()
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
    },
  });

  const hendleEditUser = (val) => {
    setUserDataEdit(val);
    setTimeout(() => {
      setModalShow(true);
    });
  };
  const hendleEditStaff = (val) => {
    setUserDataStaffEdit(val);
    console.log({val})
    setTimeout(() => {
      setModalShow2(true);
    });
  };

  
  const hendleUserDelete = (val) => {
    setuserId(val);
    setTimeout(() => {
      setModalShow1(true);
    });
  };
  const hendleUserDeleteStaff = (val) => {
    setuserId(val);
    setTimeout(() => {
      setModalShow1(true);
    });
  };
  const hendleDeleteUser = () => {
    ExportUser.userDelete(userId).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          if (resp.data.message == "the record has deleted") {
            GetData();
            GetDataStaff()
            setModalShow1(false);
          }
          // setUserData(resp.data.data);
        }
      }
    });
  };
  const hendlePagintion = (event, value) => {
    let obj = {
      order: "desc",
      limit: 10,
      page: value,
    };
    ExportUser.UserAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setCount(resp.data.count);
          setUserData(resp.data.data);
          setloader(false);
        } else {
          setloader(false);
        }
      }
    });
  };
  const hendlePagintionStaff = (event, value) => {
    let obj = {
      order: "desc",
      limit: 10,
      page: value,
    };
    ExportUser.UserAllStaff(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setCount(resp.data.count);
          setUserData(resp.data.data);
          setloader(false);
        } else {
          setloader(false);
        }
      }
    });
  };
  const GetDataRole = () => {
    ExportRegistration.getRoleId()
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setroleData(resp.data.data);
            console.log(resp.data.data)
           
          } 
        }
      })
      .catch((err) => {
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
      });
  };
  return (
    <div>
      {loader ? (
        <div style={{ marginTop: "24%" }}>
          <center>
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
      ) : (
        <>
          <Typography
            className="main-title-ad"
            fontSize={{ xs: "20px", lg: "30px" }}
            sx={{
              borderBottom: "1px solid #bbb5b5",
              paddingBottom: "15px",
              marginBottom: "40px",
            }}
          >
            Users
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                className="main-title-ad"
                fontSize={{ xs: "20px", lg: "30px" }}
              >
                Clients
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
                 {Data.access[0].accessibility.UserList.Add?    <Button
                sx={{ width: { xs: "100%", sm: "auto" } }}
                onClick={() => Navigate("/CreateUser")}
                className={"A1"}
                variant="contained"
              >
                Add User
              </Button>:    <Button
                sx={{ width: { xs: "100%", sm: "auto" } }}
                // onClick={() => Navigate("/CreateUser")}
                disabled
                className={"A1"}
                variant="contained"
              >
                Add User
              </Button>}
          
            </Grid>
            <Grid className="userlist-ar" item xs={12}>
              <Box mt={4} className="table-com-ar client-table">
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell> Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Products</StyledTableCell>
                        <StyledTableCell>Modules</StyledTableCell>
                        <StyledTableCell>Payments</StyledTableCell>
                        <StyledTableCell>CheckLists</StyledTableCell>
                        <StyledTableCell>View / Edit / Delete</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {UserData?.map((val, i) => (
                        <TableRow>
                          <StyledTableCell>{i + 1}</StyledTableCell>
                          <StyledTableCell>{val.name}</StyledTableCell>
                          <StyledTableCell>{val.email}</StyledTableCell>
                          <StyledTableCell  width="22%">{val.product?val.product:0}</StyledTableCell>
                          <StyledTableCell  width="22%" style={{wordBreak: 'break-word'}}>{val.modules?val.modules:0}</StyledTableCell>
                          {val.payment_status == "Approved" ? (
                            <StyledTableCell>
                              {val.payment_status
                                ? val.payment_status
                                : "Pending"}
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell>
                              {val.payment_status
                                ? val.payment_status
                                : "Pending"}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>{val.checklist_status?val.checklist_status:"Incomplete"}</StyledTableCell>
                          <StyledTableCell>
                              

                              <Grid sx={{color: "#0CB4D0",cursor: "pointer",display: "flex"}}>
                                {Data.access[0].accessibility.UserList.View? <span
                                  style={{ marginRight: "5px" }}
                                  onClick={() => {
                                    setTimeout(() => {
                                      Navigate("/UserList/product/active");
                                    });
                                    localStorage.setItem(
                                      "UserProduct_id",
                                      val.id
                                    );
                                  }}
                                >
                                  View
                                </span>: <span
                                  style={{ marginRight: "5px" }}
                                  onClick={() => {
                                    toast.error("You are not accessible", {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                                  }}
                                >
                                  View
                                </span>}
                               
                                /
                                {Data.access[0].accessibility.UserList.Edit?
                                <span
                                  style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                  }}
                                  onClick={() => {
                                    hendleEditUser(val);
                                  }}
                                >
                                  Edit
                                </span>:<span
                                  style={{ marginRight: "5px" }}
                                  onClick={() => {
                                    toast.error("You are not accessible", {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                                  }}
                                >Edit
                                  </span>}
                                /
                                {Data.access[0].accessibility.UserList.Delete?
                                <span
                                  style={{ marginLeft: "5px" }}
                                  onClick={() => hendleUserDelete(val.id)}
                                >
                                  Delete
                                </span>:<span
                                  style={{ marginRight: "5px" }}
                                  onClick={() => {
                                    toast.error("You are not accessible", {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                                  }}
                                >Delete</span>}
                              </Grid>
                         
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  sx={{ mb: 5 }}
                  onChange={hendlePagintion}
                  count={Math.ceil(Count / 10)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                className="main-title-ad"
                fontSize={{ xs: "20px", lg: "30px" }}
              >
                HCPA Staff{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
            {localStorage.getItem("role") == 1 ? 
              <Button sx={{width:{xs:'100%', sm:'auto'}}} onClick={() => Navigate("/CreateStaff")} className={"A1"} variant="contained">Add HCPA Staff</Button>:null
            }
            </Grid>
            <Grid className="userlist-ar" item xs={12}>
              <Box mt={4} className="table-com-ar">
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {/* <StyledTableCell>#</StyledTableCell> */}
                        <StyledTableCell> Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Access Type</StyledTableCell>
                        <StyledTableCell>
                          No. of Clients Assigned
                        </StyledTableCell>
                        <StyledTableCell>Booking Available</StyledTableCell>
                        {/* <StyledTableCell>CheckLists</StyledTableCell> */}
                        <StyledTableCell> Edit / Delete</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {UserDataStaff?.map((val, i) => (
                        <TableRow>
                          {/* <StyledTableCell>{i + 1}</StyledTableCell> */}
                          <StyledTableCell>{val.name}</StyledTableCell>
                          <StyledTableCell>{val.email}</StyledTableCell>
                          <StyledTableCell>{val.role_name}</StyledTableCell>
                          <StyledTableCell>{val.numbers_clients?val.numbers_clients:"-"}</StyledTableCell>
                          <StyledTableCell>{val.booking_status?val.booking_status:"No"}</StyledTableCell>
                         
                          {/* <StyledTableCell>{val.id==1?"No Action":<>  <EditIcon onClick={() => {hendleEditUser(val);}} sx={{ color: "#0CB4D0" }} /> &nbsp; <DeleteIcon onClick={()=>hendleUserDelete(val.id)} sx={{ color: "red" }} />{" "}</>}</StyledTableCell> */}
                          <StyledTableCell
                            style={{
                              color: "#0CB4D0",
                              cursor: "pointer",
                              display: "flex",
                            }}
                          >
                            {localStorage.getItem("role") != 1 ? (
                              <>
                                {/* <p style={{ marginRight: "5px" }}>View</p> /{" "} */}
                                <p
                                  style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  Edit
                                </p>{" "}
                                / <p style={{ marginLeft: "5px" }}>Delete</p>
                              </>
                            ) : (
                              <>
                                {/* <p
                                  style={{ marginRight: "5px" }}
                                  // onClick={() => {
                                  //   setTimeout(() => {
                                  //     Navigate("/UserList/product/active");
                                  //   });
                                  //   localStorage.setItem(
                                  //     "UserProduct_id",
                                  //     val.id
                                  //   );
                                  // }}
                                >
                                  View
                                </p>{" "}
                                / */}
                                <p
                                  style={{
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                  }}
                                  onClick={() => {
                                    hendleEditStaff(val);
                                  }}
                                >
                                  Edit
                                </p>{" "}
                                /{" "}
                                <p
                                  style={{ marginLeft: "5px" }}
                                  onClick={() => hendleUserDelete(val.id)}
                                >
                                  Delete
                                </p>
                              </>
                            )}{" "}
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <Pagination
                  sx={{ mb: 5 }}
                  onChange={hendlePagintionStaff}
                  count={Math.ceil(CountStaff / 10)}
                /> */}
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
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Box>
                  <TextField
                  disabled={localStorage.getItem("role") == 1?false:true}
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
                  disabled={localStorage.getItem("role") == 1?false:true}
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
                  disabled={localStorage.getItem("role") == 1?false:true}
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
                  {formik.touched.mobile_number &&
                  formik.errors.mobile_number ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.mobile_number}
                    </div>
                  ) : null}
                </Box>
                <Box mt={3}>
                <FormControl mt={3} variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Payments
                  </InputLabel>
                  <Select
                  disabled={localStorage.getItem("role") == 1||localStorage.getItem("role") == 6?false:true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="payment"
                    name="payment"
                    onChange={formik.handleChange}
                    value={formik.values.payment}
                    onBlur={formik.handleBlur}
                    autoComplete="current-number"
                    // onChange={handleChange}
                  >
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
                  </Select>
                </FormControl>
                </Box>
                <Box mt={3}>
                <FormControl mt={3} variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                  CheckLists
                  </InputLabel>
                  <Select
                  disabled={localStorage.getItem("role") == 1?false:true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="checklist_status"
                    // onChange={handleChange}
                    name="checklist_status"
                    onChange={formik.handleChange}
                    value={formik.values.checklist_status}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={"Complete"}>Complete</MenuItem>
                    <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
                  </Select>
                </FormControl>
                </Box>
                <Box mt={3}>
                  <Button
                    sx={{ width: { xs: "100%", sm: "auto" } }}
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
            show={modalShow2}
            onHide={() => setModalShow2(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit HCPA Staff User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Box
                component="form"
                onSubmit={formik1.handleSubmit}
                sx={{ mt: 1 }}
              >
   {/* {console.log({UserDataStaffEdit})} */}

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
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      value={formik1.values.name}
                    />
                    {formik1.touched.name && formik1.errors.name ? (
                      <div style={{ color: "red" }}>{formik1.errors.name}</div>
                    ) : null}
                  </Box>
                  <Box>
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
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      value={formik1.values.email}
                    />
                    {formik1.touched.email && formik1.errors.email ? (
                      <div style={{ color: "red" }}>{formik1.errors.email}</div>
                    ) : null}
                  </Box>
                  <Box>
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
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      value={formik1.values.mobile_number}
                      autoComplete="current-number"
                  />
                  {formik1.touched.mobile_number && formik1.errors.mobile_number ? (
                      <div style={{ color: "red" }}>{formik1.errors.mobile_number}</div>
                  ) : null}
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      id="fullWidth"
                      label=" No. of Clients Assgned"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      name="clients"
                      type="text"
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      value={formik1.values.clients}
                      autoComplete="current-number"
                  />
                  {formik1.touched.clients && formik1.errors.clients ? (
                      <div style={{ color: "red" }}>{formik1.errors.clients}</div>
                  ) : null}
                  </Box>
                <Box >
                <FormControl mt={3} variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Access Type
                  </InputLabel>
                  <Select
                  disabled={localStorage.getItem("role") == 1?false:true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="role_id"
                    name="role_id"
                    onChange={formik1.handleChange}
                    value={formik1.values.role_id}
                    onBlur={formik1.handleBlur}
                    autoComplete="current-number"
                    // onChange={handleChange}
                  >{roleData?.map((val,i)=>val.id==3?null:<MenuItem value={val.id}>{val.role_name}</MenuItem>
                   
                 )}
                  </Select>
                   {formik1.touched.role_id && formik1.errors.role_id ? (
                     <div style={{ color: "red" }}>{formik1.errors.role_id}</div>
                     ) : null}
                </FormControl>
                </Box>
                     {/* {formik1.values.role_id} */}
                     <p></p>
                <Box>
                <FormControl mt={3} variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                  Booking Available
                  </InputLabel>
                  <Select
                  disabled={localStorage.getItem("role") == 1?false:true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="bookings"
                    // onChange={handleChange}
                    name="bookings"
                    onChange={formik1.handleChange}
                    value={formik1.values.bookings}
                    onBlur={formik1.handleBlur}
                  >
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                  {formik1.touched.bookings && formik1.errors.bookings ? (
                      <div style={{ color: "red" }}>{formik1.errors.bookings}</div>
                    ) : null}
                </FormControl>
                </Box>
                <Box mt={3}>
                  <Button
                    sx={{ width: { xs: "100%", sm: "auto" } }}
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
                Delete User ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure want to Delete this user ?</p>
              <Grid container spacing={4}>
                <Grid item xl={4}>
                  <Button
                    type="button"
                    sx={{ color: "white", backgroundColor: "red" }}
                    variant="contained"
                    onClick={() => {
                      hendleDeleteUser();
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item xl={8}>
                  <Button
                    type="button"
                    onClick={() => {
                      setModalShow1(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}
