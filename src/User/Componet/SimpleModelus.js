import { Grid, Typography } from "@mui/material";
import React from "react";
import ModelusCardUnlook from "../../commenComponet/ModelusCardUnlook";
import Moduleslook from "../../commenComponet/Moduleslook";

export const SimpleModelus = () => {
  return (
    <div style={{ width: "100%" }}>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        NDIS
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography mt={1} ml={6} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          Product{" "}
        </Typography>
        <Typography mt={1} sx={{ fontSize: "14px" }}>
          {" "}
          / NDIS
        </Typography>
      </div>
      <hr height={3} />
      <Grid container mt={2} spacing={2}>
        <ModelusCardUnlook Module={1} available={6}size={3} />
        <Moduleslook Module={2} available={6}size={3} />
        <Moduleslook Module={3} available={6}size={3} />
        <Moduleslook Module={3} available={6}size={3} />
        <Moduleslook Module={5} available={6}size={3} />
        <Moduleslook Module={6} available={6}size={3} />
      </Grid>
    </div>
  );
};
