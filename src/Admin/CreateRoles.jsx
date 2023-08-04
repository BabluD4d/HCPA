import React from "react";
import { useState } from "react";
import CreateRoleHandler from "../Api/Admin/CreateRole/CreateRole";
import { styled } from "@mui/material/styles";
import { ColorRing } from "react-loader-spinner";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { Modal} from "react-bootstrap";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CreateRoles = () => {
  const [role, setRole] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [roleId, setRoleId] = useState(undefined);
  const [isEditable, setIsEditable] = useState(false);
  const [modalShowDelete, setmodalShowDelete] = useState(false);
  // Get all Roles
  useEffect(() => {
    getAllRoles();
  }, []);

  // Create new Role
  const createRoleFunc = (e) => {
    e.preventDefault();
    if (!isEditable) {
      if (role !== "") {
        CreateRoleHandler.CreateRole(role).then((resp) => {
          if (resp.data.success) {
            getAllRoles();
            toast.success("Role created successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => setRole(""),
            });
          } else {
            toast.warning(`${resp.data.errors.role_name}`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => setRole(""),
            });
          }
        });
      }
    } else {
      CreateRoleHandler.updateRole(roleId, role)
        .then(() => {
          toast.success("Role updated successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => setRole(""),
          });
          setIsEditable(false);
          setRole("");
          setRoleId(undefined);
          getAllRoles();
        })
        .catch((error) => console.log(error, "this is new error"));
    }
  };

  // Get all Roles
  const getAllRoles = () => {
    CreateRoleHandler.roleListAll().then((res) => setRoleList(res?.data?.data));
  };

  // Delete Role
  // const deleteRoleFun = (role_id) => {
  //   CreateRoleHandler.deleteRole(role_id)
  //     .then((res) => {
  //       if (res.data.success) {
  //         getAllRoles();
  //         toast.success("Role deleted successfully", {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //     })
  //     .catch((error) => console.log(error, "this is the error"));
  // };

  const handleDeleteproduct = (id) => {
    setRoleId(id);
    setmodalShowDelete(true);
  };
  const hendleProductDelet = () => {
    CreateRoleHandler.deleteRole(roleId)
      .then((res) => {
        if (res.data.success) {
          getAllRoles();
          toast.success("Role deleted successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setmodalShowDelete(false);
        }
      })
      .catch((error) => console.log(error, "this is the error"));
  };

  console.log(roleList, 'roleList')
  return (
    <Box>
      <Typography
        className="main-title-ad"
        fontSize={{ xs: "20px", lg: "30px" }}
        sx={{
          borderBottom: "1px solid #bbb5b5",
          paddingBottom: "15px",
          marginBottom: "40px",
        }}
      >
        Create Role
      </Typography>
      <Box component="form">
        <Grid
          container
          sx={{ maxWidth: "1000px", width: "100%", margin: "auto" }}
        >
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              name="role-name"
              id="role-name"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Create Role"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={(e) => createRoleFunc(e)}
              sx={{
                height: "55px",
                width: { xs: "100%", sm: "auto", marginLeft: "10px" },
              }}
              className={"A1"}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper} sx={{ my: 5 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell> Edit / Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleList.length <= 0 ? (
              <TableRow>
                <StyledTableCell colSpan={2}>
                  <ColorRing
                    visible={true}
                    wrapperClass="role-loader"
                    height="50"
                    width="50"
                    colors={[
                      "#0CB4D0",
                      "#0CB4D0",
                      "#0CB4D0",
                      "#0CB4D0",
                      "#0CB4D0",
                    ]}
                  />
                </StyledTableCell>
              </TableRow>
            ) : (
              roleList.map(({ id, role_name }) => {
                if (id != "3") {
                  return (
                    <TableRow key={id}>
                      <StyledTableCell id={id}>{role_name}</StyledTableCell>
                      <StyledTableCell
                        style={{
                          color: "#0CB4D0",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        {localStorage.getItem("role") != 1 ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            <span
                              onClick={(e) => {
                                setIsEditable(true);
                                setRoleId(id);
                                setRole(role_name);
                              }}
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            >
                              Edit
                            </span>
                            /
                            <span
                             onClick={() => {
                                handleDeleteproduct(id);
                              }}
                              // onClick={() => deleteRoleFun(id)}
                              style={{ marginLeft: "5px" }}
                            >
                              Delete
                            </span>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            <span
                              onClick={(e) => {
                                setIsEditable(true);
                                setRoleId(id);
                                setRole(role_name);
                              }}
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            >
                              Edit
                            </span>
                            /
                            <span
                              onClick={() => {
                                handleDeleteproduct(id);
                              }}
                              // onClick={() => deleteRoleFun(id)}
                              style={{ marginLeft: "5px" }}
                            >
                              Delete
                            </span>
                          </Box>
                        )}
                      </StyledTableCell>
                    </TableRow>
                  );
                }
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Role Modal */}
      <Modal
        show={modalShowDelete}
        onHide={() => setmodalShowDelete(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Role
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            {" "}
            <h5>Are You Sure?</h5>
          </center>

          <Grid container mt={3}>
            <Grid item xs={6} textAlign="center">
              <Button
                onClick={() => hendleProductDelet()}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Button
                onClick={() => setmodalShowDelete(false)}
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Modal.Body>
      </Modal>
    </Box>
  );
};

export default CreateRoles;
