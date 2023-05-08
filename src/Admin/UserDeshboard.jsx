import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExportChecklist from "../Api/Admin/CheckList/ExportChecklist";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Exportguid from "../Api/Admin/guid/Exportguid";
import UserBanner from "../Api/Admin/UserBanner/UserBanner";
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";

export default function UserDeshboard() {
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );
  const [image, setimage] = useState();
  const [NewformData, setNewformData] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      file: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your V title"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("title", values.title);
      formData.append("status", true);
      setNewformData(formData)
      setModalShow(true)
    
    },
  });
const hendleSubmit =()=>{
    setTimeout(() => {
        UserBanner.CreateBanner(NewformData)
          .then((resp) => {
            console.log(resp);
            if (resp.data.message == "welcomebanner submit successfully") {
                setModalShow(false)
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
              toast.error("Something went rong", {
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
            toast.error("Something went rong", {
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
}
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Create Banner User
      </Typography>
      <hr height={3} />
      {/* <div style={{ display: "flex" }}>
            <ArrowBackIcon
              onClick={() => Navigate("/Productlist/moduleList")}
              style={{ color: "#0cb4d0", fontSize: "50px" }}
            />
          </div> */}
      <Grid container spacing={4} mt={2}>
        <Grid xl={3}></Grid>
        <Grid xl={6}>
          {formik.values?.file?.size}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
                //   value={formik.values.file}
                autoComplete="current-number"
              />
              {console.log({ image })}
              {formik.touched.file && formik.errors.file ? (
                <div style={{ color: "red" }}>{formik.errors.file}</div>
              ) : null}
            </Box>

            <Box mt={3}>
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
        </Grid>
        <Grid xl={3}></Grid>
        <Grid xl={3}></Grid>
        <Grid mt={9} xl={6}>
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
        <Grid xl={3}></Grid>
      </Grid>
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
            <Grid xl={5}>  <Button
                type="button"
                sx={{ marginLeft: "10px" }}
                className={"A1"}
                variant="contained"
                onClick={hendleSubmit}
              >
                Yes
              </Button></Grid>
            <Grid xl={6}>
              <Button
                type="button"
                sx={{ marginLeft: "10px" }}
                onClick={()=>{setModalShow(false)}}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
