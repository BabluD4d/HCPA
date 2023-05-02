import { Button, Grid, Typography } from "@mui/material";
import React from "react";
// import DocumentCard from "../../commenComponet/DocumentCard";
import { useNavigate } from "react-router-dom";
import DocumentCard from "../commenComponet/DocumentCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function AllDocumentAdmin() {
  const Navigate =useNavigate()
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        NDIS Module 1
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography onClick={()=>Navigate("/")}  mt={1} ml={6} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          Product{" "}
        </Typography>
        <Typography onClick={()=>Navigate("/Modelus")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          {" "}
          / NDIS
        </Typography>
        <Typography onClick={()=>Navigate("/Modelus/all")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          {" "}
          / Modules
        </Typography>
        <Typography mt={1} sx={{ fontSize: "14px" }}>
          {" "}
          / NDIS Module 1
        </Typography>
      </div>
      <hr height={3} />
      <Grid container spacing={2}>
  <Grid item xs={3}>
  <div style={{display:"flex"}}>
     <ArrowBackIcon onClick={()=>Navigate('/ModulesList')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
      </div>
  </Grid>
  <Grid item xs={6}>

  </Grid>
  <Grid item xs={3}>
  <Button onClick={()=>Navigate('/CreateDocuments')}  sx={{ marginLeft: "45%", marginBottom:"50px" }} className={"A1"} variant="contained">  Create Document</Button> 
  </Grid>

</Grid>
      <Grid container spacing={2}>
        <DocumentCard edit={true} title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} hellow={"yes"} />
        <DocumentCard edit={true} title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} hellow={"yes"} />
        <DocumentCard edit={true} title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} hellow={"yes"}/>
        <DocumentCard edit={true} title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} hellow={"yes"}/>
        <DocumentCard edit={true} title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} hellow={"yes"}/>
        <DocumentCard edit={true} title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} hellow={"yes"}/>
      </Grid>
    </div>
  );
}
