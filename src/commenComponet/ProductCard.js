import { Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const Navigate=useNavigate()
  return (
    <Grid xs={12} sm={6} md={4} item mb={{xs:2, lg:0}}>
      <div className='sedow ' style={{paddingBlock:"20px",paddingLeft:"20px",}}>
    <Typography sx={{ fontSize: "15px" }} >{props.Modules+" "} Modules </Typography>
    <Typography fontSize={{xs:'18px', lg:'25px'}}>{props.ProductName} </Typography>
    <div style={{ display: "flex",cursor:"pointer" }} onClick={()=>{
        localStorage.setItem("UserProduct",JSON.stringify(props.val))
        localStorage.setItem("activeProduct",props.val.id)
      setTimeout(() => {
        Navigate("/Modules")
    }, ); }}>
    <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "24px" }}  />
    <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px" }}>   View  Product</Typography>
      </div>
    </div>
</Grid>
  )
}

export default ProductCard