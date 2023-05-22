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
import ModelusCardUnlook from "../../commenComponet/ModelusCardUnlook";
import Moduleslook from "../../commenComponet/Moduleslook";
import ChecklistCard from "../../commenComponet/ChecklistCard";
import Futer from "../../commenComponet/Futer";
import { ColorRing } from "react-loader-spinner";
import ExportProduct from "../../Api/user/Product/ExportProduct";
import ExportModules from "../../Api/user/Modules/ExportModules";
import { BaseUrlImage } from "../../Api/BaseApi";
import { toast } from "react-toastify";
const Modelus = () => {
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

            console.log("user123", resp.data.data);
            if (resp.data.data.registration_guid) {
              let video = resp.data.data.registration_guid.find(
                (val, i) => val.guid_status == 0
              );
              console.log({ video });
              setRegistrationCurent(video);
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

  return (
    <>
      {Product ? (
        <div style={{ width: "100%" }}>
          <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
            {Product.product_name}
          </Typography>
          <div style={{ display: "flex" }}>
            <Typography
              mt={1}
              ml={6}
              sx={{ fontSize: "14px", color: "#0CB4D0" }}
            >
              Product{" "}
            </Typography>
            <Typography mt={1} sx={{ fontSize: "14px" }}>
              {" "}
              / {Product.product_name}
            </Typography>
          </div>
          <hr height={3} />
          {Product.purchase_status == 0 ? (
            <div>
              <div>
                <h4
                  style={{
                    margin: "auto",
                    paddingTop: "270px",
                    textAlign: "center",
                  }}
                >
                  Purchase the product to get started with youe{" "}
                  {Product.product_name} application{" "}
                </h4>
                <Button
                  onClick={() => Navigate("/BookCall/1")}
                  sx={{
                    marginLeft: "45%",
                    marginTop: "20px",
                    backgroundColor: "#0CB4D0",
                  }}
                  variant="contained"
                >
                  <ProductionQuantityLimitsSharpIcon /> Purchase Product
                </Button>
              </div>
            </div>
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
                  <div style={{ paddingLeft: "10px" }}>
                    <Typography mt={2} sx={{ fontSize: "20px" }}>
                      Let's get you started width your {Product.product_name}{" "}
                      application
                    </Typography>
                    <Grid container mt={2}>
                      <Grid
                        item
                        md={5}
                        xl={3.5}
                        sm={12}
                        xs={12}
                        ml={0}
                        mt={3}
                        mb={3}
                        mr={3}
                      >
                        <Box
                          sx={{ color: "white", backgroundColor: "#0CB4D0" }}
                        >
                          <Grid container mt={2} spacing={1}>
                            <Grid item xs={2}>
                              <Typography mt={5} mb={5} ml={5}>
                                {" "}
                                <ExitToAppSharpIcon
                                  sx={{ fontSize: "45px" }}
                                />{" "}
                              </Typography>
                            </Grid>
                            <Grid ml={2} item xs={7}>
                              <Typography mt={3} sx={{ fontSize: "18px" }}>
                                Step 1
                              </Typography>
                              <Typography mt={0} sx={{ fontSize: "22px" }}>
                                Watch registration guides
                              </Typography>
                              <Typography mt={0} sx={{ fontSize: "13px" }}>
                                Understand the process
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item md={5} xl={3.5} sm={12} xs={12} m={3}>
                        <Box
                          sx={{ color: "white", backgroundColor: "#097EAF" }}
                        >
                          <Grid container mt={2} spacing={1}>
                            <Grid item xs={2}>
                              <Typography mt={5} mb={5} ml={5}>
                                {" "}
                                <ChecklistRtlSharpIcon
                                  sx={{ fontSize: "45px" }}
                                />{" "}
                              </Typography>
                            </Grid>
                            <Grid ml={2} item xs={7}>
                              <Typography mt={3} ml sx={{ fontSize: "18px" }}>
                                Step 2
                              </Typography>
                              <Typography mt={0} ml sx={{ fontSize: "22px" }}>
                                Complete form checklists
                              </Typography>
                              <Typography mt={0} ml sx={{ fontSize: "13px" }}>
                                Finish to guarantee your application
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item md={5} xl={3.5} sm={12} xs={12} m={3}>
                        <Box
                          sx={{ color: "white", backgroundColor: "#233B77;" }}
                        >
                          <Grid container mt={2} spacing={1}>
                            <Grid item xs={2}>
                              <Typography mt={5} mb={5} ml={5}>
                                {" "}
                                <ViewModuleSharpIcon
                                  sx={{ fontSize: "45px" }}
                                />{" "}
                              </Typography>
                            </Grid>
                            <Grid ml={2} item xs={7}>
                              <Typography mt={3} ml sx={{ fontSize: "18px" }}>
                                Step 3
                              </Typography>
                              <Typography mt={0} ml sx={{ fontSize: "22px" }}>
                                Use Modules
                              </Typography>
                              <Typography mt={0} ml sx={{ fontSize: "13px" }}>
                                Expport ready-made document
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid mt={3} md={8} lg={6} sm={12} xl={9} item xs={12}>
                              <Typography
                                mt={2}
                                //   ml={2}
                                sx={{ fontSize: "20px", fontWeight: "bold" }}
                              >
                                Modules
                              </Typography>
                        {DataNotFoundmodule ? (
                          <Typography
                            mt={"17%"}
                            ml={"20%"}
                            mb={"14%"}
                            sx={{ fontSize: "26px", fontWeight: "bold" }}
                          >
                            {DataNotFoundmodule}
                          </Typography>
                        ) : (
                          <>
                            <div style={{ display: "flex" }}>
                              <Typography
                                mt={3}
                                ml={1}
                                sx={{
                                  color: "#0CB4D0",
                                  fontSize: "14px",
                                  cursor: "pointer",
                                }}
                                onClick={() => Navigate("/Modelus/all")}
                              >
                                {" "}
                                View Modelus
                              </Typography>
                            </div>
                          </>
                        )}
                        <Grid container spacing={2}>
                          {ModuleData?.module.map((val, i) => {
                            return (
                              <>
                                {i < 6 ? (
                                  <>
                                    {" "}
                                    {val.purchase_status == 1 ? (
                                      <ModelusCardUnlook
                                        size={4}
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
                        <div style={{ display: "flex", marginTop: "20px" }}>
                          <Typography
                            mt={2}
                            sx={{ fontSize: "20px", fontWeight: "bold" }}
                          >
                            Registration Guides
                          </Typography>
                          <Typography
                            mt={3}
                            ml={1}
                            sx={{
                              color: "#0CB4D0",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              Navigate("/Modelus/Guides");
                            }}
                          >
                            {" "}
                            View All Guides
                          </Typography>
                        </div>
                        <Grid container spacing={2} mb={9}>
                          <Grid mt={3} item xs={10}>
                            <div style={{ display: "flex" }}>
                              <Typography
                                mt={2}
                                ml={6}
                                sx={{
                                  fontSize: "13px",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                Curent Chapter
                              </Typography>
                              <Typography
                                mt={2}
                                ml={1}
                                sx={{ fontSize: "13px" }}
                              >
                                1 of 14 guides comp
                              </Typography>
                            </div>
                            <Typography
                              mt={2}
                              ml={6}
                              sx={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                              Chapter 1-Geting Started
                            </Typography>
                          </Grid>
                          <Grid mt={3} item xs={2}>
                            <Typography
                              mt={2}
                              ml={2}
                              sx={{
                                color: "#0CB4D0",
                                fontSize: "15px",
                                cursor: "pointer",
                              }}
                              onClick={handleOpen}
                            >
                              {" "}
                              <RemoveRedEyeIcon
                                sx={{
                                  color: "#0c8ce9;",
                                  fontSize: "20px",
                                  marginBottom: "5px",
                                }}
                              />{" "}
                              View Modelus
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid mt={3} item sm={12} xl={3} lg={6} md={4} xs={12}>
                            <Typography
                              mt={2}
                              ml={2}
                              sx={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                              Checklist to Complete
                            </Typography>
                        {DataNotFoundmodule ? (
                          <Typography
                            mt={"17%"}
                            ml={"15%"}
                            sx={{ fontSize: "26px", fontWeight: "bold" }}
                          >
                            {DataNotFoundmodule}
                          </Typography>
                        ) : (
                          <>
                            <Box mt={4} ml={2}>
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
                            </Box>
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

                        <Grid container spacing={2} mb={1}>
                          <Grid mt={3} item xs={6}>
                            <div style={{ display: "flex" }}>
                              <Typography
                                mt={2}
                                ml={6}
                                sx={{
                                  fontSize: "13px",
                                  backgroundColor: "#E0E0E0",
                                }}
                              >
                                Curent Chapter
                              </Typography>
                              <Typography
                                mt={2}
                                ml={1}
                                sx={{ fontSize: "13px" }}
                              >
                                1 of 14 guides comp
                              </Typography>
                            </div>
                            <Typography
                              mt={1}
                              ml={6}
                              sx={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                              Chapter 1-Geting Started
                            </Typography>
                          </Grid>
                          <Grid mt={3} item xs={3}>
                            <Typography
                              mt={4}
                              ml={2}
                              sx={{ color: "gray", fontSize: "15px" }}
                            >
                              {" "}
                              previous Chapter
                            </Typography>
                          </Grid>
                          <Grid mt={5} item xs={3}>
                            <Button
                              onClick={handleClose}
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

export default Modelus;
