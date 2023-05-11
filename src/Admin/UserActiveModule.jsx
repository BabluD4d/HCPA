import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    NativeSelect,
    Pagination,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    TextareaAutosize,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Table } from 'react-bootstrap';
import ExportModiles from '../Api/Admin/Modules/ExportModiles';
const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          thumb: {
            color: '#0CB4D0', // change the color of the thumb here
          },
          track: {
            color: 'grey', // change the color of the track here
          },
        },
      },
    },
  })

export default function UserActiveModule() {
    const [Product, setProduct] = useState(
        JSON.parse(localStorage.getItem("Product"))
      );
    const Navigate = useNavigate()
    const [Data, setData] = useState()
    const GetData = () => {
        let obj = {
          order: "asc",
          limit: 10,
          page: 1,
          products_id: Product.products_id,
        };
        ExportModiles.ModuilesAll(obj).then((resp) => {
          if (resp.ok) {
            // console.log(resp.data.data);
            if (resp.data.data[0]) {
                setData(resp.data.data);
            }
          }
        });
      };
    useEffect(() => {
        GetData()
      }, [])
  return (
    <div>
       <div>
      {" "}
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
      Module List
      </Typography>
      <hr height={3} />
      <Grid container mt={2} >
      <Grid xl={3} > 
      <ArrowBackIcon onClick={()=>Navigate('/UserList/product/active')} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
      </Grid>
      <Grid xl={6} > 

      </Grid>
      <Grid xl={3} > 

      </Grid>
        </Grid>
      <Box mt={5}>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item mt={5} xs={8}>
            <Table striped hover>
              <thead
                style={{
                  paddingBlock: "30px",
                  backgroundColor: "#0CB4D0",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Modules Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Data?.map((item, index) => {

                  return <tr>
                    <td>{index + 1}</td>
                    <td>{item.module_name}</td>
                    <td>    <ThemeProvider theme={theme}>
           {/* <Switch onChange={()=>props?.onChangeHendle(props.item)}  checked={props.status=="true"?true:false}    /> */}
           <Switch    />
           </ThemeProvider>
                    </td>

                  </tr>
                })}
        
              </tbody>
            </Table>
            {/* <Pagination onChange={hendlePagintion} count={Math.ceil(Count / 10)} /> */}
            <Pagination  />
          </Grid>
          <Grid item mt={-3} xs={2}>   </Grid>
        </Grid>
      </Box>
    
     
    </div>
    </div>
  )
}
