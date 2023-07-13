import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserBanner from "../Api/Admin/UserBanner/UserBanner";
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Exportguid from "../Api/Admin/guid/Exportguid";
import { Editor } from "@tinymce/tinymce-react";
import { BaseUrlImage } from "../Api/BaseApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0CB4D0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function UserDeshboard() {
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [Data, setData] = useState();
  const [EditData, setEditData] = useState();
  const [EditDataView, setEditDataView] = useState();
  const [Productid, setProductid] = useState();
  const [Count, setCount] = useState();
  const [image, setimage] = useState();
  const [imageguide, setimageguide] = useState();
  const [NewformData, setNewformData] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const Navigate = useNavigate();
  const editorRef = useRef(null);
  const [loader, setloader] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      file: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your  title"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("title", values.title);
      formData.append("status", true);
      setNewformData(formData);
      setModalShow(true);
    },
  });
  const hendleSubmit = () => {
    if (UserData.access[0].accessibility.ClientsPortal.AddWelcome) {
      setloader(true);
      setTimeout(() => {
        UserBanner.CreateBanner(NewformData)
          .then((resp) => {
            if (resp.data.message == "welcomebanner submit successfully") {
              setModalShow(false);
              setloader(false);
              toast.success("Welcome banner submit successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              setloader(false);
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
          .catch((err) => {
            setloader(false);
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
      }, 1000);
    } else {
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
    }
  };
  const GetData = () => {
    UserBanner.getAllGuide()
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setData(resp.data.data);
            console.log(resp.data.data);
            setloader(false);
          } else {
            setloader(false);
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
  useEffect(() => {
    if (UserData.access[0].accessibility.ClientsPortal.visibility == "No") {
      Navigate("/Profile/Admin");
    }
    setloader(true);
    GetData();
  }, []);
  const GuideAdd = (id, i) => {
    setProductid(id);
    setCount(i);
    setTimeout(() => {
      setModalShow1(true);
    });
  };
  const formik1 = useFormik({
    initialValues: {
      title: "",
      product_id: Productid,
      file: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your  title"),
    }),
    onSubmit: (values) => {
      if (UserData.access[0].accessibility.ClientsPortal.AddGuides) {
        setModalShow1(false);
        setloader(true);
        const formData = new FormData();
        if (editorRef.current) {
          setloader(true);
          values.description = editorRef.current.getContent();
          formData.append("file", imageguide);
          formData.append("product_id", Productid);
          formData.append("title", values.title);
          formData.append("description", values.description);
        }
        setTimeout(() => {
          Exportguid.CreateGuid(formData)
            .then((resp) => {
              if (
                resp.data.message ==
                " Create RegistrationGuide details successfully"
              ) {
                setModalShow1(false);
                setloader(false);
                GetData();
                toast.success("Create RegistrationGuide details successfully", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                // Navigate("/Productlist/moduleList");
              } else {
                setloader(false);
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
        }, 1000);
      } else {
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
      }
    },
  });
  const formik2 = useFormik({
    initialValues: {
      title: EditData?.title ? EditData?.title : "",
      id: EditData?.id,
      file: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your  title"),
    }),
    onSubmit: (values) => {
      if (UserData.access[0].accessibility.ClientsPortal.EditGuides) {
        setModalShow1(false);
        setloader(true);
        const formData = new FormData();
        // if (editorRef.current) {
        setloader(true);
        values.description = editorRef.current.getContent();
        formData.append("file", imageguide);
        formData.append("id", values.id);
        formData.append("title", values.title);
        formData.append("description", values.description);
        // }
        setTimeout(() => {
          Exportguid.GuidUpdate(formData)
            .then((resp) => {
              if (resp.data.message == " Update RegistrationGuide details ") {
                setCount();
                setModalShow1(false);
                setloader(false);
                GetData();
                toast.success(" Update RegistrationGuide details ", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                // Navigate("/Productlist/moduleList");
              } else {
                setloader(false);
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
        }, 1000);
      } else {
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
      }
    },
  });
  const heandleEdit = (data) => {
    setCount(2);
    setEditData(data);
    setModalShow1(true);
  };
  const heandleView = (obj, data) => {
    // setCount(2)
    setEditData(obj);
    setEditDataView(data);
    setModalShow2(true);
  };
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
        Clients Portal
      </Typography>
      {loader ? (
        <div style={{ marginTop: "22%" }}>
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
          <Typography fontSize={{ xs: "15px", lg: "20px" }}>
            Clients Deshboard
          </Typography>
          <Grid
            className="banner-section-cus"
            container
            spacing={2}
            ml={6}
            mt={2}
          >
            {/* <Grid xl={3}></Grid> */}
            <Typography fontSize={{ xs: "15px", lg: "20px" }}>
              Welcome Video File
            </Typography>
            <Grid xs={12}>
              {formik.values?.file?.size}
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label=" Video Title"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    autoComplete="current-number"
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div style={{ color: "red" }}>{formik.errors.title}</div>
                  ) : null}
                </Box>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label=" Video"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    name="file"
                    onChange={(event) => {
                      formik.values.file = event.target.files[0];
                      setimage(event.target.files[0]);
                    }}
                    onBlur={formik.handleBlur}
                    autoComplete="current-number"
                  />
                  {formik.touched.file && formik.errors.file ? (
                    <div style={{ color: "red" }}>{formik.errors.file}</div>
                  ) : null}
                </Box>

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
            </Grid>
            {/* <Grid xl={3}></Grid>
        <Grid xl={3}></Grid> */}
            <Grid mt={9} xs={12} xl={6}>
              {image ? (
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
                    url={URL.createObjectURL(image)}
                  />
                </div>
              ) : null}
            </Grid>

            {/* <Grid xl={3}></Grid> */}
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Are You Sure ?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Grid container spacing={4} mt={2}>
                  <Grid xl={1}> </Grid>
                  <Grid xl={5}>
                    {" "}
                    <Button
                      type="button"
                      sx={{ marginLeft: "10px" }}
                      className={"A1"}
                      variant="contained"
                      onClick={hendleSubmit}
                    >
                      Yes
                    </Button>
                  </Grid>
                  <Grid xl={6}>
                    <Button
                      type="button"
                      sx={{ marginLeft: "10px" }}
                      onClick={() => {
                        setModalShow(false);
                      }}
                    >
                      No
                    </Button>
                  </Grid>
                </Grid>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
            <Modal
              show={modalShow2}
              onHide={() => setModalShow2(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <Button
                    onClick={() => {
                      setEditDataView();
                      setModalShow2(false);
                      setTimeout(() => {
                        setModalShow1(true);
                      });
                    }}
                    type="button"
                    sx={{ marginLeft: "10px" }}
                    className={"A1"}
                    variant="contained"
                  >
                    {" "}
                    Edit
                  </Button>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ padding: "30px" }}>
                  <h2>{EditData?.title}</h2>
                  <h6>
                    <a
                      href={BaseUrlImage + EditData?.file_path}
                      target="_blank"
                    >
                      Video File Name{" "}
                      {"  " +
                        EditDataView?.product_name +
                        "   Registration Guides " +
                        " " +
                        EditData?.title}
                    </a>
                  </h6>
                  <div
                    style={{ marginBlock: "20px" }}
                    dangerouslySetInnerHTML={{ __html: EditData?.description }}
                  ></div>
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </Grid>
          <div
            style={{
              borderBottom: "1px solid #bbb5b5",
              margin: "10px",
              width: "100%",
            }}
          ></div>
          {Data?.map((val, i) => {
            return (
              <div style={{ margin: "10px", width: "100%" }}>
                <h3>{val.product_name}</h3>
                <div>
                  <h5>Registration Guides</h5>
                </div>
                <div>
                  <TableContainer component={Paper} sx={{ mb: 2 }}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          {/* <StyledTableCell>#</StyledTableCell> */}
                          <StyledTableCell>Oder</StyledTableCell>
                          <StyledTableCell>Chapter Title</StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell>VIEW / EDIT</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {val?.guids?.map((item, i) => (
                          <TableRow>
                            {/* <StyledTableCell>{i + 1}</StyledTableCell> */}
                            <StyledTableCell>
                              <Box component="h3">....</Box>
                            </StyledTableCell>
                            <StyledTableCell> {item.title}</StyledTableCell>
                            <StyledTableCell>{"  "}</StyledTableCell>
                            <StyledTableCell>{"  "}</StyledTableCell>
                            <StyledTableCell>{"  "}</StyledTableCell>

                            {/* <StyledTableCell>{val.id==1?"No Action":<>  <EditIcon onClick={() => {hendleEditUser(val);}} sx={{ color: "#0CB4D0" }} /> &nbsp; <DeleteIcon onClick={()=>hendleUserDelete(val.id)} sx={{ color: "red" }} />{" "}</>}</StyledTableCell> */}
                            <StyledTableCell>
                              {UserData.access[0].accessibility.ClientsPortal
                                .EditGuides == false ? (
                                <Grid
                                  sx={{
                                    color: "#0CB4D0",
                                    cursor: "pointer",
                                    display: "flex",
                                  }}
                                  onClick={()=>{  toast.error("You are not accessible", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                  });}}
                                >
                                  <span style={{ marginRight: "5px" }}>
                                    View
                                  </span>{" "}
                                  /
                                  <span
                                    style={{
                                      marginRight: "5px",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    Edit
                                  </span>
                                  {/* / <p style={{ marginLeft: "5px" }}>Delete</p> */}
                                </Grid>
                              ) : (
                                <Grid
                                  sx={{
                                    color: "#0CB4D0",
                                    cursor: "pointer",
                                    display: "flex",
                                  }}
                                >
                                  <span
                                    onClick={() => {
                                      heandleView(item, val);
                                    }}
                                    style={{ marginRight: "5px" }}
                                  >
                                    View
                                  </span>
                                  /
                                  <span
                                    style={{
                                      marginRight: "5px",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() => {
                                      heandleEdit(item);
                                    }}
                                  >
                                    Edit
                                  </span>
                                </Grid>
                              )}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      {UserData.access[0].accessibility.ClientsPortal
                        .AddGuides ? (
                        <div style={{ marginBlock: "20px" }}>
                          <Button
                            onClick={() => {
                              GuideAdd(val.id, 1);
                            }}
                            variant="contained"
                            sx={{ backgroundColor: "#0CB4D0" }}
                            startIcon={<AddIcon sx={{ marginTop: "-8px" }} />}
                          >
                            {" "}
                            ADD A Chapter
                          </Button>
                        </div>
                      ) : (
                        <div style={{ marginBlock: "20px" }}>
                          <Button
                            disabled
                            // onClick={() => {
                            //   GuideAdd(val.id, 1);
                            // }}
                            variant="contained"
                            sx={{ backgroundColor: "#0CB4D0" }}
                            startIcon={<AddIcon sx={{ marginTop: "-8px" }} />}
                          >
                            {" "}
                            ADD A Chapter
                          </Button>
                        </div>
                      )}
                      {/* <div style={{ marginBlock: "20px" }}>
                        <Button
                          onClick={() => {
                            GuideAdd(val.id, 1);
                          }}
                          variant="contained"
                          sx={{ backgroundColor: "#0CB4D0" }}
                          startIcon={<AddIcon sx={{ marginTop: "-8px" }} />}
                        >
                          {" "}
                          ADD A Chapter
                        </Button>
                      </div> */}
                    </Table>
                  </TableContainer>
                </div>
              </div>
            );
          })}
          <div></div>
        </>
      )}
      <Modal
        show={modalShow1}
        onHide={() => {
          setModalShow1(false);
          setCount();
        }}
        size="xl"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {Count == 1 ? "ADD Guide" : "Edit Guide"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Count == 1 ? (
            <>
              <Box
                component="form"
                onSubmit={formik1.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container>
                  <Grid item xs={12} md={2} lg={3} mb={2}>
                    <div style={{ display: "flex" }}></div>
                  </Grid>
                  <Grid item xs={12} md={8} lg={6}>
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        label=" Video Title"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        name="title"
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        value={formik1.values.title}
                        autoComplete="current-number"
                      />
                      {formik1.touched.title && formik1.errors.title ? (
                        <div style={{ color: "red" }}>
                          {formik1.errors.title}
                        </div>
                      ) : null}
                    </Box>
                    <Grid container>
                      <Grid item xs={8} md={2} lg={9.9} mb={2}>
                        <Box mt={3}>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            label=" Video"
                            type="file"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                            name="file"
                            onChange={(event) => {
                              formik1.values.file = event.target.files[0];
                              setimageguide(event.target.files[0]);
                            }}
                            onBlur={formik1.handleBlur}
                            //   value={formik1.values.file}
                            autoComplete="current-number"
                          />
                          {formik1.touched.file && formik1.errors.file ? (
                            <div style={{ color: "red" }}>
                              {formik1.errors.file}
                            </div>
                          ) : null}
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={2} lg={2.1} mb={2} mt={2}>
                        <Box mt={3}>
                          <Button
                            type="submit"
                            className={"A1"}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                            variant="contained"
                          >
                            Submit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={""}
                apiKey="6mi71tv2o1dqve07iwnepbvp4zvjdvjl6grvrsjc0lp6kg5u"
                init={{
                  plugins: "preview",
                  menubar: "view",
                  height: 500,
                  menubar: true,
                  plugins:
                    "  advlist  anchor  autolink autoresize autosave  charmap  code codesample directionality  emoticons   fullscreen help image importcss  insertdatetime link  lists media    nonbreaking pagebreak preview quickbars save searchreplace table  Advanced Template tinydrive   visualblocks visualchars preview wordcount ext/dragAndDrop",
                  toolbar1:
                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | wordcount | preview",
                  toolbar2:
                    "table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </>
          ) : (
            <>
              <Box
                component="form"
                onSubmit={formik2.handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container>
                  <Grid item xs={12} md={2} lg={3} mb={2}>
                    <div style={{ display: "flex" }}>
                      <ReactPlayer
                        width={"100%"}
                        height="100%"
                        playing={true}
                        muted={true}
                        controls={true}
                        url={BaseUrlImage + EditData?.file_path}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={8} lg={6} pl={5}>
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        label=" Video Title"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        name="title"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.title}
                        autoComplete="current-number"
                      />
                      {formik2.touched.title && formik2.errors.title ? (
                        <div style={{ color: "red" }}>
                          {formik2.errors.title}
                        </div>
                      ) : null}
                    </Box>
                    <Grid container>
                      <Grid item xs={8} md={2} lg={9.9} mb={2}>
                        <Box mt={3}>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            label=" Video"
                            type="file"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                            name="file"
                            onChange={(event) => {
                              formik2.values.file = event.target.files[0];
                              setimageguide(event.target.files[0]);
                            }}
                            onBlur={formik2.handleBlur}
                            //   value={formik2.values.file}
                            autoComplete="current-number"
                          />
                          {formik2.touched.file && formik2.errors.file ? (
                            <div style={{ color: "red" }}>
                              {formik2.errors.file}
                            </div>
                          ) : null}
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={2} lg={2.1} mb={2} mt={2}>
                        <Box mt={3}>
                          <Button
                            type="submit"
                            className={"A1"}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                            variant="contained"
                          >
                            Submit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={EditData?.description}
                apiKey="6mi71tv2o1dqve07iwnepbvp4zvjdvjl6grvrsjc0lp6kg5u"
                init={{
                  plugins: "preview",
                  menubar: "view",
                  height: 500,
                  menubar: true,
                  plugins:
                    "  advlist  anchor  autolink autoresize autosave  charmap  code codesample directionality  emoticons   fullscreen help image importcss  insertdatetime link  lists media    nonbreaking pagebreak preview quickbars save searchreplace table  Advanced Template tinydrive   visualblocks visualchars preview wordcount ext/dragAndDrop",
                  toolbar1:
                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | wordcount | preview",
                  toolbar2:
                    "table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
