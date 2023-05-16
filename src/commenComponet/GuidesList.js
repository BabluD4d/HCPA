import { Grid, Typography } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const GuidesList = (props) => {
  return (
    <div style={{ marginLeft: "320px" }}>
      <Grid container spacing={2} mb={2}>
        <Grid mt={3} ml={4} item xs={6}>
          {props.Stuts == 2 ? (
            <p
              style={{
                backgroundColor: "#1bbd1b",
                padding: "2px",
                borderRadius: "38%",
                fontSize: "13px",
                color: "white",
                width: "71px",
              }}
            >
              Completed
            </p>
          ) : props.Stuts == 1 ? (
            <p
              style={{
                backgroundColor: "#0CB4D0",
                padding: "2px",
                borderRadius: "38%",
                fontSize: "13px",
                color: "white",
                width: "96px",
              }}
            >
              Curent Chapter
            </p>
          ) : props.Stuts == 3 ? (
            <p
              style={{
                backgroundColor: "#c7c0c0",
                padding: "2px",
                borderRadius: "38%",
                fontSize: "14px",
                color: "white",
                width: "55px",
              }}
            >
              To Start
            </p>
          ) : null}

          <Typography sx={{ fontSize: "19px" }}>{props.title}</Typography>
        </Grid>
        <Grid mt={3} item xs={4}>
          <Typography
            mt={2}
            ml={2}
            sx={{ color: "#0CB4D0", fontSize: "15px", cursor: "pointer" }}
          >
            {" "}
            <RemoveRedEyeIcon
              sx={{ color: "#0CB4D0", fontSize: "20px",marginBottom:"7px" }}
            />{" "}
            View Guides
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default GuidesList;
