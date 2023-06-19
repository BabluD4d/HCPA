import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

const TimeButton = (props) => { 
  return (
    <Grid sx={{border:'1px solid rgb(128 128 128 / 5%)', cursor:"pointer", p:2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=>props.handleActiveTime(props.time)} className={props.select==props.time?"activetime":""} item xs={3} sm={2}>
      <Typography sx={{ fontSize: "17px", textAlign:"center" }}>
          {props.time}
        </Typography>
    </Grid>
  )
}

export default TimeButton