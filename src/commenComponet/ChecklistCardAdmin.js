import { Box, Grid, Switch, Typography,  } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import EditIcon from "@mui/icons-material/Edit";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          color: '#0CB4D0', // change the color of the thumb here
        },
        track: {
          color: 'grey', // change the color of the track here
        },
      },
    },
  },
});

export default function ChecklistCardAdmin(props) {
    const Navigate=useNavigate()
  return (
    <Grid mb={3}xl={props.size?props.size:3} sm={6} lg={3} item xs={11}> 
     <Box className='sedow'
            sx={{
              backgroundColor: "#E0E0E0",
            }}
          >
    <div  style={{padding:"15px"}}>
  
             <Grid container  >
             <Grid xl={9} sm={9} lg={9} item xs={9}> 

      <Typography sx={{ fontSize: "15px" }} >{props.Modules+" "}  Question </Typography>
             </Grid>
             <Grid mb={3}xl={3} sm={3} lg={3} item xs={3}> 
             {/* <ThemeProvider theme={theme}>
             <Switch  defaultChecked  />
             </ThemeProvider> */}
             </Grid>
             </Grid>
       
      <Typography sx={{ fontSize: "25px" }} >{props.ProductName +" CheckList"} </Typography>
      {<div style={{ display: "flex", }}>
      <RemoveRedEyeIcon  onClick={()=>{Navigate(props.navi?props.navi:"/UserAnsView")}} sx={{ color: "#0CB4D0", fontSize: "24px",cursor:"pointer" }}  />
      <Typography  onClick={()=>{Navigate(props.navi?props.navi:"/UserAnsView")}}ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px",cursor:"pointer" }}>   View  Answer</Typography>
      </div>}
    
    </div>
    </Box>  

  </Grid>
  )
}
