import React from "react";
import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AdminProductCart from "../commenComponet/AdminProductCart";

export default function ModulesList() {
    const Navigate=useNavigate()
  return (
    <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Moduels List
      </Typography>
      <hr height={3} />
      <Grid container spacing={4} mt={2} >
      <Grid xl={3} > 
      {/* <ArrowBackIcon onClick={()=>Navigate('/ModulesList')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/> */}
      </Grid>
      <Grid xl={6} > 
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
      </Grid>
      <Grid xl={3} > 
      <Button onClick={()=>Navigate("/CreactModules")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
            className={"active"}
          /> &nbsp; &nbsp; &nbsp; Create Modelus</Button>
      </Grid>
        </Grid>
      <Box mt={5}>
          <Grid container spacing={4} mt={2} pl={9}>
          <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={3} ProductName={"SDA"} />
          <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={2} ProductName={"Aged Caredis"} />
          <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={3} ProductName={"SDA"} />  
           
{/*        
            <Pagination count={10} /> */}
          </Grid>
          {/* <Grid item mt={-3} xs={2}>  <Button onClick={()=>Navigate("/CreateProduct")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
            className={"active"}
          /> &nbsp; &nbsp; &nbsp; Create Product</Button> </Grid> */}
     
      </Box>
    </div>
  )
}
