import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Editor } from '@tinymce/tinymce-react';
import ExportDocument from "../Api/Admin/Document/ExportDocument";
 
const DragDropButton = (props) => {
  const { editor } = props;

  const handleDragStart = (e) => {
    if (editor) {
    const selectedText = editor.selection.getContent();
    console.log({selectedText})
    e.dataTransfer.setData('text/plain',props?.title );
    }
  };

  return (
    <Button
    variant="contained"
      draggable
      onDragStart={handleDragStart}
    >
     {props?.label}
    </Button>
  );
};
export default function CreateDocuments() {
  const editorRef = useRef(null);
  const Navigate = useNavigate();
  const [Document, setDocument] = useState();
  const [Count, setCount] = useState(1);
  const [module, setmodule] = useState(JSON.parse(localStorage.getItem("module")));


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
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
        values.html=editorRef.current.getContent()
      }
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
              toast.error('Something went wrong', {
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

  useEffect(() => {
  setTimeout(() => {
    setCount(Count+15)
  }, 1500);
  }, [])
  
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
        <Grid container spacing={4} mt={2} >
          <Grid ml={3}  xs={4}>
          <Grid container  mt={2} >
          <Grid  xs={2}>
          <DragDropButton title={"{{name}}"}  label={"Name "}editor={editorRef.current} />
            </Grid>
          <Grid  xs={5}>
          <DragDropButton title={"{{email}}"}  label={"Email"}editor={editorRef.current} />
            </Grid>
          <Grid  xs={4}>
          <DragDropButton title={"{{address}}"}  label={"Address"}editor={editorRef.current} />
            </Grid>
          <Grid mt={2} xs={2}>
          <DragDropButton title={"{{mobile_number}}"}  label={"Mobile"}editor={editorRef.current} />
            </Grid>
          <Grid  mt={2} xs={4}>
          <DragDropButton title={"{{trading_name}}"}  label={"Trading Name "}editor={editorRef.current} />
            </Grid>
          <Grid mt={2} xs={5}>
          <DragDropButton title={"{{business_email}}"}  label={"Business Email "}editor={editorRef.current} />
          {/* <DragDropButton  title={"NDS 6"} lable={"NDS "} editor={editorRef.current} /> */}
            </Grid>
            <Grid mt={2} xs={4}>
          <DragDropButton title={"{{business_phone_no}}"}  label={"Business Phone Number"}editor={editorRef.current} />
            </Grid>
            </Grid>
            </Grid>
          <Grid  xs={7}>
            
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={""}
         apiKey='6mi71tv2o1dqve07iwnepbvp4zvjdvjl6grvrsjc0lp6kg5u'
         init={{
          plugins: 'preview',
          menubar: 'view',
           height: 500,
           menubar: true,
           plugins: "  advlist  anchor  autolink autoresize autosave  charmap  code codesample directionality  emoticons   fullscreen help image importcss  insertdatetime link  lists media    nonbreaking pagebreak preview quickbars save searchreplace table  template tinydrive   visualblocks visualchars preview wordcount ext/dragAndDrop",
           toolbar1: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | wordcount | preview',
           toolbar2: 'table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          //  events: {
          //   drop: handleDrop,
          // },
         }}
       />
       </Grid>
       <Grid  xs={1}>
            </Grid>
       </Grid>
      </div>
    </div>
  );
}
