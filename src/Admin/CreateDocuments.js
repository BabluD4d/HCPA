import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import EmailEditor from 'react-email-editor';
export default function CreateDocuments() {
  const Navigate=useNavigate()
  const emailEditorRef = useRef(null);
  const [Document, setDocument] = useState()

  const exportHtml = async () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data; 
      localStorage.setItem("html",html)
      setDocument(html) 
    })
  };

 const onLoad = () => {
  const editor = emailEditorRef.current.editor;
  console.log({editor})

  if (!editor) return;
  editor.addEventListener('onLoad', () => {
    alert()
    const canvas = editor.getHtml();
    const body = canvas.querySelector('body');
    body.style.width = '900px';
  });
  // const canvas = editor.getHtml();
  // const body = canvas.querySelector('body');
  // body.style.width = '600px';

  // emailEditorRef.current.editor.setBodyStyle({ width: '900px' });
   // editor instance is created
   // you can load your template here;
   // const templateJson = {};
   // emailEditorRef.current.editor.loadDesign(templateJson);
 }

 const onReady = () => {
   // editor is ready

   const editor = emailEditorRef.current.editor;
   console.log({editor})
 
   if (!editor) return;
   editor.addEventListener('onLoad', () => {
     alert()
     const canvas = editor.getHtml();
     const body = canvas.querySelector('body');
     body.style.width = '900px';
   });
   console.log('onReady');
 };
 useEffect(() => {
   
    const editorInstance = emailEditorRef.contentWindow?.document;
    console.log({editorInstance})
    if (!editorInstance) return;
        editorInstance.addEventListener('onDesignLoad', () => {
          const canvas = editorInstance.getHtml();
          const body = canvas.querySelector('body');
          body.style.width = '900px';
        });
    

}, [emailEditorRef]);
  return (
    <div>
      <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Create Documents
        </Typography>
        <hr height={3} />
        <div style={{display:"flex"}}>
      </div>
        <div>
        {/* <button onClick={exportHtml}>Export HTML</button> */}
      </div>
      <Grid container spacing={2}>
  <Grid item xs={3}>
  <ArrowBackIcon onClick={()=>Navigate('/Admin/AllDocumentAdmin')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
  
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
              />
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
              />
              </Box>
  </Grid>
  <Grid item xs={3}>
  <Button onClick={exportHtml}  sx={{ marginLeft: "45%", marginBottom:"50px" }} className={"A1"} variant="contained">  Create Document</Button> 
  
  </Grid>
 

</Grid>
    <br/>
    <br/>
      {/* <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} /> */}
      <EmailEditor onLoad={onLoad} ref={emailEditorRef}  onReady={onReady} />
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div dangerouslySetInnerHTML={ { __html: Document}}>

      </div>
    </div>
  );
}
