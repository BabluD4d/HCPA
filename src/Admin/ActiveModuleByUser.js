import { Grid, Typography } from '@mui/material'
import React from 'react'
import AdminProductCart from '../commenComponet/AdminProductCart'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function ActiveModuleByUser() {
    const Navigate=useNavigate()
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Name : User
      </Typography>
      <hr height={3} />
      <div>
      <Grid container spacing={2}>
  <Grid item xs={1}>
  <ArrowBackIcon onClick={()=>Navigate('/UserActionView')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
  
  </Grid>
  <Grid item xs={6}>

        <Typography mt={2}  sx={{ fontSize: "23px" }}>
          Active Moduels
        </Typography>
  </Grid>

</Grid>
        <Grid container  spacing={4} mt={2} pl={9}>
          <AdminProductCart Modules={3} ProductName={"SDA"} />
          <AdminProductCart Modules={2} ProductName={"Aged Caredis"} />
          
        </Grid>
      </div>
    </div>
  )
}
