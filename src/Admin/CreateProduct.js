import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
export default function CreateProduct() {
  const Navigate=useNavigate()
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Create Product
      </Typography>
      <hr height={3} />
      <div style={{display:"flex"}}>
     <ArrowBackIcon onClick={()=>Navigate('/Productlist')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
      </div>
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Create Product"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> <Box mt={5}>
           <Button  sx={{marginLeft:"10px"}} className={"A1"} variant="contained">Submit</Button>
           </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </div>
  );
}
