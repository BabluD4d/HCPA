import { Grid, Box } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../commenComponet/Sidebar";
import Header from "../commenComponet/Header";
const AdminProctected = () => {
  let Token = localStorage.getItem("Token");
  let role = localStorage.getItem("role");
  return (Token && role !=3) ? (
    <>
      <Header />
      <Grid container>
        <Sidebar />
        <Grid item xs={12} xl={12} sx={{ height: "100vh", overflow: "auto", width: {xs:'100%', xl:'calc(100% - 16.666667%)'}, paddingLeft: {xs:0, xl:'16.666667%'}, paddingTop: '120px' }}>
          <Box  onClick={() =>{ window.dispatchEvent(new Event("Togle"))}}
            className="outer-wrapper"
            px={{ xs: 2, md: 6 }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  ) : (
    <>{Token && role == 3 ? <Navigate to="/Home" /> : <Navigate to="/" />}</>
  );
};

export default AdminProctected;
