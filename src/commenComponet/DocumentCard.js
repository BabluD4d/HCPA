import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
export default function DocumentCard(props) {
  const Navigate=useNavigate()
  return (
   
    <Grid item mt={3} md={4} lg={4} sm={6} xs={12} xl={props.size}>
      <Grid className="box-shadow-doc">
      <Box p={2}>
        <p className="read-btn">Ready</p>
        <Grid container>
          <Grid item xs={11} >
            <Typography sx={{ fontSize: "21px", fontWeight: "bold" }}>
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography mt={1} sx={{ fontSize: "17px" }}>
              {props.dis}{" "}
            </Typography>
          </Grid>
          <Grid className="doc-btn" container>
          <Grid item xs={6}>
         {
         props.edit ? <div onClick={() => {localStorage.setItem("document_id",props.val.id); Navigate("/EditDocument");}}>
            <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"8px" }}>
              <EditIcon sx={{ color: "#0CB4D0", fontSize: "24px" }} /> Edit 
            </Typography>
          </div>
          :
          <Box 
            sx={{  cursor: "pointer" }}
            onClick={() => {
              localStorage.setItem("ViewDocument",JSON.stringify(props.val))
              setTimeout(() => {    
                Navigate("/Modelus/Document/ViewDocument");
              },200);
            }}
          >
            <RemoveRedEyeIcon sx={{color: "#0CB4D0", fontSize: "24px" }} />
            <Typography variant="span" ml={1} sx={{ color: "#0CB4D0", fontSize: "14px"}}>View Product</Typography>
          </Box>
          }
          </Grid>
          <Grid className="text-align-right"  item xs={6} >
            {props.hellow=="yes"? <div 
            style={{  cursor: "pointer" }}
            onClick={() => {
              Navigate("/Modelus/Document/ViewDocument1/"+props.val.id);
            }}
          >
          
            <Typography  sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"10px" }}>
              {" "}
              <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "24px" }} />  View 
            </Typography>
          </div>:null}
         
            </Grid>
            </Grid>
        </Grid>
      </Box>
    </Grid>
    </Grid>
   

  );
}
