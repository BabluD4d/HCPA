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
const MAX_FILE_SIZE = 102400*100;
export default function EditRegistrationGuides(props) {
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );
  const [image, setimage] = useState()
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: props.EditDataGuid.title?props.EditDataGuid.title: "",
      product_id: Product.products_id,
      file: "",
      videolink:props.EditDataGuid.video_link?props.EditDataGuid.video_link: "",
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your  title"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('file', image);
      // formData.append('product_id', values.product_id);
      formData.append('id', props.EditDataGuid.id);
      formData.append('title', values.title);
      formData.append('video_link', values.videolink);
      setTimeout(() => {
        Exportguid.GuidUpdate(formData)
          .then((resp) => {
            if (resp.data.message == " Update RegistrationGuide details ") {
              props.hendleGuidUpdateData()
              toast.success("Update RegistrationGuide details successfully", {
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
    },
  });
  return (
<>
          {formik.values?.file?.size}
          <Box component="form" onSubmit={formik.handleSubmit}>

            <Box>
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
                  setimage(event.target.files[0])
                }}
                onBlur={formik.handleBlur}
                //   value={formik.values.file}
                autoComplete="current-number"
              />
              {formik.touched.file && formik.errors.file ? (
                <div style={{ color: "red" }}>{formik.errors.file}</div>
              ) : null}
            </Box>

            <Typography mt={4} sx={{ fontSize: "30px", textAlign:'center' }}>Or</Typography>

            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label=" Video Link"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="videolink"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 value={formik.values.videolink}
                autoComplete="current-number"
              />
              {formik.touched.videolink && formik.errors.videolink ? (
                <div style={{ color: "red" }}>{formik.errors.videolink}</div>
              ) : null}
            </Box>

            <Box mt={3}>
              <Button
              sx={{width:{xs:'100%', sm:'auto'}}}
                type="submit"
                className={"A1"}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
            
          </Box>
          </>
  );
}
