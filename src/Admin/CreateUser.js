import React from 'react'
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
export default function CreateUser() {
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Add User
      </Typography>
      <hr height={3} />
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> 
            <TextField
              fullWidth
              id="fullWidth"
              label="Email"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> 
            <TextField
              fullWidth
              id="fullWidth"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> 
            <TextField
              fullWidth
              id="fullWidth"
              label="Mobile"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> 
            <Box mt={5}>
           <Button  sx={{marginLeft:"10px"}} className={"A1"} variant="contained">Submit</Button>
           </Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </div>
  )
}
