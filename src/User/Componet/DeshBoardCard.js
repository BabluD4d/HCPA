import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
function DeshBoardCardFile(props) {
    const Navigate=useNavigate()
  return (
    <Grid item className='sedowFile' xs={12} sm={6} md={4} lg={12} style={{marginBottom:"15px"}}>

    <Box sx={{ border: 1, borderColor: 'grey.400', p:2}}>
        <h6 style={{fontWeight:"bold"}}>{props.item.product_name}</h6>
        <h6 style={{fontWeight:"bold"}}>{props.item.document_title}</h6>
        {/*      */}
      <Grid container>         
         <Grid xs={6}md={6}lg={6}xl={6}>
         <div style={{ display: "flex",cursor:"pointer", width:"fit-content"}} onClick={()=>{localStorage.setItem("ViewDocument",JSON.stringify(props.item));
            setTimeout(() => {
              Navigate("/Modules/Document/ViewDocument")
            });
          }}>

         <RemoveRedEyeIcon sx={{ color: "#0CB4D0", fontSize: "24px" }}  />
    <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px" }} >   View  File</Typography>
         </div>
         </Grid>
         <Grid xs={6}md={6}lg={6}xl={6}>
         {/* <div  style={{ display: "flex",cursor:"pointer",width:"fit-content",marginLeft:"18px" }} onClick={()=>{localStorage.setItem("ViewDocument",JSON.stringify(props.item));
            setTimeout(() => {
              Navigate("/Modules/Document/ViewDocument")
            });
          }}>

<DownloadIcon sx={{ color: "#0CB4D0", fontSize: "24px" }}  />
<Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px" }}>Download File</Typography>
</div> */}
         </Grid>
      </Grid>
    </Box>
    </Grid>
  )
}

export default DeshBoardCardFile
