import { Grid, Box } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../commenComponet/Sidebar";
import Header from "../commenComponet/Header";
const Proctected = () => {
  let Token = localStorage.getItem("Token");
  let role = localStorage.getItem("role");
  return Token && role==3 ? (
    <>
          <Header />
      <Grid container>
        <Sidebar />
        {/* <Grid item xs={12} xl={10} sx={{ height: "100vh", overflow: "auto" }}> */}
         <Grid item xs={12} xl={12} sx={{ height: "100vh", overflow: "auto", width: {xs:'100%', xl:'calc(100% - 320px)'}, paddingLeft: {xs:0, xl:'320px'}, paddingTop: '100px' }}>
          <Box className="outer-wrapper" px={{xs:2, md:6}} onClick={() =>{alert(1); window.dispatchEvent(new Event("Togle"))}}>
            <div>

            <Outlet />
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
     {Token && role!=3  ? <Navigate to="/Admin" />: <Navigate to="/" />}
    </>
  );
};

export default Proctected;
