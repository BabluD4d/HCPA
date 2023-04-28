import { Grid, Typography } from "@mui/material";
import React from "react";
import GuidesList from "../../commenComponet/GuidesList";
import { useNavigate } from "react-router-dom";

const RegistrationGuide = () => {
  const Navigate= useNavigate()
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        NDIS
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography onClick={()=>Navigate("/")} mt={1} ml={6} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          Product{" "}
        </Typography>
        <Typography onClick={()=>Navigate("/Modelus")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          {" "}
          / NDIS
        </Typography>
        <Typography mt={1} sx={{ fontSize: "14px" }}>
          {" "}
          / Registration Guides
        </Typography>
      </div>
      <hr height={3} />
      <Typography mt={4} sx={{ fontSize: "30px", marginLeft: "320px" }}>
        7 of 14 Guides Completed
      </Typography>
        <GuidesList title={"Chapter 1 - getting Started"} Stuts={1} />
        <GuidesList title={"Chapter 2 - getting Started"} Stuts={2} />
        <GuidesList title={"Chapter 3 - getting Started"} Stuts={3} />
    </div>
  );
};

export default RegistrationGuide;
