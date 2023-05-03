import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
export default function DocumentCard(props) {
  const Navigate=useNavigate()
  return (
    <Grid mt={3}md={4} lg={4}  sm={6} xs={12}  item xl={props.size}>
      <Box pl={2} p={2}>
        <p
          style={{
            backgroundColor: "#1bbd1b",
            padding: "3px",
            borderRadius: "38%",
            fontSize: "13px",
            color: "white",
            width: "45px",
          }}
        >
          Ready
        </p>
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
          <Grid container>
          <Grid item xs={6} >
         {props.edit?    <div 
            style={{ display: "flex", marginBlock:"8px", cursor: "pointer" }}
            onClick={() => {
              localStorage.setItem("document_id",props.val.id)
              Navigate("/EditDocument");
            }}
          >
            <EditIcon sx={{ color: "#0CB4D0", fontSize: "24px" }} />
            <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"8px" }}>
              {" "}
              Edit Document
            </Typography>
          </div>:    <div 
            style={{ display: "flex", marginBlock:"8px", cursor: "pointer" }}
            onClick={() => {
              Navigate("/Modelus/Document/ViewDocument");
            }}
          >
            <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "24px" }} />
            <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"10px" }}>
              {" "}
              View Product
            </Typography>
          </div>}
          </Grid>
{/* {console.log(props.val)} */}
          <Grid item xs={6} >
            {props.hellow=="yes"? <div 
            style={{ display: "flex", marginBlock:"8px", cursor: "pointer" }}
            onClick={() => {
              Navigate("/Modelus/Document/ViewDocument1/"+props.val.id);
            }}
          >
            <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "24px" }} />
            <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"10px" }}>
              {" "}
              View Document
            </Typography>
          </div>:null}
         
            </Grid>
            </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
