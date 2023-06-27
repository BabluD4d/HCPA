import { Grid, Box } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../commenComponet/Sidebar";
import Header from "../commenComponet/Header";
const AdminProctected = () => {
  let Token = localStorage.getItem("Token");
  let role = localStorage.getItem("role");
  return Token &&role==1||role==2 ? (
    <>
      <Grid container>
        <Sidebar />
        <Grid item xs={12} xl={10} sx={{ height: "100vh", overflow: "auto" }}>
          <Header />
          <Box className="outer-wrapper" px={{xs:2, md:6}} pt={{xs:2, md:6}}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
    {Token&&role==3? <Navigate to="/Home" />: <Navigate to="/" />}
    </>
  );
};

export default AdminProctected;