import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../commenComponet/Sidebar";
import Header from "../commenComponet/Header";
const Proctected = () => {
  let Token = localStorage.getItem("Token");
  let role = localStorage.getItem("role");
  return Token &&role==3 ? (
    <>
       <Grid container spacing={2}>
        <Sidebar />
        <Grid item md={12} sm={12} xl={10} lg={12} xs={12} sx={{ height: "100vh", overflow: "auto" }} >
          <Header />
      <Outlet />
      </Grid>
      </Grid>
    </>
  ) : (
    <>
     {Token &&role==1||role==2 ? <Navigate to="/Admin" />: <Navigate to="/" />}
    </>
  );
};

export default Proctected;
