import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
function AdminModules() {
    const Navigate=useNavigate()
  return (
         <Grid mt={3} item xs={props.size}>
    <Box sx={{backgroundColor:"#E4EFFA"}} pl={2} p={2}>
        <Grid container >
            <Grid item xs={11}>
            <Typography   sx={{ fontSize: "15px",  }} >  available document {" "+props.available}
            </Typography>
            </Grid>
            <Grid  item xs={1}>
               <LockOpenIcon /> 
            </Grid>
            <Grid   item xs={6}>

     
            <Typography mt={1}  sx={{ fontSize: "20px", fontWeight: "bold" }} >NDIS Module {" "+ props.Module} </Typography>

            </Grid>
            <br/>
            
            <div style={{marginBlock:"22px"}}>
              <Button onClick={()=>Navigate("/BookCall")} variant="contained" sx={{backgroundColor:"#0CB4D0"}}> Purchase Modelus</Button>
            </div>
        </Grid>
    </Box>
</Grid>
  )
}

export default AdminModules
