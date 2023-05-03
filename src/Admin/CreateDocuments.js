import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import EmailEditor from "react-email-editor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ExportDocument from "../Api/Admin/Document/ExportDocument";
export default function CreateDocuments() {
  const Navigate = useNavigate();
  const emailEditorRef = useRef(null);
  const [Document, setDocument] = useState();
  const [module, setmodule] = useState(JSON.parse(localStorage.getItem("module")));

  const exportHtml = async () => {
  
  };

  const onLoad = () => {
    const editor = emailEditorRef.current.editor;
    console.log({ editor });

    // if (!editor) return;
    // editor.addEventListener('onLoad', () => {
    //   alert()
    //   const canvas = editor.getHtml();
    //   const body = canvas.querySelector('body');
    //   body.style.width = '900px';
    // });
    // const canvas = editor.getHtml();
    // const body = canvas.querySelector('body');
    // body.style.width = '600px';

    // emailEditorRef.current.editor.setBodyStyle({ width: '900px' });
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      id: module.module_id,
      html: "",
      jsondata: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your Document title"),
      description: Yup.string().required("Enter your Document Description"),
    }),
    onSubmit: (values) => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        // localStorage.setItem("html",html)
        // setDocument(html)
        values.html=html
        values.jsondata=design
      });
      console.log({values})
      setTimeout(() => {
        ExportDocument.CreateDocument(values)
          .then((resp) => {
            console.log(resp);
            if (resp.data.message=="create document successfully") {
            toast.success("Document Created successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            Navigate("/Admin/AllDocumentAdmin");
            }else{
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
    },
  });
  return (
    <div>
      <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Create Documents
        </Typography>
        <hr height={3} />
        <div style={{ display: "flex" }}></div>
        <div>{/* <button onClick={exportHtml}>Export HTML</button> */}</div>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ArrowBackIcon
              onClick={() => Navigate("/Admin/AllDocumentAdmin")}
              style={{ color: "#0cb4d0", fontSize: "50px" }}
            />
          </Grid>
          <Grid item xs={6}>

            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="Documents Title"
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
                label="Description "
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                autoComplete="current-number"
            />
            {formik.touched.description && formik.errors.description ? (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
            ) : null}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Button
            type="submit"
              sx={{ marginLeft: "45%", marginBottom: "50px" }}
              className={"A1"}
              variant="contained"
            >
              {" "}
              Create Document
            </Button>
          </Grid>
        </Grid>
        </Box>
        <br />
        <br />
        {/* <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} /> */}
        <EmailEditor onLoad={onLoad} ref={emailEditorRef} onReady={onReady} />
      </div>
      {/* <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div dangerouslySetInnerHTML={ { __html: Document}}>

      </div> */}
    </div>
  );
}
