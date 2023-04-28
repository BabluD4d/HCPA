import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../commenComponet/Sidebar";
import Header from "../commenComponet/Header";
const AdminProctected = () => {
  // console.log(<Outlet/>)
  let Token = localStorage.getItem("Token");
  return Token  ? (
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
    <Navigate to="/login" />
  );
};

export default AdminProctected;