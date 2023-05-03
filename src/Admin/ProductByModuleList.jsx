import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  NativeSelect,
  Pagination,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AdminProductCart from "../commenComponet/AdminProductCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExportModiles from "../Api/Admin/Modules/ExportModiles";
import CreateIcon from "@mui/icons-material/Create";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function ProductByModuleList() {
  const Navigate = useNavigate();
  const [ModuleList, setModuleList] = useState([]);
  const [EditData, setEditData] = useState();
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );
  const [modalShow, setModalShow] = React.useState(false);
  const GetData = () => {
    let obj = {
      order: "asc",
      limit: 10,
      page: 1,
      products_id: Product.products_id,
    };
    ExportModiles.ModuilesAll(obj).then((resp) => {
      if (resp.ok) {
        console.log(resp.data.data);
        if (resp.data.data[0]) {
          setModuleList(resp.data.data);
        }
      }
    });
  };
  useEffect(() => {
    GetData();
  }, []);
  const formik = useFormik({
    initialValues: {
      module_name: EditData?.module_name ? EditData?.module_name : "",
      module_status: EditData?.module_status ? EditData?.module_status : false,
      id: EditData?.module_id ? EditData?.module_id : ""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      module_name: Yup.string()
        .required("Enter your module name"),
    }),
    onSubmit: (values) => {
      ExportModiles.ModuilesUpdate(values)
        .then((resp) => {
          console.log(resp)
          if (resp.data.message == "Module record update successfully") {
            toast.success('Module updated successfully', {
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
        .catch((err) => toast.error('Something went rong', {
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
  const handlemodal=(data)=>{
    console.log({data})
    setEditData(data)
    setTimeout(() => {
      setModalShow(true)
    });
  }
  const onChangeHendle=(item,value)=>{
    let obj={
      module_name: item?.module_name ,
      module_status: !item?.module_status ,
      id: item?.module_id 
    }


    ExportModiles.ModuilesUpdate(obj)
    .then((resp) => {
      console.log(resp)
      if (resp.data.message == "Module record update successfully") {
        toast.success('Module updated successfully', {
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
        // Navigate('/Productlist')
      } else {
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
    .catch((err) => toast.error('Something went rong', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }));
  }
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Moduels List
      </Typography>
      <hr height={3} />
      <Grid container spacing={4} mt={2}>
        <Grid xl={1}>
          <ArrowBackIcon
            onClick={() => Navigate("/Productlist")}
            style={{ color: "#0cb4d0", fontSize: "50px", marginLeft: "18px" }}
          />
        </Grid>
        <Grid xl={5}>
        <Typography   sx={{ fontSize: "30px" }}>
        Moduels List
      </Typography>
        </Grid>
        <Grid xl={6}>
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => Navigate("/CreactModules")}
              sx={{ marginLeft: "10%" }}
              className={"A1"}
              variant="contained"
            >
              <EditCalendarIcon className={"active"} /> &nbsp; &nbsp; &nbsp;
              Create Modelus
            </Button>
          </div>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Grid container spacing={4} mt={2} pl={9}>
          {/* <Grid mb={3}xl={0.5} sm={6} lg={3} item xs={11}> </Grid> */}
          {ModuleList &&
            ModuleList?.map((item, index) => {
              return (
                <AdminProductCart
                  navi={"/Admin/AllDocumentAdmin"}
                  status={item.module_status}
                  foo={"1"}
                  size={3}
                  Modules={item.total_document}
                  ProductName={item.module_name}
                  handlemodal={handlemodal}
                  item={item}
                  onChangeHendle={onChangeHendle}
                />
              );
            })}

          {/* <AdminProductCart navi={"/Admin/AllDocumentAdmin"}  foo={"1"} size={3} Modules={2} ProductName={"Aged Caredis"} />
            <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={3} ProductName={"SDA"} />   */}
        </Grid>
        <center>
          <Box ml={9} mt={2}>
            {ModuleList[0] ? <Pagination count={10} /> : null}
          </Box>
        </center>
        {/* <Pagination onChange={hendlePagintion} count={Math.ceil(Count / 10)} /> */}
        {/* <Grid item mt={-3} xs={2}>  <Button onClick={()=>Navigate("/CreateProduct")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Product</Button> </Grid> */}
      </Box>
      <Box mt={5}>
        <Grid container spacing={4} mt={2} >
          <Grid  xs={1}>
            </Grid>
          <Grid  xs={5}>
            {" "}
            <Typography  mt={4}  sx={{ fontSize: "30px" }}>
              CheckList
            </Typography>
          </Grid>
          <Grid   xs={6}>
            {" "}
            <Button
             mt={4}
              onClick={() => Navigate("/Productlist/cretechalist")}
              sx={{ marginLeft: "10%" }}
              className={"A1"}
              variant="contained"
            >
              <EditCalendarIcon className={"active"} /> &nbsp; &nbsp; &nbsp;
              Add  Checklist
            </Button>{" "}
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} pl={9}>
          <Grid mb={3} xl={3} sm={6} lg={3} item xs={11}>
            <div style={{ marginBottom: "22px" }}>
              <div style={{ display: "flex" }}>
                <Typography
                  mt={2}
                  ml={6}
                  sx={{ fontSize: "13px", backgroundColor: "#e0e0e0" }}
                >
                  To be completed
                </Typography>
                <p></p>
              </div>
              <Typography mt={1} ml={6} sx={{ fontSize: "17px" }}>
                HCPA Checklist - NDIS 1
              </Typography>
              <Typography ml={6} sx={{ fontSize: "10px" }}>
                0 of 4 sections completed
              </Typography>
              <div>
                <Typography
                  onClick={() => Navigate("/checklist/preview")}
                  mt={2}
                  ml={6}
                  sx={{ color: "#0CB4D0", fontSize: "15px", cursor: "pointer" }}
                >
                  {" "}
                  <CreateIcon
                    sx={{
                      color: "#0CB4D0",
                      fontSize: "20px",
                      marginBottom: "15px",
                    }}
                  />{" "}
                  Edit
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
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
            <Box mt={5}>
              <TextField
                disabled
                id="filled-disabled"
                label="Product Name"
                defaultValue="Hello World"
                variant="filled"
                fullWidth
                value={Product?.product_name}
              />
              </Box>
              <Box mt={5}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Modelus Name "
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="module_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.module_name}
                autoComplete="current-number"
            />
            {formik.touched.module_name && formik.errors.module_name ? (
                <div style={{ color: "red" }}>{formik.errors.module_name}</div>
            ) : null}
              </Box>
              <Box mt={5}>
              <FormControl>
                <FormLabel
                  sx={{ marginLeft: "10px" }}
                  id="demo-form-control-label-placement"
                >
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  defaultValue="top"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.module_status}
                  autoComplete="current-number"
             
             
                >
                  <FormControlLabel
                    value={true}
                    name="module_status"
                    control={<Radio />}
                    label="Lock"
                    labelPlacement="Lock"
                  />
                  <FormControlLabel
                     defaultChecked
                    value={false}
                    name="module_status"
                    control={<Radio />}
                    label="Unlock"
                    labelPlacement="Unlock"
                  />
                </RadioGroup>
                {/* {formik.values.module_status} */}
                {formik.touched.module_status && formik.errors.module_status ? (
                  <div style={{ color: "red" }}>{formik.errors.module_status}</div>
              ) : null}
              </FormControl>
              </Box>
              <Box mt={5}>
                <Button
                type="submit"
                  sx={{ marginLeft: "10px" }}
                  className={"A1"}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
              </Box>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
