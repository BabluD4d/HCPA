import { Grid, Switch, Typography,  } from '@mui/material'
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
export default function AdminProductCart(props) {
    const Navigate=useNavigate()

  return (
    <Grid mb={3}xl={props.size?props.size:3} sm={6} lg={3} item xs={11}> 
  <div className='sedow' style={{backgroundColor:"#E0E0E0",padding:"15px",}}>

           <Grid container  >
           <Grid xl={9} sm={9} lg={9} item xs={9}> 
           {props.foo==1?
    <Typography sx={{ fontSize: "15px" }} >{props.Modules+" "} Document </Typography>:
    <Typography sx={{ fontSize: "15px" }} >{props.Modules+" "}  Modules </Typography>}
           </Grid>
           <Grid mb={3}xl={3} sm={3} lg={3} item xs={3}> 
           <ThemeProvider theme={theme}>
           <Switch onChange={()=>props?.onChangeHendle(props.item)}  checked={props.status=="true"?true:false}    />
           </ThemeProvider>
           </Grid>
           </Grid>
     
    <Typography sx={{ fontSize: "25px" }} >{props.ProductName} </Typography>
    {props.navi?  <Grid container spacing={2}>
  <Grid item xs={6}>
  <div style={{ display: "flex", }}>
  <RemoveRedEyeIcon  onClick={()=>{localStorage.setItem("module",JSON.stringify(props.item));setTimeout(() => {
     Navigate(props.navi?props.navi:"/ActiveModuleByUser") 
    });}} sx={{ color: "#0CB4D0", fontSize: "24px",cursor:"pointer" }}  />
    <Typography  onClick={()=>{localStorage.setItem("module",JSON.stringify(props.item));setTimeout(() => {
     Navigate(props.navi?props.navi:"/ActiveModuleByUser") 
    });}}ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px",cursor:"pointer" }}>   View  {props.foo==1?"":"Active "} Modelus</Typography>
    </div>
  </Grid>
  <Grid item xs={6}>
  <div style={{ display: "flex", }}>
  <EditIcon  onClick={()=>{props?.handlemodal(props.item)}} sx={{ color: "#0CB4D0", fontSize: "24px",cursor:"pointer" }}  />
    <Typography  onClick={()=>{props?.handlemodal(props.item)}}ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px",cursor:"pointer" }}>   Edit Modelus</Typography>
    </div>
  </Grid>

</Grid>:<div style={{ display: "flex", }}>
    <RemoveRedEyeIcon  onClick={()=>{localStorage.setItem("module",JSON.stringify(props.item));setTimeout(() => {
     Navigate(props.navi?props.navi:"/ActiveModuleByUser") 
    });}} sx={{ color: "#0CB4D0", fontSize: "24px",cursor:"pointer" }}  />
    <Typography  onClick={()=>{localStorage.setItem("module",JSON.stringify(props.item));setTimeout(() => {
     Navigate(props.navi?props.navi:"/ActiveModuleByUser") 
    });}}ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px",cursor:"pointer" }}>   View  {props.foo==1?"":"Active "} Modelus</Typography>
    </div>}
  </div>
</Grid>
  )
}
