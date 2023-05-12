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
import Exportpurchaselist from '../Api/Admin/purchaselist/Exportpurchaselist';
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
      // alert(Product.id)
        let obj = {
          user_id: localStorage.getItem("UserProduct_id"),
          product_id: Product.id,
        };
        Exportpurchaselist.purchaselistModule(obj).then((resp) => {
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
      const Hendlestuts = (value,id) => {
        let obj = {
          user_id: localStorage.getItem("UserProduct_id"),
          // products_id: Product.products_id, 
          module_id:id,
          status:value
        };
        // console.log(value)
        Exportpurchaselist.purchaselistmoduletHendle(obj).then((resp) => {
          if (resp.ok) {
            console.log(resp.data);
            if (resp.data.message == "module deactive") {
              toast.success('Module  deactive successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              GetData()
              // Navigate('/Productlist')
            }else if(resp.data.message == " module active"){
              toast.success('Module  active successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              GetData()
            }
             else {
              toast.error('Something went rong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
        });
      };
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
           <Switch onChange={()=>Hendlestuts(!item.purchase_status,item.id)} checked={item.purchase_status==0?false:true}  />

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
