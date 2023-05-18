import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
const Moduleslook = (props) => {
const Navigate=useNavigate()
  return (
    <Grid mt={3} item xs={props.size}>
    <Box className="sedow" sx={{backgroundColor:"#E4EFFA"}} pl={2} p={1.5}>
        <Grid container >
            <Grid item xs={11}>
            <Typography   sx={{ fontSize: "15px",  }} >  available document {" "+props.Module.total_document}
            </Typography>
            </Grid>
            <Grid  item xs={1}>
               <LockIcon /> 
            </Grid>
            <Grid   item xs={6}>

     
            <Typography mt={1}  sx={{ fontSize: "20px", fontWeight: "bold" }} >{props.Module.module_name}</Typography>

            </Grid>
            <br/>
            
            <div style={{marginTop:"46px"}}>
              <Button onClick={()=>Navigate("/BookCall/2")} variant="contained" sx={{backgroundColor:"#0CB4D0"}}> Purchase Modelus</Button>
            </div>
        </Grid>
    </Box>
</Grid>
  )
}

export default Moduleslook