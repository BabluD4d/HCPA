import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
export default function CreactModules() {
  const Navigate=useNavigate()
  return (
    <div>
      <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Create Modelus
        </Typography>
        <hr height={3} />
        <div style={{display:"flex"}}>
     <ArrowBackIcon onClick={()=>Navigate('/ModulesList')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
      </div>
        <Box mt={5}>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{ marginLeft: "10px" }}
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Product
                </InputLabel>
                <NativeSelect
                  defaultValue={10}
                  inputProps={{
                    name: "Product",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value={10}></option>
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </FormControl>
              <TextField
                fullWidth
                id="fullWidth"
                label="Modelus Name "
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />{" "}
              <FormControl>
                <FormLabel
                  sx={{ marginLeft: "10px" }}
                  id="demo-form-control-label-placement"
                >
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="Look"
                    control={<Radio />}
                    label="Look"
                    labelPlacement="Look"
                  />
                  <FormControlLabel
                    value="Unlook"
                    control={<Radio />}
                    label="Unlook"
                    labelPlacement="Unlool"
                  />
                </RadioGroup>
              </FormControl>
              <Box mt={5}>
                <Button
                  sx={{ marginLeft: "10px" }}
                  className={"A1"}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
