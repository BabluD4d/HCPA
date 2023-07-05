import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductionQuantityLimitsSharpIcon from "@mui/icons-material/ProductionQuantityLimitsSharp";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import ChecklistRtlSharpIcon from "@mui/icons-material/ChecklistRtlSharp";
import ViewModuleSharpIcon from "@mui/icons-material/ViewModuleSharp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import Modal from '@mui/material/Modal';
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import ModulesCardUnlook from "../../commenComponet/ModulesCardUnlook";
// import Moduleslook from "../../commenComponet/Moduleslook";
import ChecklistCard from "../../commenComponet/ChecklistCard";
import Futer from "../../commenComponet/Futer";
import { ColorRing } from "react-loader-spinner";
import ExportProduct from "../../Api/user/Product/ExportProduct";
// import ExportModules from "../../Api/user/Modules/ExportModules";
import { BaseUrlImage } from "../../Api/BaseApi";
import { toast } from "react-toastify";
import ExportModules from "../../Api/user/Modules/ExportModules";
import ModulesCardUnlook from "../../commenComponet/ModelusCardUnlook";
import Moduleslook from "../../commenComponet/Moduleslook";
const Modules = () => {
  const [first, setfirst] = useState(true);
  const [open, setOpen] = React.useState(false);
  const Navigate = useNavigate();
  const [loader, setloader] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("UserProduct"))
  );
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [DataNotFoundmodule, setDataNotFoundmodule] = useState();
  const [DataNotFoundCheckList, setDataNotFoundCheckList] = useState();
  const [ModuleData, setModuleData] = useState();
  const [RegistrationCurent, setRegistrationCurent] = useState();
  useEffect(() => {
    // setProduct(JSON.parse(localStorage.getItem("UserProduct")))
    setloader(true);
    setTimeout(() => {
      if (Product?.id) {
        localStorage.setItem("pp",Product?.id)
        ModulesList();
      } else {
        Navigate("/Home");
      }
    }, 100);
  }, [Product?.id]);
  window.addEventListener("activeProduct", () =>
    setTimeout(() => {
      setProduct(JSON.parse(localStorage.getItem("UserProduct")));
    })
  );
  const ModulesList = () => {
    let obj = {
      user_id: Data?.user_id,
      product_id: Product.id,
    };

    ExportModules.ModulesList(obj)
      .then((resp) => {
        if (resp.ok) {
          if (resp.data.data) {
            if (resp.data.data.module[0]) {
              setDataNotFoundmodule();
            } else {
              setDataNotFoundmodule("No record found");
            }
            if (resp.data.data.checklist_guid[0]) {
              setDataNotFoundCheckList();
            } else {
              setDataNotFoundCheckList("No record found");
            }
            setloader(false);
            setModuleData(resp.data.data);
            if (resp.data.data.registration_guid) {
              let video = resp.data.data.registration_guid.find(
                (val, i) => val.guid_status == 0
              );
              if(video){
                setRegistrationCurent(video);
              }else{
                setRegistrationCurent(resp.data.data.registration_guid[0]);
              }
            }
            //   setData(obj);
          } else {
            setDataNotFoundmodule("No record found");
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
  const ViewguidUpdateUser = (id) => {
    let obj = {
      user_id: Data?.user_id,
      product_id: Product.id,
      registrationguide_id: id,
      status: true,
    };

    ExportModules.guidUpdateUser(obj)
      .then((resp) => {
        if (resp.ok) {
          ModulesList();
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

  return (
    <>
      {Product ? (
        <div style={{ width: "100%" }}>
          <Typography fontSize={{xs:'20px', lg:'30px'}}>{Product.product_name}</Typography>
          <div style={{ display: "flex" }}>
            <Typography
              mt={1}
              sx={{ fontSize: "14px", color: "#0CB4D0" }}
            >Product</Typography>
            <Typography mt={1} sx={{ fontSize: "14px",marginLeft:"7px" }}> {" / "} {Product.product_name}</Typography>
          </div>
          <hr height={3} />
          {Product.purchase_status == 0 ? (
              <Box textAlign="center" sx={{height: {sm:'55vh'}, display:'flex', alignItems:'center', flexWrap:'wrap', flexDirection:'column', justifyContent:'center'}}>
                <Typography fontSize={{xs:'20px', lg:'24px'}}>Purchase the product to get started with youe {Product.product_name} application</Typography>
                <Button
                  onClick={() => Navigate("/BookCall/1")}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#0CB4D0",
                  }}
                  variant="contained"
                >
                  <ProductionQuantityLimitsSharpIcon /> Purchase Product
                </Button>
              </Box>
          ) : (
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
                      colors={[
                        "#0CB4D0",
                        "#0CB4D0",
                        "#0CB4D0",
                        "#0CB4D0",
                        "#0CB4D0",
                      ]}
                    />
                  </center>
                </div>
              ) : (
                <>
                  <div>
                    <Typography my={2} fontSize={{xs:'20px', lg:'24px'}}>Let's get you started with your {Product.product_name} application</Typography>

                    <Grid container spacing={{xs:1, lg:3}} mt={2}>

                      <Grid item md={4} xs={12} sm={6}>
                        <Box sx={{ color: "white", backgroundColor: "#0CB4D0", p:3, height:'100%', display:"flex", alignItems:'center',cursor:"pointer" }}   onClick={() => {
                              Navigate("/Modules/Guides");
                            }}>
                          <Grid container>
                            <Grid item xs={3} sx={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <ExitToAppSharpIcon sx={{ fontSize: "45px" }} />
                            </Grid>
                            <Grid item xs={9}>
                              <Typography sx={{ fontSize: "18px", lineHeight:{xs:1, md:1.5} }}>Step 1</Typography>
                              <Typography sx={{ fontSize: {xs:"18px", lg:'22px'}, lineHeight:{xs:1.2, lg:1.5} }}>Watch registration guides</Typography>
                              <Typography sx={{ fontSize: "14px" }}>Understand the process</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item md={4} xs={12} sm={6}>
                        <Box sx={{ color: "white", backgroundColor: "#097EAF", p:3, height:'100%', display:"flex", alignItems:'center',cursor:"pointer" }}onClick={() => Navigate("/all/CheckList")}>
                          <Grid container>
                          <Grid item xs={3} sx={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                              {/* <Typography mt={5} mb={5} ml={5}> */}
                                <ChecklistRtlSharpIcon sx={{ fontSize: "45px" }} />
                              {/* </Typography> */}
                            </Grid>
                            <Grid item xs={9}>
                              <Typography sx={{ fontSize: "18px" }}>Step 2</Typography>
                              <Typography sx={{ fontSize: {xs:"18px", lg:'22px'}, lineHeight:{xs:1.2, lg:1.5} }}>Complete checklists</Typography>
                              <Typography sx={{ fontSize: "14px" }}>Finish to guarantee your application</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item md={4} xs={12} sm={6}>
                        <Box sx={{ color: "white", backgroundColor: "#233B77;", p:3, height:'100%', display:"flex", alignItems:'center' ,cursor:"pointer" }}onClick={() => Navigate("/Modules/all")}>
                          <Grid container>
                            <Grid item xs={3} sx={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                                <ViewModuleSharpIcon sx={{ fontSize: "45px" }} />
                            </Grid>
                            <Grid item xs={9}>
                              <Typography sx={{ fontSize: "18px" }}>Step 3</Typography>
                              <Typography sx={{ fontSize: {xs:"18px", lg:'22px'}, lineHeight:{xs:1.2, lg:1.5} }}>Download Modules</Typography>
                              <Typography sx={{ fontSize: "14px" }}>Export documents</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={9} mt={5}>

                        <Grid sx={{display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', mb:{xs:3}}}>
                          <Typography variant="span" sx={{ fontSize: "20px", fontWeight: "bold" }}>Modules</Typography>
                          {
                            DataNotFoundmodule ? (
                              <Typography variant="span" fontSize={{xs:'16px'}} color="#FF0000">{DataNotFoundmodule}</Typography>
                            ) : (
                              <Typography variant="span" sx={{color: "#0CB4D0", fontSize: "14px", cursor: "pointer",}} onClick={() => Navigate("/Modules/all")}>View Modules</Typography>
                            )
                          }
                        </Grid>

                        <Grid container spacing={2}>
                          {ModuleData?.module.map((val, i) => {
                            return (
                              <>
                                {i < 6 ? (
                                  <>
                                    {val.purchase_status == 1 ? (
                                      <ModulesCardUnlook
                                        Module={val}
                                        available={6}
                                      />
                                    ) : (
                                      <Moduleslook
                                        Module={val}
                                        available={6}
                                        size={4}
                                      />
                                    )}
                                  </>
                                ) : null}
                              </>
                            );
                          })}
                        </Grid>
                        
                        <Box sx={{mt:5}} style={{ display: "flex", flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
                          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>Registration Guides</Typography>
                          <Typography
                            sx={{
                              color: "#0CB4D0",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              Navigate("/Modules/Guides");
                            }}
                          >View All Guides</Typography>
                        </Box>

                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                          <Grid mt={3} item xs="12" sm="auto">
                            <div style={{ display: "flex" }}>
                              <Typography
                              variant="span"
                                mt={2}
                                sx={{ fontSize:"13px", backgroundColor:"#e0e0e0", px:1, py:0.5, borderRadius:'2px'}}
                              >
                                Curent Chapter
                              </Typography>
                              <Typography
                                mt={3}
                                ml={1}
                                sx={{ fontSize: "13px" }}
                              >
                                1 of {ModuleData?.registration_guid?.length} guides Complete
                              </Typography>
                            </div>
                            <Typography
                              mt={2}
                              sx={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                              Chapter 1-{RegistrationCurent.title}
                            </Typography>
                          </Grid>
                          <Grid mt={{xs:0, md:3}} item xs={12} sm="auto">
                            <Typography
                              mt={{xs:0, md:2}}
                              sx={{
                                color: "#0CB4D0",
                                fontSize: "15px",
                                cursor: "pointer",
                              }}
                              onClick={handleOpen}
                            >
                              {/* <RemoveRedEyeIcon
                                sx={{
                                  color: "#0c8ce9;",
                                  fontSize: "20px",
                                  marginBottom: "5px",
                                }}
                              /> */}
                              View Guides
                            </Typography>
                          </Grid>
                        </Grid>

                      </Grid>

                      <Grid mt={3} item xs={12} lg={3}>
                        <Typography
                          mt={2}
                          px={{lg:2}}
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Checklist to Complete
                        </Typography>
                        {DataNotFoundmodule ? (
                          <Typography
                            fontSize={{xs:'16px'}}
                            color="#FF0000"
                            px={{lg:2}}
                          >
                            {DataNotFoundmodule}
                          </Typography>
                        ) : (
                          <>
                            <Grid container mt={4} px={{lg:2}}>
                              {ModuleData?.checklist_guid.map((val, i) => {
                                return (
                                  <>
                                    <ChecklistCard count={val} />
                                  </>
                                );
                              })}
                              {/* <ChecklistCard count={""} />
                                <ChecklistCard count={1} />
                                <ChecklistCard count={2} /> */}
                              {/* <ChecklistCard count={3}/> */}
                              {/* <ChecklistCard count={4}/> */}
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>

                    <Modal
                      show={open}
                      onHide={() => setOpen(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Body>
                        <div
                          className="playerDiv"
                          style={{ height: "300px", width: "779px" }}
                        >
                          <ReactPlayer
                            width={"100%"}
                            height="100%"
                            playing={true}
                            muted={true}
                            controls={true}
                            url={
                              RegistrationCurent?.file_path
                                ? BaseUrlImage + RegistrationCurent?.file_path
                                : RegistrationCurent?.video_link
                            }
                          />
                        </div>

                        <Grid container spacing={2} alignItems="center" sx={{pt:2}}>
                        <Grid item xs={12} sm={6} md={4}>
                          <div style={{ display: "flex" }}>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                backgroundColor: "#E0E0E0",
                              }}
                            >
                              Curent Chapter
                            </Typography>
                            <Typography ml={1} sx={{ fontSize: "13px" }}>
                  1 of {ModuleData?.registration_guid?.length} guides Complete
                </Typography>
                            </div>
                            <Typography
                mt={1}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Chapter 1-Geting Started
              </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ color: "gray", fontSize: "15px", textAlign:{xs:'left', sm:'right'} }}>previous Chapter</Typography>
            </Grid>
            <Grid item xs={12} sm={12}  md={4} sx={{textAlign:{xs:'left', sm:'right'}}}>
                            <Button
                              onClick={()=>{ViewguidUpdateUser(RegistrationCurent?.id)}}
                              variant="contained"
                              sx={{ backgroundColor: "#0CB4D0" }}
                            >
                              Mark Completed
                            </Button>
                          </Grid>
                        </Grid>
                      </Modal.Body>
                    </Modal>
                    <Futer />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Modules;
