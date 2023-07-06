import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
export default function Public() {
    let Token = localStorage.getItem("Token");
    let role = localStorage.getItem("role");
    return !Token? (
      <>
        <Outlet />
      </>
    ) : (
      <>
       {Token &&role!=3 ? <Navigate to="/Admin" />:Token &&role==3?<Navigate to="/Home" />:<Navigate to="/" />}
      </>
    )
}
