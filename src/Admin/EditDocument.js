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
          console.log(resp.data.data[0])
       
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
  },
  enableReinitialize: true,
  validationSchema: Yup.object({
    document_title: Yup.string().required("Enter your Document title"),
    description: Yup.string().required("Enter your Document Description"),
  }),
  onSubmit: (values) => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      values.html=editorRef.current.getContent()
    }
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
useEffect(() => {
  setTimeout(() => {
    setCount(Count+15)
  }, 1500);
  }, [])
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
        <Grid container spacing={1} mt={2} >
          <Grid ml={5}  xs={4}>
          <Grid container  mt={2} >
          <Grid  xs={2}>
          <DragDropButton title={"{{ Name }}"}  label={"Name "}editor={editorRef.current} />
            </Grid>
          <Grid  xs={5}>
          <DragDropButton title={"{{Product Name }}"}  label={"Product Name "}editor={editorRef.current} />
            </Grid>
          <Grid  xs={4}>
          <DragDropButton title={"{{Address}}"}  label={"Address"}editor={editorRef.current} />
            </Grid>
          <Grid mt={2} xs={2}>
          <DragDropButton title={"{{Logo}}"}  label={"Logo"}editor={editorRef.current} />
            </Grid>
          <Grid  mt={2} xs={4}>
          <DragDropButton title={"NDS 5"}  label={"Image"}editor={editorRef.current} />
            </Grid>
          <Grid mt={2} xs={5}>
          <DragDropButton title={"{{Modules Name}}"}  label={"Modules Name"}editor={editorRef.current} />
          {/* <DragDropButton  title={"NDS 6"} lable={"NDS "} editor={editorRef.current} /> */}
            </Grid>
            <Grid mt={2} xs={2}>
          <DragDropButton title={"{{ Mobile }}"}  label={"Mobile "}editor={editorRef.current} />
            </Grid>
            <Grid mt={2} xs={2}>
          <DragDropButton title={"{{ email }}"}  label={"Email "}editor={editorRef.current} />
            </Grid>
            </Grid>
            </Grid>
          <Grid  xs={7}>
        <Editor
          ref={editorRef}
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={Data[0]?.html_data}
         apiKey='6mi71tv2o1dqve07iwnepbvp4zvjdvjl6grvrsjc0lp6kg5u'
         init={{
          plugins: 'preview',
          menubar: 'view',
           height: 500,
           menubar: true,
           plugins: "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars preview wordcount ext/dragAndDrop",
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
  )
}
