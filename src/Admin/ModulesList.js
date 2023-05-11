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
import ExportModiles from "../Api/Admin/Modules/ExportModiles";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function ModulesList() {
    const Navigate=useNavigate()
    const [ModuleList, setModuleList] = useState([]);
    const [ProductData, setProductData] = useState([])
    const [ProductSingle, setProductSingle] = useState()
    const [modalShow, setModalShow] = React.useState(false);
    const [EditData, setEditData] = useState();
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
              GetDataModuiles1(ProductSingle)
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
    const GetDataModuiles1 = (event) => {
      // console.log(event.target.value)
      // setProductSingle(event.target.value)
      // alert(event)
      let obj = {
        order: "asc",
        limit: 10,
        page: 1,
        products_id:event,
      };
      ExportModiles.ModuilesAll(obj).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data);
          if (resp.data.data[0]) {
            setModuleList(resp.data.data);
          }else{
            setModuleList([]);
          }
        }
      });
    };
    const GetDataModuiles = (event) => {
      // console.log(event.target.value)
      // setProductSingle(event.target.value)
      let obj = {
        order: "asc",
        limit: 10,
        page: 1,
        products_id:event.target.value,
      };
      ExportModiles.ModuilesAll(obj).then((resp) => {
        if (resp.ok) {
          console.log(resp.data.data);
          if (resp.data.data[0]) {
            setModuleList(resp.data.data);
          }else{
            setModuleList([]);
          }
        }
      });
    };
    const GetData = () => {
      let obj = {
        "order": "desc",
        "sort": "products.id",
        "limit": 10,
        "page": 1
      }
      Exportproduct.GetAllProduct(obj).then(
        (resp) => {
          if (resp.ok) {
            // console.log(resp.data.data)
            if (resp.data) {
              setProductData(resp.data.data);
            }
          }
        }
      );
    }
    const handlemodal=(data)=>{
      console.log({data})
      setEditData(data)
      setTimeout(() => {
        setModalShow(true)
      });
    }
    useEffect(() => {
      GetData()
    }, [])
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
          GetDataModuiles1(ProductSingle)
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
      <Grid container spacing={4} mt={2} >
      <Grid xl={3} > 
      {/* <ArrowBackIcon onClick={()=>Navigate('/ModulesList')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/> */}
      </Grid>
      <Grid xl={6} > 
      <FormControl fullWidth>
                <InputLabel
                  sx={{ marginLeft: "10px" }}
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Product
                </InputLabel>
                <NativeSelect
                  defaultValue={10}
                  inputProps={{
                    name: "Product",
                    id: "uncontrolled-native",
                  }}
                  onChange={(e)=>{GetDataModuiles(e);  setProductSingle(e.target.value)}}
                >
                  <option value={""}></option>
                   {ProductData?.map((val,i)=>{
                   return <option value={val.products_id}>{val.product_name}</option>
                   })}
                </NativeSelect>
              </FormControl>
      </Grid>
      <Grid xl={3} > 
      <Button onClick={()=>Navigate("/CreactModules")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
            className={"active"}
          /> &nbsp; &nbsp; &nbsp; Create Modelus</Button>
      </Grid>
        </Grid>
      <Box mt={5}>
          <Grid container spacing={4} mt={2} pl={9}>
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
          {/* <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={3} ProductName={"SDA"} />
          <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={2} ProductName={"Aged Caredis"} />
          <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={3} ProductName={"SDA"} />   */}
           
{/*        
            <Pagination count={10} /> */}
          </Grid>
          {/* <Grid item mt={-3} xs={2}>  <Button onClick={()=>Navigate("/CreateProduct")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
            className={"active"}
          /> &nbsp; &nbsp; &nbsp; Create Product</Button> </Grid> */}
     
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
              {/* <TextField
                disabled
                id="filled-disabled"
                label="Product Name"
                defaultValue="Hello World"
                variant="filled"
                fullWidth
                value={ProductSingle?.product_name}
              /> */}
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
  )
}
