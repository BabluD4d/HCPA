import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

const TimeButton = (props) => {
 
  return (
    <Grid sx={{cursor:"pointer"}} onClick={()=>props.handleActiveTime(props.time)} className={props.select==props.time?"activetime":""} item xs={4}>
          <Typography m={1} sx={{ fontSize: "17px", textAlign:"center" }}>
              {props.time}
            </Typography>
    </Grid>
  )
}

export default TimeButton