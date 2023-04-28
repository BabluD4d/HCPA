import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from '@mui/material'

import React from 'react'

const CallCard = (props) => {
    // alert(props.key)
  return (
    <Grid item xs={3.5} >
      <Card >
      <CardActionArea>
   
      <Typography  ml={1} sx={{ fontSize: "19px" }}>
        Call type {props.count}
      </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.d}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <Box m={4}>

      <Button  className="Edit" variant="outlined">
            Select Call Type
          </Button>
      </Box>
      
    </Card>
    </Grid>
  )
}

export default CallCard