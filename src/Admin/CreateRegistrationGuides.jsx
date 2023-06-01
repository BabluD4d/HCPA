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
export default function CreateRegistrationGuides() {
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );
  const [image, setimage] = useState()
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      product_id: Product.products_id,
      file: "",
      videolink:""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your V title"),
      // file: Yup.mixed()
      //   .required("Required")
        // .test("is-valid-type", "Not a valid image type",
        //   value => isValidFileType(value && value.name.toLowerCase(), "image"))
        // .test(
        //   "is-valid-size",
        //   "Max allowed size is 100KB",
        //   (value) => value && value.size <= MAX_FILE_SIZE
        // ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('product_id', values.product_id);
      formData.append('title', values.title);
      formData.append('videolink', values.videolink);
      setTimeout(() => {
        Exportguid.CreateGuid(formData)
          .then((resp) => {
            if (resp.data.message == " Create RegistrationGuide details successfully") {
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
              Navigate("/Productlist/moduleList");
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
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Create Checklist
      </Typography>
      <hr height={3} />
      <div style={{ display: "flex" }}>
        <ArrowBackIcon
          onClick={() => Navigate("/Productlist/moduleList")}
          style={{ color: "#0cb4d0", fontSize: "50px" }}
        />
      </div>
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
            <Typography mt={4} ml={"50%"} sx={{ fontSize: "30px" }}>
                    Or
              </Typography>
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
      </Grid>
    </div>
  );
}
