import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AdminProductCart from '../commenComponet/AdminProductCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExportModiles from '../Api/Admin/Modules/ExportModiles';
export default function ProductByModuleList() {
    const Navigate=useNavigate()
    const [ModuleList, setModuleList] = useState([])
    const [Product, setProduct] = useState(JSON.parse(localStorage.getItem("Product")))

    const GetData = () => {
      let obj = {
        "order": "asc",
        "limit": 10,
        "page": 1,
        "products_id":Product.products_id
      }
      ExportModiles.ModuilesAll(obj).then(
        (resp) => {
          if (resp.ok) {
            console.log(resp.data.data)
            if (resp.data.data[0]) {
              setModuleList(resp.data.data);
            }
          }
        }
      );
    }
    useEffect(() => {
      GetData()
    }, [])
    return (
      <div>
          <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Moduels List
        </Typography>
        <hr height={3} />
        <Grid container spacing={4} mt={2} >
        <Grid xl={3} > 
        <ArrowBackIcon  onClick={()=>Navigate('/Productlist')} style={{color:"#0cb4d0" ,fontSize:"50px",marginLeft:"18px"}}/>
        </Grid>
        <Grid xl={3} > 
        {/* <FormControl fullWidth>
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
                </FormControl> */}
        </Grid>
        <Grid xl={6} > 
        <div style={{display:"flex"}}>
                 <Button mt={1} onClick={()=>Navigate("/Productlist/cretechalist")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Checklist</Button>

        <Button onClick={()=>Navigate("/CreactModules")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Modelus</Button>
        </div>
        </Grid>
          </Grid>
        <Box mt={5}>
            <Grid container spacing={4} mt={2} pl={9}>
            {/* <Grid mb={3}xl={0.5} sm={6} lg={3} item xs={11}> </Grid> */}
              {ModuleList&&ModuleList?.map((item,index)=>{
         return<AdminProductCart navi={"/Admin/AllDocumentAdmin"} status={item.module_status} foo={"1"} size={3} Modules={item.total_document} ProductName={item.module_name} />
                })
              }
                
            {/* <AdminProductCart navi={"/Admin/AllDocumentAdmin"}  foo={"1"} size={3} Modules={2} ProductName={"Aged Caredis"} />
            <AdminProductCart navi={"/Admin/AllDocumentAdmin"} foo={"1"} size={3} Modules={3} ProductName={"SDA"} />   */}
             
         
            </Grid>
              <center>
            <Box ml={9} mt={2}>

              <Pagination  count={10} />
              </Box>
              </center>
            {/* <Pagination onChange={hendlePagintion} count={Math.ceil(Count / 10)} /> */}
            {/* <Grid item mt={-3} xs={2}>  <Button onClick={()=>Navigate("/CreateProduct")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Product</Button> </Grid> */}
       
        </Box>
      </div>
    )
}
