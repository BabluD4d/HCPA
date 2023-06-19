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
import { Editor } from '@tinymce/tinymce-react';
const DragDropButton = (props) => {
  const { editor } = props;

  const handleDragStart = (e) => {
    if (editor) {
    // const selectedText = editor.selection.getContent();
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
export default function EditDocument() {
    const Navigate=useNavigate()
    const emailEditorRef = useRef(null);
    const [Data, setData] = useState([])
  const id=localStorage.getItem("document_id")
  const editorRef = useRef(null);
  const [Count, setCount] = useState(1);
 
  
const GetData = () => {
  let obj={
    id:id
  }
  ExportDocument.documentGetEditData(obj).then(
    (resp) => {
      if (resp.ok) {
        if (resp.data) {       
          setData(resp.data.result);
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
    document_title: Data?.document_title?Data?.document_title:"",
    description: Data?.description?Data?.description:"",
    id: id,
    html: "",
  },
  enableReinitialize: true,
  validationSchema: Yup.object({
    document_title: Yup.string().required("Enter your Document title"),
    description: Yup.string().required("Enter your Document Description"),
  }),
  onSubmit: (values) => {
    if (editorRef.current) {
      values.html=editorRef.current.getContent()
    }
    setTimeout(() => {
      ExportDocument.documentUpdate(values)
        .then((resp) => {
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
  }, 3000);
  }, [])
  return (
    <div>
      <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Edit Document
        </Typography>
        <hr height={3} />
        <div style={{display:"flex"}}>
      </div>
        <div>
      </div>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <Grid  container spacing={2}>
          <Grid item xs={4}>
            <ArrowBackIcon className="back-icon-proact"
              onClick={() => Navigate("/Admin/AllDocumentAdmin")}
              // style={{ color: "#0cb4d0", fontSize: "50px" }}
            />
          </Grid>
          <Grid className="vie-doc-btn edit-btn-right"  item xs={8}>
            <Button
            type="submit"
              // sx={{ marginLeft: "45%", marginBottom: "50px" }}
              className={"A1"}
              variant="contained"
            >
              {" "}
              Update Document
            </Button>
          </Grid>
          <Grid  className="mar-auto" item xs={11} sm={8} md={6}>

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
          
        </Grid>
        </Box>
        <Grid  container spacing={1} mt={8} >
          <Grid container className="inner-edit-doc-sec">
          <Grid   xl={3} lg={3} md={3} sm={4} xs={12}>
          <Grid className="edit-btn-side" container  >
          <Grid  className ="cus-btn-edit" xl={12} lg={12} md={12} sm={12} xs={4}>
          <DragDropButton title={"{{name}}"}  label={"Name "}editor={editorRef?.current} />
          </Grid>
          <Grid className ="cus-btn-edit" mt={2}  xl={12} lg={12} md={12} sm={12} xs={4}>
          <DragDropButton title={"{{email}}"}  label={"Email"}editor={editorRef?.current} />
            </Grid>
          <Grid  className ="cus-btn-edit mar-add-btn" mt={2} xl={12} lg={12} md={12} sm={12} xs={4}>
          <DragDropButton title={"{{address}}"}  label={"Address"} editor={editorRef?.current} />
            </Grid>
          <Grid className ="cus-btn-edit" mt={2} xl={12} lg={12} md={12} sm={12} xs={6}>
          <DragDropButton title={"{{mobile_number}}"}  label={"Mobile"}editor={editorRef?.current} />
            </Grid>
          <Grid className ="cus-btn-edit"  mt={2} xl={12} lg={12} md={12} sm={12} xs={6}>
          <DragDropButton title={"{{trading_name}}"}  label={"Trading Name "}editor={editorRef?.current} />
            </Grid>
          <Grid className ="cus-btn-edit" mt={2} xl={12} lg={12} md={12} sm={12} xs={12}>
          <DragDropButton title={"{{business_email}}"}  label={"Business Email "}editor={editorRef?.current} />
          {/* <DragDropButton  title={"NDS 6"} lable={"NDS "} editor={editorRef?.current} /> */}
            </Grid>
            <Grid className ="cus-btn-edit" mt={2} xl={12} lg={12} md={12} sm={12} xs={12}>
          <DragDropButton title={"{{business_phone_no}}"}  label={"Business Phone Number"}editor={editorRef?.current} />
            </Grid>
            </Grid>
            </Grid>
          <Grid className="editor-box"  xl={9} lg={9} md={9} sm={8} pl={8} xs={12} >
        <Editor
          ref={editorRef}
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={Data?.html_data}
         apiKey='6mi71tv2o1dqve07iwnepbvp4zvjdvjl6grvrsjc0lp6kg5u'
         init={{
          plugins: 'preview',
          menubar: 'view',
           height: 500,
           menubar: true,
           plugins: "  advlist  anchor  autolink autoresize autosave  charmap  code codesample directionality  emoticons fullscreen help image importcss  insertdatetime link  lists media  nonbreaking pagebreak preview quickbars save searchreplace table  template tinydrive   visualblocks visualchars preview wordcount ext/dragAndDrop",
           toolbar1: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | wordcount | preview',
           toolbar2: 'table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          //  events: {
          //   drop: handleDrop,
          // },
         }}
       />
       
       </Grid>
       {/* <Grid  xs={1}>
            </Grid> */}
       </Grid>
       </Grid>
      </div>
    </div>
  )
}
