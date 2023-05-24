import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import ExportDocument from "../../Api/Admin/Document/ExportDocument";
import ExportDocumentuser from "../../Api/user/Document/ExportDocumentuser";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default function ViewDocument() {
  const [open, setOpen] = React.useState(false);
  const [loder1, setloder1] = React.useState(false);
const Navigate= useNavigate()
const [Data, setData] = useState([])
const [Data1, setData1] = useState([])
const [module, setmodule] = useState(JSON.parse(localStorage.getItem("module")));
const [DataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("userdata")));
const [Product, setProduct] = useState(
  JSON.parse(localStorage.getItem("Product"))
);
const [UserProduct, setUserProduct] = useState(
  JSON.parse(localStorage.getItem("UserProduct"))
);
const [Module, setModule] = useState(
  JSON.parse(localStorage.getItem("UserModule"))
);
const [ViewDocument, setViewDocument] = useState(
  JSON.parse(localStorage.getItem("ViewDocument"))
)
let params=useParams()
const GetData = () => {
  let obj={
    id:params.id,
    module_id: module?.module_id,
    products_id: Product?.products_id,
    user_id:DataUser?.user_id

  }
  ExportDocument.documentGetviewData(obj).then(
    (resp) => {
      if (resp.ok) {
        if (resp.data) {
         
          setData(resp.data.data);
        }
      }
    }
  );
}
const GetDataDocumentGetDataView = () => {
  let obj={
    document_id: ViewDocument?.id,
    user_id:DataUser?.user_id
  }
  ExportDocumentuser.DocumentGetDataView(obj).then(
    (resp) => {
      if (resp.ok) {
        if (resp.data) {
          console.log(resp.data.data.rpl)
          setData1(resp.data.data.rpl);
        }
      }
    }
  );
}
useEffect(() => {
  GetData()
  GetDataDocumentGetDataView()
}, [])

function eventHandler() {
  setViewDocument(JSON.parse(localStorage.getItem("ViewDocument")))
  // Event handling logic goes here
  GetDataDocumentGetDataView()
  // Remove the event listener after it is fired
  window.removeEventListener('FileChenge', eventHandler);
}

window.addEventListener('FileChenge', eventHandler);
 const DownloadPDF=()=>{
  const input = document.getElementById("PDFDATA");
  html2canvas(input)
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save( ViewDocument.document_title+".pdf");
    })
 }
 function Export2Word( ){
   setOpen(true);
   setTimeout(() => {
     setloder1(true);
     // DownloadPDF()
   }, 1000);
   setTimeout(() => {
    
     var filename =ViewDocument.document_title
     var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
     var postHtml = "</body></html>";
     var html = preHtml+document.getElementById("PDFDATA").innerHTML+postHtml;
     var blob = new Blob(['\ufeff', html], {
         type: 'application/msword'
     });
     
     // Specify link url
     var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
     
     // Specify file name
     filename = filename?filename+'.doc':'document.doc';
     
     // Create download link element
     var downloadLink = document.createElement("a");
   
     document.body.appendChild(downloadLink);
     
     if(navigator.msSaveOrOpenBlob ){
         navigator.msSaveOrOpenBlob(blob, filename);
     }else{
         // Create a link to the file
         downloadLink.href = url;
         
         // Setting the file name
         downloadLink.download = filename;
         
         //triggering the function
         downloadLink.click();
     }
     
     document.body.removeChild(downloadLink);
   }, 1500);
}
  return (
    <div>
      <Grid container>
        <Grid item xs={8}>
        {Data.data?
          <div>
            <Typography
              mt={4}
              ml={6}
              sx={{ fontSize: "25px", fontWeight: "bold" }}
            >
              {Data?.data?.document_title}
            </Typography>
            <div style={{ display: "flex",marginLeft:"1%" }}>
              <Typography  mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
                
                {Data?.data?.product_name}
              </Typography>
              <Typography  mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
              {" "+" / "+" "}
                {Data?.data?.module_name} 
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px" }}>
                {" "}
                / {Data?.data?.document_title}
              </Typography>
            </div>
          </div>:<div>
            <Typography
              mt={4}
              ml={6}
              sx={{ fontSize: "25px", fontWeight: "bold" }}
            >
              {ViewDocument.document_title}
            </Typography>
            <div style={{ display: "flex",marginLeft:"1%" }}>
              <Typography  mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
                
              {UserProduct?.product_name}
              </Typography>
              <Typography  mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
              {" "+" / "+" "}
              {Module?.module_name }
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px" }}>
                {" "}
                / {ViewDocument?.document_title}
              </Typography>
            </div>
          </div>}
          
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button onClick={()=>Export2Word()}
                sx={{ marginTop: "46px", backgroundColor: "#0CB4D0" }}
                variant="contained"
              >
                <InsertDriveFileIcon /> &nbsp; Export as word
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  setOpen(true);
                  setTimeout(() => {
                    setloder1(true);
                    DownloadPDF()
                  }, 1000);
                }}
                sx={{ marginTop: "46px", backgroundColor: "#0CB4D0" }}
                variant="contained"
              >
                <PictureAsPdfIcon /> &nbsp; Export as PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr height={3} />
   { Data.data?<div id="PDFDATA" dangerouslySetInnerHTML={ { __html: Data?.rpl}}>

      </div>:
      <div id="PDFDATA" dangerouslySetInnerHTML={ {__html: Data1}}>

      </div>}
      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
          setTimeout(() => {
            setloder1(false);
          },500);
        }}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{height:"260px"}}>
          {loder1 ? (
            <>
            <div class="main-container" style={{marginTop:"50px"}}>
              <div class="check-container">
                <div class="check-background">
                  <svg
                    viewBox="0 0 65 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 25L27.3077 44L58.5 7"
                      stroke="white"
                      stroke-width="13"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="check-shadow"></div>
              </div>
            </div>
           <h4><center>Export Success</center></h4> 
           <div style={{paddingBottom:"10px"}}>
           <p style={{display:"flex" }}>Document is also saved on your  <p style={{color:"#0CB4D0"}}> File</p></p> 
           <p></p>
           </div>
            </>
          ) : (
            <div style={{marginTop:"50px"}}>
                <center >
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
                <div style={{paddingTop:"30px"}}>

                <h6 style={{fontWeight:"bold"}}>We are exporting your document</h6>
                <center >  <p>This will take a few second...</p> </center>
                </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
