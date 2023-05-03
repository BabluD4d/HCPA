import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import ExportDocument from "../../Api/Admin/Document/ExportDocument";
export default function ViewDocument() {
  const [open, setOpen] = React.useState(false);
  const [loder1, setloder1] = React.useState(false);
const Navigate= useNavigate()
const [Data, setData] = useState([])
let params=useParams()
const GetData = () => {
  let obj={
    id:params.id
  }
  ExportDocument.documentGetEditData(obj).then(
    (resp) => {
      if (resp.ok) {
        if (resp.data) {
          console.log(resp.data.data)
          setData(resp.data.data);
        }
      }
    }
  );
}
useEffect(() => {
  GetData()
}, [])
  return (
    <div>
      <Grid container>
        <Grid item xs={8}>
          <div>
            <Typography
              mt={4}
              ml={6}
              sx={{ fontSize: "25px", fontWeight: "bold" }}
            >
              High Intensity Daily Personal Activities
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography
                mt={1}
                ml={6}
                onClick={()=>Navigate("/")}
                sx={{ fontSize: "14px", color: "#0CB4D0" }}
              >
                Product{" "}
              </Typography>
              <Typography onClick={()=>Navigate("/")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
                {" "}
                / NDIS
              </Typography>
              <Typography onClick={()=>Navigate("/Modelus/all")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
                {" "}
                / Modules
              </Typography>
              <Typography onClick={()=>Navigate("/Modelus/Document")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
                {" "}
                / NDIS Module 1
              </Typography>
              <Typography mt={1} sx={{ fontSize: "14px" }}>
                {" "}
                / High Intensity Daily Personal Activities
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                sx={{ marginTop: "46px", backgroundColor: "#0CB4D0" }}
                variant="contained"
              >
                <InsertDriveFileIcon /> &nbsp; Purchase Product
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  setOpen(true);
                  setTimeout(() => {
                    setloder1(true);
                  }, 1000);
                }}
                sx={{ marginTop: "46px", backgroundColor: "#0CB4D0" }}
                variant="contained"
              >
                <PictureAsPdfIcon /> &nbsp; Purchase Product
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr height={3} />
      <div dangerouslySetInnerHTML={ { __html: Data[0]?.html_data}}>

      </div>
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
