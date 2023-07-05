import { Typography, Grid } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
const ChecklistCard = (props) => {
  const Navigate =useNavigate()
  return (
    <Grid xs={12} sm={6} md={4} lg={12} mb={5}>
      <Typography variant="span" sx={{ fontSize:"13px", backgroundColor:"#e0e0e0", px:1, py:0.5, borderRadius:'2px'}}>To be completed</Typography>
      <Typography mt={1} sx={{ fontSize:"17px",}} > {" " + props.count.title}</Typography>
      <Typography sx={{ fontSize:"10px",}} >0 of 4 sections completed</Typography>
      <div>
      <Typography onClick={()=>{localStorage.setItem("CheckList_id",props.count.id);
        Navigate("/Modules/CheckList")}} mt={2} sx={{ color: "#0CB4D0", fontSize: "15px",cursor:"pointer" }}> <CreateIcon sx={{ color: "#0CB4D0", fontSize: "20px",marginBottom:"15px" }}  />  Fill out from</Typography>
      </div>
    </Grid>
  )
}

export default ChecklistCard  