import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
const ModelusCardUnlook = (props) => {
 const Navigate=useNavigate()
    return (
        <Grid mt={3} item xs={props.size}>
            <Box pl={2} p={2}>
                <Grid container >
                    <Grid   item xs={11}>
                    <Typography   sx={{ fontSize: "15px",  }} >  available document {" "+props.Module.total_document}
                    </Typography>
                    </Grid>
                    <Grid  item xs={1}>
                    </Grid>
                    <Grid   item xs={12}>
                    <div style={{display:"block"}}>
                    <Typography mt={1}  sx={{ fontSize: "20px", fontWeight: "bold" }} >{" "+ props.Module.module_name} </Typography>
                    </div>
                    </Grid>
                    <br/>
                    <div style={{display:"initial"}}>
                    <Typography onClick={()=>{Navigate("/Modelus/Document")}} mt={4}  sx={{ color: "#0CB4D0", fontSize: "15px",cursor:"pointer" }}  > <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "20px",marginBottom:"8px" }}  />  View Modelus</Typography>
                    </div>
                </Grid>
            </Box>
        </Grid>
    )
}

export default ModelusCardUnlook
