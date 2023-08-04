import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Modal, Table } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { styled } from "@mui/material/styles";

export default function Product() {
  const Navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const [Count, setCount] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowDelete, setmodalShowDelete] = React.useState(false);
  const [Productid, setProductid] = React.useState();
  const [id, setid] = React.useState();
  const [loader, setloader] = useState(true);
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

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

  let obj = {
    order: "desc",
    sort: "products.id",
    limit: 10,
    page: 1,
  };
  const GetData = () => {
    Exportproduct.GetAllProduct(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setProductData(resp.data.data);
          setCount(resp.data.product_count);
          setloader(false);
        } else {
          setloader(false);
        }
      }
    });
  };
  useEffect(() => {
    if (Data.access[0].accessibility.Products.visibility == "No") {
      Navigate("/Profile/Admin");
    }
    GetData();
  }, []);
  const handleDeleteproduct = (id) => {
    setid(id);
    setmodalShowDelete(true);
  };
  const hendleProductDelet = () => {
    Exportproduct.Productdelete(id).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          toast.success("Product delete successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          GetData();
          setmodalShowDelete(false);
          // setProductData(resp.data.data);
          // setCount(resp.data.product_count);
        }
      }
    });
  };
  const hendlePagintion = (event, value) => {
    let obj = {
      order: "desc",
      sort: "products.id",
      limit: 10,
      page: value,
    };
    //EditProduct
    Exportproduct.GetAllProduct(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setProductData(resp.data.data);
          setCount(resp.data.product_count);
        }
      }
    });
  };

  const hendleshowmodal = (id) => {
    setModalShow(true);
    setProductid(id);
  };
  const formik = useFormik({
    initialValues: {
      products_id: Productid?.products_id ? Productid?.products_id : "",
      product_name: Productid?.product_name ? Productid?.product_name : "",
      product_status: Productid?.product_status
        ? Productid?.product_status
        : false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      product_name: Yup.string().required("Enter your product name"),
    }),
    onSubmit: (values) => {
      // CoustomRegistration(values, "Registration")
      Exportproduct.EditProduct(values)
        .then((resp) => {
          if (resp.data.message == "Product update successfully") {
            toast.success("Product updated successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            GetData();
            setModalShow(false);
            // Navigate('/Productlist')
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
        Product List
      </Typography>
      <Box mt={5}>
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
            <Grid container>
              <Grid className="main-cont-pro-btn" item xs={12}>
                {Data.access[0].accessibility.Products.Add ? (
                  <Button
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                    onClick={() => Navigate("/CreateProduct")}
                    className={"A1"}
                    variant="contained"
                  >
                    <EditCalendarIcon className={"active"} /> Create Product
                  </Button>
                ) : (
                  <Button
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                    disabled
                    className={"A1"}
                    variant="contained"
                  >
                    <EditCalendarIcon className={"active"} /> Create Product
                  </Button>
                )}
              </Grid>

              <Grid className="main-cont-pro-tab" item xs={12}>
                <Box mt={4} className="user-list-table">
                  <TableContainer component={Paper} sx={{ mb: 2 }}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>#</StyledTableCell>
                          <StyledTableCell>Product Name</StyledTableCell>
                          <StyledTableCell>Modules</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                          <StyledTableCell>View Product</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ProductData?.map((item, index) => {
                          return (
                            <TableRow>
                              <StyledTableCell>{index + 1}</StyledTableCell>
                              <StyledTableCell>
                                {item.product_name}
                              </StyledTableCell>
                              <StyledTableCell>
                                {item.total_module}
                              </StyledTableCell>
                              <StyledTableCell>
                              {Data.access[0].accessibility.Products.Edit ? (
                                <EditIcon
                                  sx={{ color: "#0CB4D0" }}
                                  onClick={() => {
                                    hendleshowmodal(item);
                                  }}
                                />): <EditIcon
                                sx={{ color: "#0CB4D0" }}
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
                              />}
                                &nbsp;
                                {Data.access[0].accessibility.Products.Delete ?
                                <DeleteIcon
                                  sx={{ color: "red" }}
                                  onClick={() => {
                                    handleDeleteproduct(item.products_id);
                                  }}
                                />:
                                <DeleteIcon
                                  sx={{ color: "red" }}
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
                                />}
                              </StyledTableCell>
                              {Data.access[0].accessibility.Products.View ?  
                              <StyledTableCell
                                onClick={() => {
                                  Navigate("/Productlist/moduleList");
                                  localStorage.setItem(
                                    "Product",
                                    JSON.stringify(item)
                                  );
                                }}
                                style={{ color: "#0CB4D0", cursor: "pointer" }}
                              >
                                <RemoveRedEyeIcon
                                  sx={{
                                    color: "#0CB4D0",
                                    marginBottom: "10px",
                                    fontSize: "28px",
                                  }}
                                />
                                &nbsp; View
                              </StyledTableCell>:
                              <StyledTableCell
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
                                style={{ color: "#0CB4D0", cursor: "pointer" }}
                              >
                                <RemoveRedEyeIcon
                                  sx={{
                                    color: "#0CB4D0",
                                    marginBottom: "10px",
                                    fontSize: "28px",
                                  }}
                                />
                                &nbsp; View
                              </StyledTableCell>}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Pagination
                  sx={{ mb: 5 }}
                  onChange={hendlePagintion}
                  count={Math.ceil(Count / 10)}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Create Product"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              name="product_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.product_name}
              autoComplete="current-number"
            />
            {formik.touched.product_name && formik.errors.product_name ? (
              <div style={{ color: "red" }}>{formik.errors.product_name}</div>
            ) : null}
            <Box mt={3}>
              <Button
                type="submit"
                sx={{ width: { xs: "100%", sm: "auto" } }}
                className={"A1"}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal.Body>
      </Modal>
      
      <Modal
        show={modalShowDelete}
        onHide={() => setmodalShowDelete(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            {" "}
            <h5>Are You Sure ?</h5>
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
    </div>
  );
}
