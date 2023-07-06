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
} from "@mui/material";

function AccessBySuperAdmin() {
  const [roleData, setroleData] = useState();
  const [formData, setformData] = useState({
    AdminDashboard: "Yes",
    AccessType_id: "",
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
    ExportRegistration.getRoleId()
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setroleData(resp.data.data);
            console.log(resp.data.data);
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
      <Box component="form" onSubmit={() => {}}>
        <Grid container spacing={2} mb={9}>
          <Grid mt={3} item xs={12}>
            <FormControl mt={3} variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
              <Select
                disabled={localStorage.getItem("role") == 1 ? false : true}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="role_id"
                name="role_id"
                //   onChange={formik.handleChange}
                //   value={formData.AccessType}
                //   onBlur={formik.handleBlur}
                autoComplete="current-number"
                onChange={(e) => {
                  formData.AccessType_id = e.target.value;
                  setformData({ ...formData });
                }}
              >
                {roleData?.map((val, i) =>
                  val.id == 3 || val.id == 1 ? null : (
                    <MenuItem value={val.id}>{val.role_name}</MenuItem>
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
                sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
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
                    checked={formData.UserList.visibility == "No" ?false:true}
                    disabled={formData.UserList.visibility == "No" ?true:false}
                      control={<Checkbox />}
                      label="View Page And Menu "
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
                sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
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
                    checked={formData.Products.visibility == "No" ?false:true}
                    disabled={formData.Products.visibility == "No" ?true:false}
                      control={<Checkbox />}
                      label="View Page And Menu "
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
                sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
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
                    checked={formData.modules.visibility == "No" ?false:true}
                    disabled={formData.modules.visibility == "No" ?true:false}
                      control={<Checkbox />}
                      label="View Page And Menu "
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
                sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
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
                    checked={formData.ClientsPortal.visibility == "No" ?false:true}
                    disabled={formData.ClientsPortal.visibility == "No" ?true:false}
                      control={<Checkbox />}
                      label="View Page And Menu "
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
                      label="Add WelCome Video"
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
                sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
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
                    checked={formData.AdminDashboard == "No" ?false:true}
                    disabled={formData.AdminDashboard == "No" ?true:false}
                      control={<Checkbox />}
                      label="View Page And Menu "
                    />
                    </FormGroup>
              </Grid>

              <Grid
                item
                xs="12"
                md={6}
                lg={4}
                sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
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
                    checked={formData.BookCall == "No" ?false:true}
                    disabled={formData.BookCall == "No" ?true:false}
                      control={<Checkbox />}
                      label="View Page And Menu "
                    />
                    </FormGroup>
              </Grid>

              <Grid item xs="12" textAlign="center" mt={3}>
                <Button
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                  className={"A1"}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AccessBySuperAdmin;
