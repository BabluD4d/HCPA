import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
const Moduleslook = (props) => {
const Navigate=useNavigate()
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box className="sedow" sx={{backgroundColor:"#E4EFFA", borderRadius:'5px'}} p={2}>
        <Grid container>
          <Grid item xs={10}>
            <Typography sx={{fontSize: "15px"}}>available document {" " + props.Module.total_document}</Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }} >{props.Module.module_name}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="right">
            <LockIcon /> 
          </Grid>          
          <Grid xs={12} mt={3}>
            <Button onClick={()=>Navigate("/BookCall/2")} variant="contained" sx={{backgroundColor:"#0CB4D0"}}> Purchase Modelus</Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default Moduleslook