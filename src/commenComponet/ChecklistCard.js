import { Typography } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
const ChecklistCard = (props) => {
  const Navigate =useNavigate()
  return (
    <div style={{marginBottom:"22px"}}>
        <div style={{display:"flex"}}>

          <Typography mt={2} ml={6} sx={{ fontSize:"13px",backgroundColor:"#e0e0e0"}} >To be completed</Typography>
          <p></p>
        </div>
          <Typography mt={1} ml={6} sx={{ fontSize:"17px",}} >HCPA Checklist - NDIS {" "+props.count}</Typography>
          <Typography  ml={6} sx={{ fontSize:"10px",}} >0 of 4 sections completed</Typography>
          <div>
          <Typography onClick={()=>Navigate("/Modelus/CheckList")} mt={2} ml={6} sx={{ color: "#0CB4D0", fontSize: "15px" }}> <CreateIcon sx={{ color: "#0CB4D0", fontSize: "20px",marginBottom:"15px" }}  />  Fill out from</Typography>
          </div>
    </div>
  )
}

export default ChecklistCard