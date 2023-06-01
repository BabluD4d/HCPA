import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import {
    Box,
    Grid,
    Pagination,
    Switch,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Table } from 'react-bootstrap';
import ExportModiles from '../Api/Admin/Modules/ExportModiles';
import Exportpurchaselist from '../Api/Admin/purchaselist/Exportpurchaselist';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ColorRing } from 'react-loader-spinner';
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
    const [DataChecklist, setDataChecklist] = useState()
    const [loader, setloader] = useState(true);
    const [count, setcount] = useState(1);
    const [page, setpage] = useState(1);
    const GetData = () => {
      // alert(Product.id)
        let obj = {
          "order": "desc",
          "limit": 10,
          user_id: localStorage.getItem("UserProduct_id"),
          product_id: Product.id,
          "page":page,
        };
        // alert()
        Exportpurchaselist.purchaselistModule(obj).then((resp) => {
          if (resp.ok) {
            if (resp.data.data) {
                setData(resp.data.data.module);
                setcount(resp.data.data.count);
                setloader(false)
            }else{
              setloader(false)
            }
          
          }
        });
      };
      const hendlePagintion = (event, value) => {
        setpage(value)
        let obj = {
          "order": "desc",
          "limit": 10,
          user_id: localStorage.getItem("UserProduct_id"),
          product_id: Product.id,
          "page": value
        }
        //EditProduct
        Exportpurchaselist.purchaselistModule(obj).then((resp) => {
          if (resp.ok) {
            if (resp.data.data) {
                setData(resp.data.data.module);
                setloader(false)
            }else{
              setloader(false)
            }
          
          }
        });
      }
    const GetCheckListData = () => {
      // alert(Product.id)
        let obj = {
          user_id: localStorage.getItem("UserProduct_id"),
          product_id: Product.id,
        };
        Exportpurchaselist.ViewUserFillChecklist(obj).then((resp) => {
          if (resp.ok) {
            if (resp.data.data[0]) {
              setDataChecklist(resp.data.data);
              setloader(false)
            }else{
              setloader(false)
            }
          
          }
        });
      };
    useEffect(() => {
        GetData()
        GetCheckListData()
      }, [])
      const Hendlestuts = (value,id) => {
        let obj = {
          user_id: localStorage.getItem("UserProduct_id"),
          product_id: Product.id, 
          module_id:id,
          status:value
        };
        Exportpurchaselist.purchaselistmoduletHendle(obj).then((resp) => {
          if (resp.ok) {
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
              toast.error('Something went wrong', {
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
        {loader?    <div style={{marginTop:"24%"}}>
                <center >
                <ColorRing
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["#0CB4D0", "#0CB4D0", "#0CB4D0", "#0CB4D0", "#0CB4D0"]}
                />
                
                </center>
               
            </div>:<>
      <Box mt={5}>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item mt={5} xs={8}>
          <Typography mt={4} mb={3} sx={{ fontSize: "30px" }}>
          Module List
      </Typography>
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
            <Pagination onChange={hendlePagintion} count={Math.ceil(count / 10)} />
            {/* <Pagination  /> */}
          </Grid>
          <Grid item mt={-3} xs={2}>   </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item mt={5} xs={8}>
      <Typography mt={4} mb={3} sx={{ fontSize: "30px" }}>
      CheckList
      </Typography>
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
                  <th> Name</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {DataChecklist?.map((item, index) => {

                  return <tr>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td
                      onClick={() => {
                        localStorage.setItem("Checklist_Aid",item.id)
                        Navigate("/AdminViewAns");
                      }}
                      style={{ color: "#0CB4D0", cursor: "pointer" }}
                    >
                      {" "}
                      <RemoveRedEyeIcon
                        sx={{
                          color: "#0CB4D0",
                          marginBottom: "10px",
                          fontSize: "28px",
                        }}
                      />{" "}
                      &nbsp; View{" "}
                    </td>

                  </tr>
                })}
        
              </tbody>
            </Table>
            {/* <Pagination onChange={hendlePagintion} count={Math.ceil(count / 10)} /> */}
            {/* <Pagination  /> */}
          </Grid>
          <Grid item mt={-3} xs={2}>   </Grid>
        </Grid>
      </Box>
    </>}
     
    </div>
    </div>
  )
}
