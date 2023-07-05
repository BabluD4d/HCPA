import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const Futer = () => {
  return (
    <Box>
      <Grid container sx={{color:"gray", pt:5, display: 'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between'}}>
        <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'wrap', alignItems:'center', gap:2}} justifyContent={{xs:'center', md:'flex-start'}}>
              {/* <Typography>About</Typography>   */}
              <Typography>Terms and Conditions</Typography>  
              <Typography>Privacy Policy</Typography>  
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{textAlign:{xs:'center', md:'right'}}}>© 2023 Health Care Providers Association</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Futer