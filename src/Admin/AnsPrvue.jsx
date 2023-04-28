import React from 'react'
import { Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
export default function AnsPrvue() {
    const Navigate = useNavigate()
  return (
    <div>
      <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Answer
      </Typography>
      <hr height={3} />

      <div>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <ArrowBackIcon onClick={() => Navigate('/UserActionView')} style={{ color: "#0cb4d0", fontSize: "50px" }} />
          </Grid>
          <Grid item xs={6}>

            {/* <Typography mt={2} sx={{ fontSize: "23px" }}>
              Active Products
            </Typography> */}
          </Grid>

        </Grid>

        <Grid container spacing={4} mt={2} pl={9}>
        </Grid>
        <Grid container spacing={4} mt={2} pl={9}>
          </Grid>
      </div>
    </div>
    </div>
  )
}
