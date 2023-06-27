import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import {
    Box,
    TableContainer,
    Paper,
    TableBody,
    TableHead,
    TableRow,
    Grid,
    Pagination,
    Switch,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Table } from 'react-bootstrap';
import ExportModiles from '../Api/Admin/Modules/ExportModiles';
import Exportpurchaselist from '../Api/Admin/purchaselist/Exportpurchaselist';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ColorRing } from 'react-loader-spinner';
import { styled } from "@mui/material/styles";

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
    const [Product, setProduct] = useState(JSON.parse(localStorage.getItem("Product")));
    const Navigate = useNavigate()
    const [Data, setData] = useState()
    const [DataChecklist, setDataChecklist] = useState()
    const [loader, setloader] = useState(true);
    const [count, setcount] = useState(1);
    const [page, setpage] = useState(1);
    const GetData = () => {
        let obj = {
          "order": "desc",
          "limit": 10,
          user_id: localStorage.getItem("UserProduct_id"),
          product_id: Product.id,
          "page":page,
        };
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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0CB4D0",
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));

  return (
    <>
      {/* <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>Module List</Typography> */}
      <Grid container>
        <Grid xl={3}> 
          <ArrowBackIcon className='back-icon-proact' onClick={()=>Navigate('/UserList/product/active')} />
        </Grid>     
      </Grid>
      {
        loader ?
          <div style={{marginTop:"24%"}}>
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
          </div>
        :
        <>
          <Box mt={{xs:0, md:5}}>
            <Grid>
              <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px'}}>Module List </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <Box mt={4}>
                    <TableContainer component={Paper} sx={{mb:2}}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Modules Name</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            Data?.map((item, index) => {
                              return (
                                <TableRow>
                                  <StyledTableCell>{index + 1}</StyledTableCell>
                                  <StyledTableCell>{item.module_name}</StyledTableCell>
                                  <StyledTableCell><ThemeProvider theme={theme}><Switch onChange={()=>Hendlestuts(!item.purchase_status,item.id)} checked={item.purchase_status==0?false:true}  /></ThemeProvider></StyledTableCell>
                                </TableRow>
                              )
                            })
                          }        
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Pagination onChange={hendlePagintion} count={Math.ceil(count / 10)} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box mb={5}>
            <Grid container>
              <Grid item mt={5} xs={12}>
              <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>CheckList</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell> Name</StyledTableCell>
                      <StyledTableCell>View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      DataChecklist?.map((item, index) => {
                        return (
                          <TableRow>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{item.title}</StyledTableCell>
                            <StyledTableCell onClick={() => {localStorage.setItem("Checklist_Aid",item.id); Navigate("/AdminViewAns");}} style={{ color: "#0CB4D0", cursor: "pointer" }}><RemoveRedEyeIcon sx={{color: "#0CB4D0", marginBottom: "10px", fontSize: "28px"}} />&nbsp; View</StyledTableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Box>
        </>
      }
    </>
  )
}
