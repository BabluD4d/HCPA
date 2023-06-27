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
import ExportChecklist from "../Api/Admin/CheckList/ExportChecklist";
import Exportguid from "../Api/Admin/guid/Exportguid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReactPlayer from "react-player";
import { BaseApi, BaseUrlImage } from "../Api/BaseApi";
import EditRegistrationGuides from "./EditRegistrationGuides";
import { ColorRing } from "react-loader-spinner";
export default function ProductByModuleList() {
  const Navigate = useNavigate();
  const [ModuleList, setModuleList] = useState([]);
  const [GuidData, setGuidData] = useState([]);
  const [GuidDataSingle, setGuidDataSingle] = useState();
  const [Checklis, setChecklis] = useState([]);
  const [EditData, setEditData] = useState();
  const [EditDataGuid, setEditDataGuid] = useState();
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowVideo, setModalShowVideo] = React.useState(false);
  const [modalShowEditGuid, setmodalShowEditGuid] = React.useState(false);
  const [loader, setloader] = useState(true);
  const [NotFound, setNotFound] = useState({ A: "", B: "", C: "" });
  const [Count, setCount] = useState(1);
  const [page, setpage] = useState(1);
  const GetData = () => {
    let obj = {
      order: "asc",
      limit: 10,
      page: page,
      products_id: Product.products_id,
    };
    ExportModiles.ModuilesAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data.data.data[0]) {
          setCount(resp.data.data.count);
          setModuleList(resp.data.data.data);
          setloader(false);
          NotFound.A=""
          setNotFound({...NotFound})
        } else {
          NotFound.A="No record found"
          setNotFound({...NotFound})
          setloader(false);
        }
      }
    });
  };
  const GetGuidAllData = () => {
    let obj = {
      // order: "asc",
      // limit: 10,
      // page: 1,
      products_id: Product.products_id,
    };
    Exportguid.GuidAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data.data[0]) {
          setGuidData(resp.data.data);
          setloader(false);
          NotFound.B=""
          setNotFound({...NotFound})
        } else {
          NotFound.B="No record found"
          setNotFound({...NotFound})
          setloader(false);
        }
      }
    });
  };
  const GetDataChecklistAll = () => {
    let obj = {
      // order: "asc",
      // limit: 10,
      // page: 1,
      products_id: Product.products_id,
    };
    ExportChecklist.ChecklistAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data.data[0]) {
          setChecklis(resp.data.data);
          setloader(false);
          NotFound.C=""
          setNotFound({...NotFound})
        } else {
          NotFound.C="No record found"
          setNotFound({...NotFound})
          setloader(false);
        }
      }
    });
  };
  useEffect(() => {
    GetData();
    GetDataChecklistAll();
    GetGuidAllData();
  }, []);
  const formik = useFormik({
    initialValues: {
      module_name: EditData?.module_name ? EditData?.module_name : "",
      module_status: EditData?.module_status ? EditData?.module_status : false,
      id: EditData?.module_id ? EditData?.module_id : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      module_name: Yup.string().required("Enter your module name"),
    }),
    onSubmit: (values) => {
      ExportModiles.ModuilesUpdate(values)
        .then((resp) => {
          if (resp.data.message == "Module record update successfully") {
            toast.success("Module updated successfully", {
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
  const handlemodal = (data) => {
    setEditData(data);
    setTimeout(() => {
      setModalShow(true);
    });
  };
  const onChangeHendle = (item, value) => {
    let obj = {
      module_name: item?.module_name,
      module_status: !item?.module_status,
      id: item?.module_id,
    };

    ExportModiles.ModuilesUpdate(obj)
      .then((resp) => {
        if (resp.data.message == "Module record update successfully") {
          toast.success("Module updated successfully", {
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
  };
  const hendleGuidUpdateData = () => {
    GetGuidAllData();
    setmodalShowEditGuid(false);
  };
  const hendlePagintion = (event, value) => {
    setpage(value);
    let obj = {
      order: "asc",
      limit: 10,
      page: value,
      products_id: Product.products_id,
    };
    //EditProduct
    ExportModiles.ModuilesAll(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data.data.data[0]) {
          setCount(resp.data.data.count);
          setModuleList(resp.data.data.data);
        } else {
          setModuleList([]);
        }
      }
    });
  };
  return (
    <div>
      <Grid xs={12}>
          <ArrowBackIcon
          sx={{ml:0}}
          className="back-icon-proact"
            onClick={() => Navigate("/Productlist")}
         />
        </Grid>
      
    <Grid container my={4} alignItems="center">
      <Grid sm={6} xs={12}>
        <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} mb={{xs:2, sm:0}} textAlign={{xs:'center', sm:'left'}}>Moduels List </Typography>
      </Grid>
      <Grid sm={6} xs={12} textAlign={{xs:'left', sm:'right'}}> 
        <Button
          sx={{width:{xs:'100%', sm:'auto'}}}
          onClick={() => Navigate("/CreactModules")}
          className={"A1"}
          variant="contained"
        >
          <EditCalendarIcon className={"active"} /> 
          Create Modelus
        </Button>
      </Grid>
    </Grid>

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
          <Box>
            <Grid container>
              {NotFound.A? <div style={{ marginTop: "4%" ,marginLeft:"20%"}}>
                <h3> <center>{NotFound.A}</center></h3>
              </div>:null}
              <Grid container spacing={4}>
                {
                  ModuleList && ModuleList?.map(item => 
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
                  )
                }
              </Grid>
              <Grid xs={12} mt={6}>
                <Box>
                  {ModuleList[0] ? <Pagination onChange={hendlePagintion} count={Math.ceil(Count / 10)} /> : null}
                </Box>
              </Grid>
            </Grid>
        </Box>
       
          <Box mt={5}>
            <Grid container alignItems="center">
              <Grid xs={12} sm={6}>
                <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} mb={{xs:2, sm:0}} textAlign={{xs:'center', sm:'left'}} >
                  CheckList
                </Typography>
              </Grid>
              <Grid sm={6} xs={12} textAlign={{xs:'left', sm:'right'}}>
                <Button sx={{width:{xs:'100%', sm:'auto'}, mb:3}} onClick={() => Navigate("/Productlist/cretechalist")} className={"A1"} variant="contained">
                  <EditCalendarIcon className={"active"} />Add Checklist
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={4} >
            {NotFound.C? <div style={{ marginTop: "4%" , marginLeft:"20%"}}>
                <h3> <center>{NotFound.A}</center></h3>
              </div>:null}
              {Checklis.map((item, i) => (
                <Grid xl={3} sm={6} md={4} item xs={12}>
                  <div className="check-box-shadow">
                    <div style={{ display: "flex" }}>
                      <Typography sx={{ fontSize: "13px", backgroundColor: "#e0e0e0" }}>To be completed </Typography>
                    </div>
                    <Typography mt={1}  sx={{ fontSize: "17px" }}>{item.title}</Typography>
                    <Typography  sx={{ fontSize: "10px" }}>0 of 4 sections completed</Typography>
                    <div>
                      <Typography onClick={() => Navigate("/checklist/Edit/" + item.id)} mt={2} sx={{color: "#0CB4D0", fontSize: "15px", cursor: "pointer"}}>
                        <CreateIcon sx={{color: "#0CB4D0", fontSize: "20px", marginBottom: "15px"}} />Edit
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>

{/*/Productlist/moduleList  Registration Guides  */}

          <Box my={5}>
            <Grid container alignItems="center">
              <Grid xs={12} sm={6}>
                <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} mb={{xs:2, sm:0}} textAlign={{xs:'center', sm:'left'}} >Registration Guides</Typography>
              </Grid>
              <Grid className="product-module-list-btn" sm={6} xs={12}>
                <Button                
                  onClick={() => Navigate("/CreateRegistrationGuides")}                  
                  className={"A1"}
                  variant="contained"
                  sx={{width:{xs:'100%', sm:'auto'}, mb:3, marginTop: '0!important'}}
                >
                  Add Registration Guides
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
            {NotFound.B? <div style={{ marginTop: "4%" ,marginLeft:"20%"}}>
                <h3> <center>{NotFound.A}</center></h3>
              </div>:null}
              {GuidData.map((item, i) => (
                <Grid xl={3} sm={6} md={4} item xs={12}>
                <div className="check-box-shadow">
                    <div style={{ display: "flex" }}>
                      <Typography sx={{ fontSize: "13px", backgroundColor: "#e0e0e0" }}>To be completed</Typography>
                    </div>
                    <Typography mt={1} sx={{ fontSize: "17px" }}>{item.title}</Typography>
                    <Typography  sx={{ fontSize: "10px" }}>0 of 4 sections completed</Typography>
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={6}>
                        <Typography onClick={() => {setEditDataGuid(item); setmodalShowEditGuid(true)}} mt={2} sx={{color: "#0CB4D0", fontSize: "15px",cursor: "pointer"}}>
                          <CreateIcon sx={{color: "#0CB4D0", fontSize: "20px", marginBottom: "15px"}} /> Edit
                        </Typography>
                      </Grid>
                      <Grid className="viewGuid" item xs={6}>
                        <Typography onClick={() => {setGuidDataSingle(item); setTimeout(() => {setModalShowVideo(true)})}} mt={2} sx={{color: "#0CB4D0", fontSize: "15px", cursor: "pointer"}}>
                          <RemoveRedEyeIcon sx={{color: "#0CB4D0",  fontSize: "20px", marginBottom: "15px"}} /> View Guid
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
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
            <Box>
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
                  <div style={{ color: "red" }}>
                    {formik.errors.module_status}
                  </div>
                ) : null}
              </FormControl>
            </Box>
            <Box mt={3}>
              <Button
                type="submit"
                className={"A1"}
                sx={{width:{xs:'100%', sm:'auto'}}}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShowVideo}
        onHide={() => setModalShowVideo(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Guid
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="playerDiv">
            {GuidDataSingle?.video_link ? (
              <ReactPlayer
                width="100%"
                height="100%"
                playing={true}
                muted={true}
                controls={true}
                url={GuidDataSingle?.video_link}
              />
            ) : (
              <ReactPlayer
                width="100%"
                height="100%"
                playing={true}
                muted={true}
                controls={true}
                url={BaseUrlImage + GuidDataSingle?.file_path}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShowEditGuid}
        onHide={() => setmodalShowEditGuid(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Guid
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container mt={2}>
            <Grid mb={3} item xs={12}>
              {EditDataGuid ? (
                <EditRegistrationGuides
                  hendleGuidUpdateData={hendleGuidUpdateData}
                  EditDataGuid={EditDataGuid}
                />
              ) : null}
            </Grid>
          </Grid>
        </Modal.Body>
      </Modal>
    </div>
  );
}
