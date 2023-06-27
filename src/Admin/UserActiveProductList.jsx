import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  TableContainer,
  Paper,
  Box,
  Grid,
  Pagination,
  Switch,
  TableBody,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Table } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import Exportpurchaselist from "../Api/Admin/purchaselist/Exportpurchaselist";
import { ColorRing } from "react-loader-spinner";
import { styled } from "@mui/material/styles";
const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          color: "#0CB4D0", // change the color of the thumb here
        },
        track: {
          color: "grey", // change the color of the track here
        },
      },
    },
  },
});

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

export default function UserActiveProductList() {
  const Navigate = useNavigate();
  const [Data, setData] = useState();
  const [count, setcount] = useState();
  const [loader, setloader] = useState(true);
  const GetData = () => {
    let obj = {
      "order": "desc",
      "limit": 10,
      user_id: localStorage.getItem("UserProduct_id"),
      "page": 1
    };
    Exportpurchaselist.purchaselistProduct(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setData(resp.data.data.product);
          setcount(resp.data.data.count);
          setloader(false)
         } else{
            setloader(false)
          }
        }
      
    });
  };
  const Hendlestuts = (value,id) => {
    let obj = {
      user_id: localStorage.getItem("UserProduct_id"),
      product_id:id,
      status:value
    };
    Exportpurchaselist.purchaselistProductHendle(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data.message == "product deactive") {
          toast.success('Product  deactive successfully', {
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
        }else if(resp.data.message == " product active"){
          toast.success('Product  active successfully', {
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
  useEffect(() => {
    GetData();
  }, []);
  const hendlePagintion = (event, value) => {
    let obj = {
      "order": "desc",
      "limit": 10,
      user_id: localStorage.getItem("UserProduct_id"),
      "page": value
    }
    //EditProduct
    Exportpurchaselist.purchaselistProduct(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setData(resp.data.data.product);
          setcount(resp.data.data.count);
          setloader(false)
         } else{
            setloader(false)
          }
        }
      
    });
  }
  return (
    <div>
      <div>
        <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #dee2e6', paddingBottom:'15px', marginBottom:'40px'}}>Product List </Typography>
        <Grid container>
          <Grid sm={12} >
            <ArrowBackIcon className="back-icon-proact"
              onClick={() => Navigate("/UserList")}         
            />
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
        <Box>
          <Grid container>
            <Grid item xs={12}>
            <Box mt={4}>
              <TableContainer component={Paper} sx={{mb:2}} className="user-product-list-table user-list-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                    <StyledTableCell>View Product</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Data?.map((item, index) => {
                    return (
                      <TableRow>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{item.product_name}</StyledTableCell>
                        <StyledTableCell>
                          <ThemeProvider theme={theme}>
                            <Switch onChange={()=>Hendlestuts(!item.purchase_status,item.id)} checked={item.purchase_status==0?false:true}  />
                          </ThemeProvider>
                        </StyledTableCell>
                        {item.purchase_status=="0"?<StyledTableCell>Please Active Product</StyledTableCell>:  <StyledTableCell>
                          <Box component="span" onClick={() => {
                            localStorage.setItem(
                              "Product",
                              JSON.stringify(item)
                              );
                              setTimeout(() => {
                                Navigate("/UserList/module/active");
                              },200);
                          }}
                          style={{ color: "#0CB4D0", cursor: "pointer" }}>
                            <RemoveRedEyeIcon
                              sx={{
                                color: "#0CB4D0",
                                marginBottom: "10px",
                                fontSize: "28px",
                              }}
                              />
                            &nbsp; View
                          </Box>
                        </StyledTableCell>}                      
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </TableContainer>
              </Box>
              <Pagination sx={{mb:5}} onChange={hendlePagintion} count={Math.ceil(count / 10)} />
            </Grid>
          </Grid>
        </Box>
        </>}
      </div>
    </div>
  );
}
