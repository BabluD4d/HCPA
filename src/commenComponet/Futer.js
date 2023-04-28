import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const Futer = () => {
  return (
    <Box   sx={{paddingTop:"30px",paddingBottom:"4px" ,color:"gray",textAlign:"left" }}>
    <Grid container   >
   <Grid   xs={4}>
   <Grid  container>
   <Grid className='futtor'  xs={2}>
   <Typography >About</Typography>  
</Grid>
<Grid  m={0} p={0} xs={3}>
<Typography >Privacy policy</Typography>  
   </Grid>
   <Grid m={0} p={0}  xs={3}>
   <Typography m={0} p={0}>Contact HCPA</Typography>  
   </Grid>
   </Grid>
   </Grid>
   <Grid   xs={5}>

   </Grid>
   <Grid   xs={3}>
  <Typography m={0} p={0} >@ 2022 Halth Care Providers Association </Typography>

   </Grid>
  
 </Grid>
    </Box>
  )
}

export default Futer