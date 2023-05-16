import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import React from "react";

const CallCard = (props) => {
  // alert(props.key)
  return (
    <Grid item xs={3.5}>
      <Card>
        <CardActionArea>
          <Typography ml={1} sx={{ fontSize: "19px" }}>
            Call type {props.count}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {props.d}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box m={4}>
          {props.Active ? (
            <Button onClick={()=>props.hendleCallis(props.count)} className="A1" variant="contained">
              {props.Active}
            </Button>
          ) : (
            <Button onClick={()=>props.hendleCallis(props.count)} className="Edit" variant="outlined">
              {props.unactive}
            </Button>
          )}
          {/* <Button className="A1" variant="contained">
            Select Call Type
          </Button> */}
          {/* <Button className="Edit" variant="outlined">
            Select Call Type
          </Button> */}
        </Box>
      </Card>
    </Grid>
  );
};

export default CallCard;
