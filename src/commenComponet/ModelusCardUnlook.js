import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
const ModelusCardUnlook = (props) => {
 const Navigate=useNavigate()
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Box className="sedow" sx={{backgroundColor:"#E4EFFA", borderRadius:'5px'}} p={2}>
                <Grid container >
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: "15px"}}>Available Documents {" " + props.Module.total_document}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{display:"block"}}>
                            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }} >{" "+ props.Module.module_name} </Typography>
                        </div>
                    </Grid>
                    <div style={{display:"initial"}}>
                        <Typography onClick={()=>{localStorage.setItem("UserModule",JSON.stringify(props.Module));setTimeout(() => {Navigate("/Modelus/Document") }, 300); }} mt={4}  sx={{ color: "#0CB4D0", fontSize: "15px",cursor:"pointer" }}  >
                            <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "20px",marginBottom:"8px" }}  />  View Modules
                        </Typography>
                    </div>
                </Grid>
            </Box>
        </Grid>
    )
}

export default ModelusCardUnlook
