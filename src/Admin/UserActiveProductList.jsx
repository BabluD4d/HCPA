import React, { useEffect, useState } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Table } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import Exportpurchaselist from "../Api/Admin/purchaselist/Exportpurchaselist";
import { ColorRing } from "react-loader-spinner";
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
        console.log(resp.data.data);
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
    console.log(value)
    Exportpurchaselist.purchaselistProductHendle(obj).then((resp) => {
      if (resp.ok) {
        console.log(resp.data);
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
        console.log(resp.data.data);
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
        {" "}
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
          Product List
        </Typography>
        <hr height={3} />
        <Grid container mt={2}>
          <Grid xl={3}>
            <ArrowBackIcon
              onClick={() => Navigate("/UserList")}
              style={{ color: "#0cb4d0", fontSize: "50px" }}
            />
          </Grid>
          <Grid xl={6}></Grid>
          <Grid xl={3}></Grid>
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
                    <th>Product Name</th>
                    {/* <th>Modules</th> */}
                    <th>Action</th>
                    <th>View Product</th>
                  </tr>
                </thead>
                <tbody>
                  {Data?.map((item, index) => {
                    // console.log(typeof item.purchase_status)
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.product_name}</td>
                        {/* <td>{item.total_module}</td> */}
                        <td>
                          {" "}
                          <ThemeProvider theme={theme}>
                            {/* <Switch onChange={()=>props?.onChangeHendle(props.item)}  checked={props.status=="true"?true:false}    /> */}
                            <Switch onChange={()=>Hendlestuts(!item.purchase_status,item.id)} checked={item.purchase_status==0?false:true}  />
                          </ThemeProvider>
                        </td>
                        {item.purchase_status=="0"?<td>Please Active Product</td>:  <td
                          onClick={() => {
                            localStorage.setItem(
                              "Product",
                              JSON.stringify(item)
                              );
                              setTimeout(() => {
                                Navigate("/UserList/module/active");
                              },200);
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
                        </td>}
                      
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination onChange={hendlePagintion} count={Math.ceil(count / 10)} />
              {/* <Pagination /> */}
            </Grid>
            <Grid item mt={-3} xs={2}>
              {" "}
            </Grid>
          </Grid>
        </Box>
        </>}
      </div>
    </div>
  );
}
