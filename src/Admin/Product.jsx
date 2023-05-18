import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Pagination, TextField, Typography } from "@mui/material";
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
export default function Product() {
  const Navigate = useNavigate();
  const [ProductData, setProductData] = useState([])
  const [Count, setCount] = useState()
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowDelete, setmodalShowDelete] = React.useState(false);
  const [Productid, setProductid] = React.useState();
  const [id, setid] = React.useState();
  const [loader, setloader] = useState(true);

  let obj = {
    "order": "desc",
    "sort": "products.id",
    "limit": 10,
    "page": 1
  }
  const GetData = () => {
    Exportproduct.GetAllProduct(obj).then(
      (resp) => {
        if (resp.ok) {
          console.log(resp.data.data)
          if (resp.data) {
            setProductData(resp.data.data);
            setCount(resp.data.product_count);
            setloader(false)
          }else{
            setloader(false)
          }
        
        }
      }
    );
  }
  const handleDeleteproduct = (id) => {
    setid(id)
    setmodalShowDelete(true)
  }
  const hendleProductDelet = () => {
    Exportproduct.Productdelete(id).then(
      (resp) => {
        if (resp.ok) {
          console.log(resp.data.data)
          if (resp.data) {
            toast.success('Product delete successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            GetData()
            setmodalShowDelete(false)
            // setProductData(resp.data.data);
            // setCount(resp.data.product_count);
          }
        }
      }
    );
  }
  const hendlePagintion = (event, value) => {
    let obj = {
      "order": "desc",
      "sort": "products.id",
      "limit": 10,
      "page": value
    }
    //EditProduct
    Exportproduct.GetAllProduct(obj).then(
      (resp) => {
        if (resp.ok) {
          console.log(resp.data.data)
          if (resp.data) {
            setProductData(resp.data.data);
            setCount(resp.data.product_count);
          }
        }
      }
    );
  }
  useEffect(() => {
    GetData()
  }, [])
  const hendleshowmodal = (id) => {
    setModalShow(true)
    setProductid(id)
  }
  const formik = useFormik({
    initialValues: {
      products_id: Productid?.products_id ? Productid?.products_id : "",
      product_name: Productid?.product_name ? Productid?.product_name : "",
      product_status: Productid?.product_status ? Productid?.product_status : false
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      product_name: Yup.string()
        .required("Enter your product name"),
    }),
    onSubmit: (values) => {
      // CoustomRegistration(values, "Registration")
      Exportproduct.EditProduct(values)
        .then((resp) => {
          console.log(resp)
          if (resp.data.message == "Product update successfully") {
            toast.success('Product updated successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            GetData()
            setModalShow(false)
            // Navigate('/Productlist')
          } else {
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
        .catch((err) => toast.error('Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }));
    },
  });
  return (
    <div>
      {" "}
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Product List
      </Typography>
      <hr height={3} />
      <Box mt={5}>
      {loader?    <div style={{marginTop:"24%"}}>
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
               
            </div>:<>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item mt={5} xs={8}>
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
                  <th>Product Name</th>
                  <th>Modules</th>
                  <th>Action</th>
                  <th>View Product</th>
                </tr>
              </thead>
              <tbody>
                {ProductData?.map((item, index) => {

                  return <tr>
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.total_module}</td>
                    <td>
                      <EditIcon sx={{ color: "#0CB4D0" }} onClick={() => { hendleshowmodal(item) }} /> &nbsp;
                      <DeleteIcon sx={{ color: "red" }} onClick={() => { handleDeleteproduct(item.products_id) }} />{" "}
                    </td>
                    <td
                      onClick={() => {
                        Navigate("/Productlist/moduleList");
                        localStorage.setItem("Product",JSON.stringify(item))
                      }}
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
                })}
                {/* <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>7       </td>
                  <td>
                    <EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;
                    <DeleteIcon sx={{ color: "red" }} />{" "}
                  </td>
                  <td
                    onClick={() => Navigate("/Productlist/moduleList")}
                    style={{ color: "#0CB4D0", cursor: "pointer" }}
                  >
                    {" "}
                    <RemoveRedEyeIcon
                      sx={{
                        color: "#0CB4D0",
                        marginBottom: "10px",
                        fontSize: "28px",
                      }}
                    />
                    &nbsp; View{" "}
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>@twitter</td>
                  <td>6</td>
                  <td>
                    <EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;{" "}
                    <DeleteIcon sx={{ color: "red" }} />{" "}
                  </td>
                  <td
                    onClick={() => Navigate("/Productlist/moduleList")}
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
                    &nbsp;View{" "}
                  </td>
                </tr> */}
              </tbody>
            </Table>
            {console.log(Math.ceil(Count / 10))}
            <Pagination onChange={hendlePagintion} count={Math.ceil(Count / 10)} />
          </Grid>
          <Grid item mt={-3} xs={2}>  <Button onClick={() => Navigate("/CreateProduct")} sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
            className={"active"}
          /> &nbsp; &nbsp; &nbsp; Create Product</Button> </Grid>
        </Grid>
        </>}
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
            <Box mt={5}>
              <Button type="submit" sx={{ marginLeft: "10px" }} className={"A1"} variant="contained">Submit</Button>
            </Box>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalShowDelete}
        onHide={() => setmodalShowDelete(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>    <h5>Are You Sure ?</h5></center>

          <Grid container spacing={1}>
            <Grid item mt={3} xs={1}></Grid>
            <Grid item mt={3} xs={5}><Button onClick={()=>hendleProductDelet()} variant="contained" color="error">
              Delete
            </Button></Grid>
            <Grid item mt={3} xs={5}>
              <Button onClick={()=>setmodalShowDelete(false)} variant="contained" >
                Cancel
              </Button>
            </Grid>
            <Grid item mt={3} xs={1}></Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
