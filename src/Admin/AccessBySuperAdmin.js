import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExportRegistration from "../Api/Auth/registration/ExportRegistration";
import { toast } from "react-toastify";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ExportAccess from "../Api/Admin/AccessAdmin/ExportAccess";
import { Modal } from "react-bootstrap";
import { Update } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0CB4D0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function AccessBySuperAdmin() {
  const [roleData, setroleData] = useState();
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState({collapse:false, id:undefined});
  // const [collapseId, setCollapseId] = React.useState(undefined);
  const [UpdateAccess, setUpdateAccess] = useState({
    AdminDashboard: "Yes",
    role_id: "",
    BookCall: "Yes",
    UserList: {
      visibility: "Yes",
      Add: false,
      Edit: false,
      Delete: false,
      View: false,
    },
    Products: {
      visibility: "Yes",
      Add: false,
      Edit: false,
      Delete: false,
      View: false,
    },
    modules: {
      visibility: "Yes",
      Add: false,
      Edit: false,
      Delete: false,
      View: false,
    },
    ClientsPortal: {
      visibility: "Yes",
      AddWelcome: false,
      AddGuides: false,
      EditGuides: false,
      DeleteGuides: false,
    },
  });
  const [accessDataList, setaccessDataList] = useState();
  const [formData, setformData] = useState({
    AdminDashboard: "Yes",
    role_id: "",
    BookCall: "Yes",
    UserList: {
      visibility: "Yes",
      Add: false,
      Edit: false,
      Delete: false,
      View: false,
    },
    Products: {
      visibility: "Yes",
      Add: false,
      Edit: false,
      Delete: false,
      View: false,
    },
    modules: {
      visibility: "Yes",
      Add: false,
      Edit: false,
      Delete: false,
      View: false,
    },
    ClientsPortal: {
      visibility: "Yes",
      AddWelcome: false,
      AddGuides: false,
      EditGuides: false,
      DeleteGuides: false,
    },
  });

  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") != 1) {
      Navigate("/");
    } else {
      GetData();
    }
  }, []);

  const GetData = () => {
    ExportAccess.AccesslistAll()
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setaccessDataList(resp.data);
            console.log(resp.data);
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
    ExportRegistration.getRoleIdAccess()
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setroleData(resp.data);
            console.log(resp.data);
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
    // ExportRegistration.getRoleIdAccess()
    //   .then((resp) => {
    //     if (resp.ok) {
    //       if (resp.data) {
    //         setroleData(resp.data);
    //         console.log(resp.data);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Something went wrong", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   });
  };
  //   const handleChange = (event, value) => {
  //     console.log(event.target.value);
  //   };

  return (
    <div>
      <Typography
        className="main-title-ad"
        fontSize={{ xs: "20px", lg: "30px" }}
        sx={{
          borderBottom: "1px solid #bbb5b5",
          paddingBottom: "15px",
          marginBottom: "40px",
        }}
      >
        Access Type
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (formData.role_id) {
            ExportAccess.CreateAccess(formData).then((resp) => {
              console.log("resp.data", resp.data);
              if (resp.data.message == "Accesstype created successfully") {
                GetData();
                toast.success("Accesstype created successfully", {
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
            });
          } else {
            toast.warning("Plese Select Access Type", {
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
        }}
      >
        <Grid container spacing={2} mb={9}>
          <Grid mt={3} item xs={12}>
            <FormControl mt={3} fullWidth>
              <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
              <Select
                disabled={localStorage.getItem("role") == 1 ? false : true}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Access Type"
                name="role_id"
                //   onChange={formik.handleChange}
                value={formData.role_id}
                //   onBlur={formik.handleBlur}
                autoComplete="current-number"
                onChange={(e) => {
                  formData.role_id = e.target.value;
                  setformData({ ...formData });
                }}
              >
                {roleData?.map((val, i) =>
                  val.id == 3 || val.id == 1 ? null : (
                    <MenuItem key={i} value={val.id}>
                      {val.role_name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <Typography
              className="main-title-ad"
              mt={4}
              mb={2}
              fontSize={{ xs: "20px", lg: "30px" }}
            >
              Accessible Pages
            </Typography>

            <Grid container spacing={2}>
              <Grid
                item
                xs="12"
                md={6}
                lg={4}                
              >
                <FormControl
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "-1px",
                    border: "1px solid #e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    User List
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Yes"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      if (e.target.value == "Yes") {
                        formData.UserList.visibility = e.target.value;
                        setformData({ ...formData });
                      } else {
                        formData.UserList = {
                          visibility: "No",
                          Add: false,
                          Edit: false,
                          Delete: false,
                          View: false,
                        };
                        setformData({ ...formData });
                      }
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                {/* {
                        formData.UserList.visibility == "Yes" ? ( */}
                <FormGroup
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "0 0 5px 5px",
                    padding: "10px 5px",
                    background: "#ffffff",
                  }}
                >
                  <FormControlLabel
                    checked={
                      formData.UserList.visibility == "No" ? false : true
                    }
                    disabled={
                      formData.UserList.visibility == "No" ? true : false
                    }
                    control={<Checkbox />}
                    label="View Page and Menu "
                  />
                  <FormControlLabel
                    disabled={
                      formData.UserList.visibility == "No" ? true : false
                    }
                    checked={formData.UserList.View}
                    onChange={(e) => {
                      formData.UserList.View = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="View"
                  />

                  <FormControlLabel
                    checked={formData.UserList.Add}
                    disabled={
                      formData.UserList.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.UserList.Add = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Add User"
                  />

                  <FormControlLabel
                    disabled={
                      formData.UserList.visibility == "No" ? true : false
                    }
                    checked={formData.UserList.Edit}
                    onChange={(e) => {
                      formData.UserList.Edit = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Edit Use"
                  />

                  <FormControlLabel
                    checked={formData.UserList.Delete}
                    disabled={
                      formData.UserList.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.UserList.Delete = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Delete User"
                  />
                </FormGroup>
                {/* ) : null
                    } */}
              </Grid>

              <Grid
                item
                xs="12"
                md={6}
                lg={4}
              >
                <FormControl
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "-1px",
                    border: "1px solid #e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Product List
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Yes"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      if (e.target.value == "Yes") {
                        formData.Products.visibility = e.target.value;
                        setformData({ ...formData });
                      } else {
                        formData.Products = {
                          visibility: "No",
                          Add: false,
                          Edit: false,
                          Delete: false,
                          View: false,
                        };
                        setformData({ ...formData });
                      }
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {/* {
                        formData.Products.visibility == "Yes" ? ( */}
                <FormGroup
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "0 0 5px 5px",
                    padding: "10px 5px",
                    background: "#ffffff",
                  }}
                >
                  <FormControlLabel
                    checked={
                      formData.Products.visibility == "No" ? false : true
                    }
                    disabled={
                      formData.Products.visibility == "No" ? true : false
                    }
                    control={<Checkbox />}
                    label="View Page and Menu "
                  />
                  <FormControlLabel
                    checked={formData.Products.View}
                    disabled={
                      formData.Products.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.Products.View = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="View Product"
                  />

                  <FormControlLabel
                    checked={formData.Products.Add}
                    disabled={
                      formData.Products.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.Products.Add = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Add Product"
                  />

                  <FormControlLabel
                    checked={formData.Products.Edit}
                    disabled={
                      formData.Products.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.Products.Edit = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Edit Product"
                  />

                  <FormControlLabel
                    checked={formData.Products.Delete}
                    disabled={
                      formData.Products.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.Products.Delete = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Delete Product"
                  />
                </FormGroup>
                {/* ) : null
                    } */}
              </Grid>

              <Grid
                item
                xs="12"
                md={6}
                lg={4}
              >
                <FormControl
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "-1px",
                    border: "1px solid #e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Modules List
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Yes"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      if (e.target.value == "Yes") {
                        formData.modules.visibility = e.target.value;
                        setformData({ ...formData });
                      } else {
                        formData.modules = {
                          visibility: "No",
                          Add: false,
                          Edit: false,
                          Delete: false,
                          View: false,
                        };
                        setformData({ ...formData });
                      }
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                {/* {formData.modules.visibility == "Yes" ? ( */}
                <FormGroup
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "0 0 5px 5px",
                    padding: "10px 5px",
                    background: "#ffffff",
                  }}
                >
                  <FormControlLabel
                    checked={formData.modules.visibility == "No" ? false : true}
                    disabled={
                      formData.modules.visibility == "No" ? true : false
                    }
                    control={<Checkbox />}
                    label="View Page and Menu "
                  />
                  <FormControlLabel
                    checked={formData.modules.View}
                    disabled={
                      formData.modules.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.modules.View = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="View"
                  />

                  <FormControlLabel
                    checked={formData.modules.Add}
                    disabled={
                      formData.modules.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.modules.Add = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Add Module"
                  />

                  <FormControlLabel
                    checked={formData.modules.Edit}
                    disabled={
                      formData.modules.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.modules.Edit = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Edit Modules"
                  />
                  <FormControlLabel
                    checked={formData.modules.Delete}
                    disabled={
                      formData.modules.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.modules.Delete = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Delete Modules"
                  />
                </FormGroup>
                {/* ) : null} */}
              </Grid>

              <Grid
                item
                xs="12"
                md={6}
                lg={4}
              >
                <FormControl
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "-1px",
                    border: "1px solid #e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Client Portal
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Yes"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      if (e.target.value == "Yes") {
                        formData.ClientsPortal.visibility = e.target.value;
                        setformData({ ...formData });
                      } else {
                        formData.ClientsPortal = {
                          visibility: "No",
                          AddWelcome: false,
                          AddGuides: false,
                          EditGuides: false,
                          DeleteGuides: false,
                        };
                        setformData({ ...formData });
                      }
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                {/* {formData.ClientsPortal.visibility == "Yes" ? ( */}
                <FormGroup
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "0 0 5px 5px",
                    padding: "10px 5px",
                    background: "#ffffff",
                  }}
                >
                  <FormControlLabel
                    checked={
                      formData.ClientsPortal.visibility == "No" ? false : true
                    }
                    disabled={
                      formData.ClientsPortal.visibility == "No" ? true : false
                    }
                    control={<Checkbox />}
                    label="View Page and Menu "
                  />
                  <FormControlLabel
                    checked={formData.ClientsPortal.AddWelcome}
                    disabled={
                      formData.ClientsPortal.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.ClientsPortal.AddWelcome = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Add Welcome Video"
                  />

                  <FormControlLabel
                    checked={formData.ClientsPortal.AddGuides}
                    disabled={
                      formData.ClientsPortal.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.ClientsPortal.AddGuides = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Add Guides"
                  />

                  <FormControlLabel
                    checked={formData.ClientsPortal.EditGuides}
                    disabled={
                      formData.ClientsPortal.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.ClientsPortal.EditGuides = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Edit Guides"
                  />

                  <FormControlLabel
                    checked={formData.ClientsPortal.DeleteGuides}
                    disabled={
                      formData.ClientsPortal.visibility == "No" ? true : false
                    }
                    onChange={(e) => {
                      formData.ClientsPortal.DeleteGuides = e.target.checked;
                      setformData({ ...formData });
                    }}
                    control={<Checkbox />}
                    label="Delete Guides"
                  />
                </FormGroup>
                {/* ) : null} */}
              </Grid>

              <Grid
                item
                xs="12"
                md={6}
                lg={4}
              >
                <FormControl
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "-1px",
                    border: "1px solid #e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Admin Dashboard
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Yes"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      formData.AdminDashboard = e.target.value;
                      setformData({ ...formData });
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormGroup
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "0 0 5px 5px",
                    padding: "10px 5px",
                    background: "#ffffff",
                  }}
                >
                  <FormControlLabel
                    checked={formData.AdminDashboard == "No" ? false : true}
                    disabled={formData.AdminDashboard == "No" ? true : false}
                    control={<Checkbox />}
                    label="View Page and Menu "
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                xs="12"
                md={6}
                lg={4}
              >
                <FormControl
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "-1px",
                    border: "1px solid #e0e0e0",
                    padding: "10px 15px",
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    BookCall List
                  </FormLabel>
                  <RadioGroup
                    sx={{ flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Yes"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      formData.BookCall = e.target.value;
                      setformData({ ...formData });
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormGroup
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "0 0 5px 5px",
                    padding: "10px 5px",
                    background: "#ffffff",
                  }}
                >
                  <FormControlLabel
                    checked={formData.BookCall == "No" ? false : true}
                    disabled={formData.BookCall == "No" ? true : false}
                    control={<Checkbox />}
                    label="View Page and Menu"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs="12" textAlign="center" mt={3}>
                <Button
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                  className={"A1"}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box component="form">
        <Box mt={4} className="user-list-table">
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Access Type</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Update Access</StyledTableCell>
                </TableRow>
              </TableHead>
              {accessDataList?.map((item) => (
                <TableBody key={item?.role_id}>
                  <TableRow>
                    <StyledTableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                          // setCollapseId(item?.role_id);
                          collapse.id !== undefined ? collapse.id == item?.role_id && collapse.collapse ? setCollapse({collapse: false, id:item?.role_id}) : setCollapse({collapse: true, id:item?.role_id}) : setCollapse({collapse: true, id:item?.role_id})
                        }}
                      >
                        {collapse.id == item?.role_id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>{item?.role?.role_name}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell
                      sx={{ color: "#0cb4d0", cursor: "pointer" }}
                      onClick={() => {
                        setUpdateAccess(item);
                        setTimeout(() => {
                          setOpen(true);
                        });
                      }}
                    >
                      Update
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell style={{ padding: "0" }} colSpan={6}>
                      {console.log(collapse.id, collapse.collapse, "setCollapseId  ")}
                      <Collapse
                        in={collapse.id == item?.role_id && collapse.collapse}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              {/* <StyledTableCell>Access Type</StyledTableCell> */}
                              <StyledTableCell>Page Name</StyledTableCell>
                              <StyledTableCell>View Page and Menu</StyledTableCell>
                              <StyledTableCell>Add</StyledTableCell>
                              <StyledTableCell>Edit</StyledTableCell>
                              <StyledTableCell>Delete</StyledTableCell>
                              <StyledTableCell>View Activity</StyledTableCell>
                              {/* <StyledTableCell>Update Access</StyledTableCell> */}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <StyledTableCell>
                                {item?.AdminDashboard ? "Admin Dashboard" : ""}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.AdminDashboard === "Yes" ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                {item?.BookCall ? "BookCall" : ""}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.BookCall === "Yes" ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                              <StyledTableCell></StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                {item?.UserList ? "User List" : ""}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.UserList?.Add ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.UserList?.Edit ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.UserList?.View ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.UserList?.Delete ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.UserList?.visibility === "Yes"
                                  ? "Yes"
                                  : "No"}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                {item?.Products ? "Products List" : ""}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.Products?.Add ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.Products?.Edit ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.Products?.View ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.Products?.Delete ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.Products?.visibility === "Yes"
                                  ? "Yes"
                                  : "No"}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                {item?.modules ? "Modules List" : ""}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.modules?.Add ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.modules?.Edit ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.modules?.View ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.modules?.Delete ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.modules?.visibility === "Yes"
                                  ? "Yes"
                                  : "No"}
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>
                                {item?.ClientsPortal ? "Client Portal" : ""}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.ClientsPortal?.AddWelcome ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.ClientsPortal?.AddGuides ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.ClientsPortal?.EditGuides ? "Yes" : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.ClientsPortal?.DeleteGuides
                                  ? "Yes"
                                  : "No"}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item?.ClientsPortal?.visibility === "Yes"
                                  ? "Yes"
                                  : "No"}
                              </StyledTableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Collapse>
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              ))}
              {/* <TableBody>
                {accessDataList?.map((item, index) => {
                  return (
                    <>
                      <TableRow>
                        <StyledTableCell>
                          {item?.role?.role_name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.AdminDashboard ? "Admin Dashboard" : ""}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.AdminDashboard === "Yes" ? "Yes" : "No"}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell
                          sx={{ color: "#0cb4d0", cursor: "pointer" }}
                          onClick={() => {
                            setUpdateAccess(item);
                            setTimeout(() => {
                              setOpen(true);
                            });
                          }}
                        >
                          Update
                        </StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableCell>{""}</StyledTableCell>
                        <StyledTableCell>
                          {item?.BookCall ? "BookCall" : ""}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.BookCall === "Yes" ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>
                          {item?.UserList ? "User List" : ""}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.UserList?.Add ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.UserList?.Edit ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.UserList?.View ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.UserList?.Delete ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.UserList?.visibility === "Yes" ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableCell>{""}</StyledTableCell>
                        <StyledTableCell>
                          {item?.Products ? "Products List" : ""}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.Products?.Add ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.Products?.Edit ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.Products?.View ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.Products?.Delete ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.Products?.visibility === "Yes" ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableCell>{""}</StyledTableCell>
                        <StyledTableCell>
                          {item?.modules ? "Modules List" : ""}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.modules?.Add ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.modules?.Edit ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.modules?.View ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.modules?.Delete ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.modules?.visibility === "Yes" ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>

                      <TableRow>
                        <StyledTableCell>{""}</StyledTableCell>
                        <StyledTableCell>
                          {item?.ClientsPortal ? "Client Portal" : ""}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.ClientsPortal?.AddWelcome ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.ClientsPortal?.AddGuides ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.ClientsPortal?.EditGuides ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.ClientsPortal?.DeleteGuides ? "Yes" : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.ClientsPortal?.visibility === "Yes"
                            ? "Yes"
                            : "No"}{" "}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody> */}
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(UpdateAccess, "Old Object");
              let { id, ...rest } = UpdateAccess;
              let newUpdatedAccess = { ...rest, ["accesstype_id"]: id };
              // if (UpdateAccess?.role_id) {
              ExportAccess.UpdateAccess(newUpdatedAccess).then((resp) => {
                console.log("resp.data", resp.data);
                // if (resp.data.message == "Accesstype created successfully") {
                GetData();
                setOpen(false);
                toast.success("Accesstype created successfully", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                // }
              });
              // } else {
              //   toast.warning("Plese Select Access Type", {
              //     position: "top-right",
              //     autoClose: 5000,
              //     hideProgressBar: false,
              //     closeOnClick: true,
              //     pauseOnHover: true,
              //     draggable: true,
              //     progress: undefined,
              //     theme: "light",
              //   });
              // }
            }}
          >
            <Grid container spacing={2} mb={9}>
              <Grid mt={3} item xs={12}>
                {/* <FormControl mt={3} variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
              <Select
                disabled={true}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="role_id"
                name="role_id"
                //   onChange={formik.handleChange}
                value={UpdateAccess?.role_id}
                //   onBlur={formik.handleBlur}
                autoComplete="current-number"
                onChange={(e) => {
                  UpdateAccess.role_id = e.target.value;
                  setUpdateAccess({ ...UpdateAccess });
                }}
              >
                {roleData?.map((val, i) =>
                  val.id == 3 || val.id == 1 ? null : (
                    <MenuItem value={val.id}>{val.role_name}</MenuItem>
                  )
                )}
              </Select>
            </FormControl> */}

                <Typography
                  className="main-title-ad"
                  mt={4}
                  mb={2}
                  fontSize={{ xs: "20px", lg: "30px" }}
                >
                  Accessible Pages
                </Typography>

                <Grid container spacing={2}>
                  <Grid
                    item
                    xs="12"
                    md={6}
                    lg={4}
                  >
                    <FormControl
                      sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "-1px",
                        border: "1px solid #e0e0e0",
                        padding: "10px 15px",
                        borderRadius: "5px 5px 0 0",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        User List
                      </FormLabel>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={UpdateAccess.UserList.visibility}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          if (e.target.value == "Yes") {
                            UpdateAccess.UserList.visibility = e.target.value;
                            setUpdateAccess({ ...UpdateAccess });
                          } else {
                            UpdateAccess.UserList = {
                              visibility: "No",
                              Add: false,
                              Edit: false,
                              Delete: false,
                              View: false,
                            };
                            setUpdateAccess({ ...UpdateAccess });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* {
                        UpdateAccess.UserList.visibility == "Yes" ? ( */}
                    <FormGroup
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "0 0 5px 5px",
                        padding: "10px 5px",
                        background: "#ffffff",
                      }}
                    >
                      <FormControlLabel
                        checked={
                          UpdateAccess.UserList.visibility == "No"
                            ? false
                            : true
                        }
                        disabled={
                          UpdateAccess.UserList.visibility == "No"
                            ? true
                            : false
                        }
                        control={<Checkbox />}
                        label="View Page and Menu "
                      />
                      <FormControlLabel
                        disabled={
                          UpdateAccess.UserList.visibility == "No"
                            ? true
                            : false
                        }
                        checked={UpdateAccess.UserList.View}
                        onChange={(e) => {
                          UpdateAccess.UserList.View = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="View"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.UserList.Add}
                        disabled={
                          UpdateAccess.UserList.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.UserList.Add = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Add User"
                      />

                      <FormControlLabel
                        disabled={
                          UpdateAccess.UserList.visibility == "No"
                            ? true
                            : false
                        }
                        checked={UpdateAccess.UserList.Edit}
                        onChange={(e) => {
                          UpdateAccess.UserList.Edit = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Edit Use"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.UserList.Delete}
                        disabled={
                          UpdateAccess.UserList.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.UserList.Delete = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Delete User"
                      />
                    </FormGroup>
                    {/* ) : null
                    } */}
                  </Grid>

                  <Grid
                    item
                    xs="12"
                    md={6}
                    lg={4}
                  >
                    <FormControl
                      sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "-1px",
                        border: "1px solid #e0e0e0",
                        padding: "10px 15px",
                        borderRadius: "5px 5px 0 0",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Product List
                      </FormLabel>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={UpdateAccess.Products.visibility}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          if (e.target.value == "Yes") {
                            UpdateAccess.Products.visibility = e.target.value;
                            setUpdateAccess({ ...UpdateAccess });
                          } else {
                            UpdateAccess.Products = {
                              visibility: "No",
                              Add: false,
                              Edit: false,
                              Delete: false,
                              View: false,
                            };
                            setUpdateAccess({ ...UpdateAccess });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                    {/* {
                        UpdateAccess.Products.visibility == "Yes" ? ( */}
                    <FormGroup
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "0 0 5px 5px",
                        padding: "10px 5px",
                        background: "#ffffff",
                      }}
                    >
                      <FormControlLabel
                        checked={
                          UpdateAccess.Products.visibility == "No"
                            ? false
                            : true
                        }
                        disabled={
                          UpdateAccess.Products.visibility == "No"
                            ? true
                            : false
                        }
                        control={<Checkbox />}
                        label="View Page and Menu"
                      />
                      <FormControlLabel
                        checked={UpdateAccess.Products.View}
                        disabled={
                          UpdateAccess.Products.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.Products.View = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="View Product"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.Products.Add}
                        disabled={
                          UpdateAccess.Products.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.Products.Add = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Add Product"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.Products.Edit}
                        disabled={
                          UpdateAccess.Products.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.Products.Edit = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Edit Product"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.Products.Delete}
                        disabled={
                          UpdateAccess.Products.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.Products.Delete = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Delete Product"
                      />
                    </FormGroup>
                    {/* ) : null
                    } */}
                  </Grid>

                  <Grid
                    item
                    xs="12"
                    md={6}
                    lg={4}
                  >
                    <FormControl
                      sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "-1px",
                        border: "1px solid #e0e0e0",
                        padding: "10px 15px",
                        borderRadius: "5px 5px 0 0",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Modules List
                      </FormLabel>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={UpdateAccess.modules.visibility}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          if (e.target.value == "Yes") {
                            UpdateAccess.modules.visibility = e.target.value;
                            setUpdateAccess({ ...UpdateAccess });
                          } else {
                            UpdateAccess.modules = {
                              visibility: "No",
                              Add: false,
                              Edit: false,
                              Delete: false,
                              View: false,
                            };
                            setUpdateAccess({ ...UpdateAccess });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* {UpdateAccess.modules.visibility == "Yes" ? ( */}
                    <FormGroup
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "0 0 5px 5px",
                        padding: "10px 5px",
                        background: "#ffffff",
                      }}
                    >
                      <FormControlLabel
                        checked={
                          UpdateAccess.modules.visibility == "No" ? false : true
                        }
                        disabled={
                          UpdateAccess.modules.visibility == "No" ? true : false
                        }
                        control={<Checkbox />}
                        label="View Page and Menu"
                      />
                      <FormControlLabel
                        checked={UpdateAccess.modules.View}
                        disabled={
                          UpdateAccess.modules.visibility == "No" ? true : false
                        }
                        onChange={(e) => {
                          UpdateAccess.modules.View = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="View"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.modules.Add}
                        disabled={
                          UpdateAccess.modules.visibility == "No" ? true : false
                        }
                        onChange={(e) => {
                          UpdateAccess.modules.Add = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Add Module"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.modules.Edit}
                        disabled={
                          UpdateAccess.modules.visibility == "No" ? true : false
                        }
                        onChange={(e) => {
                          UpdateAccess.modules.Edit = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Edit Modules"
                      />
                      <FormControlLabel
                        checked={UpdateAccess.modules.Delete}
                        disabled={
                          UpdateAccess.modules.visibility == "No" ? true : false
                        }
                        onChange={(e) => {
                          UpdateAccess.modules.Delete = e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Delete Modules"
                      />
                    </FormGroup>
                    {/* ) : null} */}
                  </Grid>

                  <Grid
                    item
                    xs="12"
                    md={6}
                    lg={4}                    
                  >
                    <FormControl
                      sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "-1px",
                        border: "1px solid #e0e0e0",
                        padding: "10px 15px",
                        borderRadius: "5px 5px 0 0",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Client Portal
                      </FormLabel>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={UpdateAccess.ClientsPortal.visibility}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          if (e.target.value == "Yes") {
                            UpdateAccess.ClientsPortal.visibility =
                              e.target.value;
                            setUpdateAccess({ ...UpdateAccess });
                          } else {
                            UpdateAccess.ClientsPortal = {
                              visibility: "No",
                              AddWelcome: false,
                              AddGuides: false,
                              EditGuides: false,
                              DeleteGuides: false,
                            };
                            setUpdateAccess({ ...UpdateAccess });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* {UpdateAccess.ClientsPortal.visibility == "Yes" ? ( */}
                    <FormGroup
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "0 0 5px 5px",
                        padding: "10px 5px",
                        background: "#ffffff",
                      }}
                    >
                      <FormControlLabel
                        checked={
                          UpdateAccess.ClientsPortal.visibility == "No"
                            ? false
                            : true
                        }
                        disabled={
                          UpdateAccess.ClientsPortal.visibility == "No"
                            ? true
                            : false
                        }
                        control={<Checkbox />}
                        label="View Page and Menu "
                      />
                      <FormControlLabel
                        checked={UpdateAccess.ClientsPortal.AddWelcome}
                        disabled={
                          UpdateAccess.ClientsPortal.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.ClientsPortal.AddWelcome =
                            e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Add Welcome Video"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.ClientsPortal.AddGuides}
                        disabled={
                          UpdateAccess.ClientsPortal.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.ClientsPortal.AddGuides =
                            e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Add Guides"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.ClientsPortal.EditGuides}
                        disabled={
                          UpdateAccess.ClientsPortal.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.ClientsPortal.EditGuides =
                            e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Edit Guides"
                      />

                      <FormControlLabel
                        checked={UpdateAccess.ClientsPortal.DeleteGuides}
                        disabled={
                          UpdateAccess.ClientsPortal.visibility == "No"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          UpdateAccess.ClientsPortal.DeleteGuides =
                            e.target.checked;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                        control={<Checkbox />}
                        label="Delete Guides"
                      />
                    </FormGroup>
                    {/* ) : null} */}
                  </Grid>

                  <Grid
                    item
                    xs="12"
                    md={6}
                    lg={4}                    
                  >
                    <FormControl
                      sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "-1px",
                        border: "1px solid #e0e0e0",
                        padding: "10px 15px",
                        borderRadius: "5px 5px 0 0",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Admin Dashboard
                      </FormLabel>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={UpdateAccess.AdminDashboard}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          UpdateAccess.AdminDashboard = e.target.value;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormGroup
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "0 0 5px 5px",
                        padding: "10px 5px",
                        background: "#ffffff",
                      }}
                    >
                      <FormControlLabel
                        checked={
                          UpdateAccess.AdminDashboard == "No" ? false : true
                        }
                        disabled={
                          UpdateAccess.AdminDashboard == "No" ? true : false
                        }
                        control={<Checkbox />}
                        label="View Page and Menu"
                      />
                    </FormGroup>
                  </Grid>

                  <Grid
                    item
                    xs="12"
                    md={6}
                    lg={4}
                  >
                    <FormControl
                      sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "-1px",
                        border: "1px solid #e0e0e0",
                        padding: "10px 15px",
                        borderRadius: "5px 5px 0 0",
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        BookCall List
                      </FormLabel>
                      <RadioGroup
                        sx={{ flexDirection: "row" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={UpdateAccess.BookCall}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          UpdateAccess.BookCall = e.target.value;
                          setUpdateAccess({ ...UpdateAccess });
                        }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormGroup
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "0 0 5px 5px",
                        padding: "10px 5px",
                        background: "#ffffff",
                      }}
                    >
                      <FormControlLabel
                        checked={UpdateAccess.BookCall == "No" ? false : true}
                        disabled={UpdateAccess.BookCall == "No" ? true : false}
                        control={<Checkbox />}
                        label="View Page and Menu"
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs="12" textAlign="center" mt={3}>
                    <Button
                      sx={{ width: { xs: "100%", sm: "auto" } }}
                      className={"A1"}
                      type="submit"
                      variant="contained"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AccessBySuperAdmin;
