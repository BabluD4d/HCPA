import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import EmailEditor from 'react-email-editor';
import ExportDocument from "../Api/Admin/Document/ExportDocument";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function EditDocument() {
    const Navigate=useNavigate()
    const emailEditorRef = useRef(null);
    const [Data, setData] = useState([])
  const id=localStorage.getItem("document_id")
    const exportHtml = async () => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;  
        console.log({html})
        console.log(design)
      })
    };
  
  //  const onLoad = () => {

  //    const templateJson = JSON.parse(Data[0].json_data)
  //    console.log(templateJson)
  //    emailEditorRef.current.editor.loadDesign(templateJson);
  //  }
  
   const onReady = () => {
     // editor is ready
  
     console.log('onReady');
   };
  
const GetData = () => {
  let obj={
    id:id
  }
  ExportDocument.documentGetEditData(obj).then(
    (resp) => {
      if (resp.ok) {
        if (resp.data) {
          console.log(resp.data.data[0].document_title)
          emailEditorRef.current.editor.loadDesign(
            resp.data.data[0].json_data
              ? JSON.parse(resp.data.data[0].json_data)
              : emailEditorRef.current.editor.loadDesign()
          );
          setData(resp.data.data);
        }
      }
    }
  );
}
useEffect(() => {
  GetData()
}, [])
const formik = useFormik({
  initialValues: {
    document_title: Data[0]?.document_title?Data[0]?.document_title:"",
    description: Data[0]?.description?Data[0]?.description:"",
    id: id,
    html: "",
    jsondata: "",
  },
  enableReinitialize: true,
  validationSchema: Yup.object({
    document_title: Yup.string().required("Enter your Document title"),
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
      ExportDocument.documentUpdate(values)
        .then((resp) => {
          console.log(resp);
          if (resp.data.message=="Update document successfully") {
          toast.success("Document updated successfully", {
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
        {/* {console.log(object)} */}
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Edit Document
        </Typography>
        <hr height={3} />
        <div style={{display:"flex"}}>
      </div>
        <div>
        {/* <button onClick={exportHtml}>Export HTML</button> */}
      </div>
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
                name="document_title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.document_title}
                autoComplete="current-number"
            />
            {formik.touched.document_title && formik.errors.document_title ? (
                <div style={{ color: "red" }}>{formik.errors.document_title}</div>
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
              Update Document
            </Button>
          </Grid>
        </Grid>
        </Box>
    <br/>
    <br/>
      {/* <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} /> */}
      <EmailEditor  ref={emailEditorRef}  onReady={onReady} />
      </div>
    </div>
  )
}
