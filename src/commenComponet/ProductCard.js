import { Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const Navigate=useNavigate()
  return (
    <Grid mb={4}xl={4} sm={6} lg={4} item xs={11}>
    <Typography sx={{ fontSize: "15px" }} >{props.Modules+" "} Modules </Typography>
    <Typography sx={{ fontSize: "25px" }} >{props.ProductName} </Typography>
    <div style={{ display: "flex",cursor:"pointer" }} onClick={()=>{Navigate("/Modelus")}}>
    <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "24px" }}  />
    <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px" }}>   View  Product</Typography>
    </div>
</Grid>
  )
}

export default ProductCard