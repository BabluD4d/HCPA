import {
  FormGroup,
  Box,
  FormControl,
  Grid,
  TableRow,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import ExportDeshboard from "../Api/Admin/Deshboard/ExportDeshboard";
import { ColorRing } from "react-loader-spinner";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const moment = extendMoment(originalMoment);

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function AdminDashBoard() {
  const Navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const [ProductData2, setProductData2] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productModuleSold, setProductModuleSold] = useState([]);
  const [clientBy, setClientBy] = useState([]);
  const [staffBy, setStaffBy] = useState([]);
  const [moduleBy, setModuleBy] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [dashboardProducts, setDashboardProducts] = useState([]);
  const [filterData, setFilterData] = useState({
    product_pro_mod: [],
    product_client: [],
    product_meeting: [],
  });
  const [loader, setloader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState({
    product: false,
    client: false,
    meeting: false,
  });
  const [productId, setProductId] = useState(undefined);
  const [ProductDataList, setProductDataList] = useState([]);
  const [Data, setData] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [value, setValue] = useState(
    moment.range(moment().clone().subtract(2, "months"), moment().clone())
  );

  const GetData = () => {
    ExportDeshboard.getAllDeshbord()
      .then((resp) => {
        if (resp.data.msg == "Unauthenticated.") {
          localStorage.clear();
          Navigate("/");
        } else {
          if (resp.ok) {
            if (resp.data) {
              setProductData2(resp.data.data);
              // console.log(resp.data.data);
              setloader(false);
            } else {
              setloader(false);
            }
          }
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const GetDataList1 = (obj) => {
    ExportDeshboard.getAllDeshbordList1(obj)
      .then((resp) => {
        if (resp.data.msg == "Unauthenticated.") {
          localStorage.clear();
          Navigate("/");
        } else {
          if (resp.ok) {
            if (resp.data) {
              setProductData(resp.data.data);
              setloader(false);
            } else {
              setloader(false);
            }
          }
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const getProductList = () => {
    ExportDeshboard.getAllProducts()
      .then((res) => setProductList(res.data.data))
      .catch((error) => console.log(error));
  };

  // Get Sold Modules
  const getModuleSold = (filter, date_from, date_to) => {
    ExportDeshboard.getAllSoldModule(filter, date_from, date_to)
      .then((res) =>
      setProductModuleSold(res.data.data)
      )
      .catch((error) => console.log(error, "this is the error"));
  };

  // Get Sold Products
  const getProductSold = (filter, date_from, date_to) => {
    ExportDeshboard.getAllSoldProduct(filter, date_from, date_to)
      .then((res) => setProductModuleSold(res.data.data))
      .catch((error) => console.log(error, "this is the error"));
  };

  // Get Clients by products and modules
  const getClientBy = (filter, date_from, date_to) => {
    // console.log(filter, date_from, date_to, 'these are the data to pass...')
    ExportDeshboard.getAllClientBy(filter, date_from, date_to)
      .then((res) => setClientBy(res.data.data))
      .catch((error) => console.log(error, "this is the error"));
  };

  // Get Client List By ...
  const getListClientVia = (filter, date_from, date_to) => {
    // console.log(filter, date_from, date_to, 'these are the data to pass...')
    ExportDeshboard.getListClientBy(filter, date_from, date_to)
      .then((res) => setClientList(res.data.data.client))
      .catch((error) => console.log(error, "this is the error"));
  }; 

  // Get Staff by Type and Name
  const getStaffBy = (filter, date_from, date_to) => {
    ExportDeshboard.getAllStaffBy(filter, date_from, date_to)
      .then((res) => setStaffBy(res.data.data.client))
      .catch((error) => console.log(error, "this is the error"));
  };

  // Get Dashboard Products List
  const getDashboardProductList = () => {
    ExportDeshboard.getDashboardProducts().then((res)=>setDashboardProducts(res.data.data.product))
    .catch(error=>console.log(error, "this is the error"))
  }

// Get Modules by Product and Name
const getModuleBy = (filter) => {
  ExportDeshboard.getAllModulesBy(filter)
    .then((res) => setModuleBy(res.data.data.module))
    .catch((error) => console.log(error, "this is the error"));
};

  const getProductMeeting = (product_id, date_from, date_to) => {
    setIsClicked({ product: false, client: false, meeting: true });
    ExportDeshboard.getProductWiseMeeting(product_id, date_from, date_to)
      .then((res) => {
        console.log(res, "this is the res data...");
        setFilterData({ ...filterData, product_meeting: res.data.data });
      })
      .catch((error) => console.log(error, "this is the error"));
  };

  useEffect(() => {
    let obj = {
      date_from: value.start.format().split("T")[0],
      date_to: value.end.format().split("T")[0],
    };
    GetDataList1(obj);
    GetData();
    getProductList();
  }, []);

  function isYesterday(date) {
    const today = new Date(date);

    const yesterday = new Date();

    if (
      today.getDate() === yesterday.getDate() &&
      today.getMonth() === yesterday.getMonth() &&
      today.getFullYear() === yesterday.getFullYear()
    ) {
      return "Today";
    } else if (
      today.getDate() === yesterday.getDate() - 1 &&
      today.getMonth() === yesterday.getMonth() &&
      today.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else if (
      today.getDate() === yesterday.getDate() + 1 &&
      today.getMonth() === yesterday.getMonth() &&
      today.getFullYear() === yesterday.getFullYear()
    ) {
      return "Tomorrow";
    } else {
      return date;
    }
  }

  const onSelect = (value, states) => {
    let obj = {
      date_from: value.start.format().split("T")[0],
      date_to: value.end.format().split("T")[0],
    };
    setValue(value);
    // setTimeout(() => {
    //   setIsOpen(false);
    //   GetDataList1(obj);
    // });
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      console.log({ value });
      // props.dateChange(value);
    }
  };
  let obj = {
    order: "desc",
    sort: "products.id",
    // "limit": 10,
    // "page": 1
  };
  const GetDataProduct = () => {
    Exportproduct.GetAllProduct(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setProductDataList(resp.data.data);
          // setloader(false)
        } else {
          // setloader(false)
        }
      }
    });
  };
  useEffect(() => {
    if (Data.access[0].accessibility.AdminDashboard == "No") {
      Navigate("/Profile/Admin");
    }
    GetDataProduct();
  }, []);

  const controlDropdown = (e) => {
    // console.log(e.target, 'this is the e')
    e.target.classList.contains("clicked")
      ? e.target.classList.remove("clicked")
      : e.target.classList.add("clicked");
    e.target.nextElementSibling.classList.contains("shown")
      ? e.target.nextElementSibling.classList.remove("shown")
      : e.target.nextElementSibling.classList.add("shown");
  };


useEffect(()=>{
  getProductSold('Products', value.start.format().split("T")[0], value.end.format().split("T")[0]);
  getClientBy('Products', value.start.format().split("T")[0], value.end.format().split("T")[0]);
  getListClientVia('Products', value.start.format().split("T")[0], value.end.format().split("T")[0]);
  getStaffBy('Type', value.start.format().split("T")[0], value.end.format().split("T")[0]);
  getDashboardProductList();
  getModuleBy('Modules')
},[])

  return (
    <div id="main">
      <Typography
        className="main-title-ad"
        fontSize={{ xs: "20px", lg: "30px" }}
        sx={{
          borderBottom: "1px solid #bbb5b5",
          paddingBottom: "15px",
          marginBottom: "40px",
        }}
      >
        Admin Dashboard
      </Typography>
      {loader ? (
        <div style={{ marginTop: "24%" }}>
          <center>
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
      ) : (
        <div style={{ position: "relative", marginBottom: "60px" }}>
          <Grid container spacing={2}>
            <Grid item sm={5} xs={12} pt={4}><h3>OVERVIEW</h3></Grid>
            <Grid item sm={7} xs={12} pt={4} sx={{mb:{xs:2, sm:0}}} textAlign="right">
                <div style={{display: "inline-flex", justifyContent:'flex-end'}}>
                  <Box sx={{width: '330px', cursor: "pointer", m:{xs:'auto', sm:'initial'}, ml:{sm:'auto'}}} onClick={onToggle}>
                    <CalendarMonthIcon style={{ marginTop: "-10px", marginRight: "5px" }} />
                    {`Date Range :  ${value.start.format("DD MMM  YYYY")} - ${value.end.format("DD MMM  YYYY")}`}
                  </Box>
                {isOpen && (
                  <Box className="date-range" sx={{m:{xs:'auto'}, left:{xs:0, sm:'auto'}, right:{xs:0, sm:'auto'}, top:{xs:'110px', sm:'55px'}, maxWidth:'330px'}} style={{position: "absolute", border: '1px solid #e0e0e0', borderRadius: '5px', zIndex: "1", backgroundColor: "#fff"}}>
                    <DateRangePicker value={value} onSelect={onSelect} singleDateRange={false} rangeColors={["#f33e5b", "#3ecf8e", "#fed14c"]} />
                  </Box>
                )}
                </div>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4} sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}>
              <FormControl fullWidth sx={{justifyContent: "space-between", width: "100%", flexDirection: "row", alignItems: "center", marginBottom: "5px", border: "1px solid #e0e0e0", borderRadius: "5px", position: "relative"}}>
                <Box className="dashboard-custom-dropdown">
                  Products Sold {ProductData?.purchase_count}
                  <KeyboardArrowDownIcon sx={{ color: "white", pointerEvents: "none" }} />
                  <Box className="dashboard-custom-dropdown-items">
                    <List sx={{backgroundColor: "#233b77", zIndex: 9, overflowY: "auto", height: "80px", borderRadius: "0 0 5px 5px"}}>
                      {
                        <>
                          <ListItem
                            disablePadding
                            sx={{ color: "#ffffff" }}
                            onClick={(e) => getProductSold('Products', value.start.format().split("T")[0], value.end.format().split("T")[0])}
                          >
                            <ListItemButton>Products Sold</ListItemButton>
                          </ListItem>
                          <ListItem disablePadding sx={{ color: "#ffffff" }} onClick={(e) => getModuleSold('Modules', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                            <ListItemButton>Modules Sold</ListItemButton>
                          </ListItem>
                        </>
                      }
                    </List>
                  </Box>
                </Box>

              </FormControl>

              <FormGroup sx={{border: "1px solid #e0e0e0", borderRadius: "5px", background: "#ffffff", height: "200px", overflowY: "auto", display: "block"}}>
                {
                  productModuleSold.length > 0 ? (
                    productModuleSold.map((val, i) => {
                      return (<Box key={i} sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>{val.name + ' ' + val.total}</Box>);
                    })
                  ) : (
                    <Box sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>Data not found</Box>
                  )
                }
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <FormControl
                fullWidth
                sx={{justifyContent: "space-between", width: "100%", flexDirection: "row", alignItems: "center", marginBottom: "5px", border: "1px solid #e0e0e0", borderRadius: "5px", position: "relative"}}>
                <Box className="dashboard-custom-dropdown">
                  New Clients Added {ProductData?.user_count}
                  <KeyboardArrowDownIcon sx={{ color: "white", pointerEvents: "none" }} />
                  <Box className="dashboard-custom-dropdown-items">
                    <List sx={{backgroundColor: "#233b77", zIndex: 9, overflowY: "auto", height: "80px", borderRadius: "0 0 5px 5px"}}>
                      {
                        <>
                          <ListItem disablePadding sx={{ color: "#ffffff" }} onClick={()=>getClientBy('Products', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                            <ListItemButton>New Clients Added by Products</ListItemButton>
                          </ListItem>
                          <ListItem disablePadding sx={{ color: "#ffffff" }} onClick={()=>getClientBy('Modules', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                            <ListItemButton>New Clients Added by Modules</ListItemButton>
                          </ListItem>
                        </>
                      }
                    </List>
                  </Box>
                </Box>
              </FormControl>
              <FormGroup sx={{border: "1px solid #e0e0e0", borderRadius: "5px", background: "#ffffff", height: "200px", overflowY: "auto", display: "block"}}>
                {
                  clientBy.length > 0 ? (
                    clientBy.map((val, i) => {
                      return (<Box key={i} sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>{val.name+" "+val.total}</Box>);
                    })
                  ) : (
                    <Box sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>Data not found</Box>
                  )
                }
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
            <FormControl
                fullWidth
                sx={{justifyContent: "space-between", width: "100%", flexDirection: "row", alignItems: "center", marginBottom: "5px", border: "1px solid #e0e0e0", borderRadius: "5px", position: "relative"}}>
                <Box className="dashboard-custom-dropdown">
                  Meeting Booked {ProductData?.bookcall_count}
                  <KeyboardArrowDownIcon sx={{ color: "white", pointerEvents: "none" }} />
                  <Box className="dashboard-custom-dropdown-items">
                    <List sx={{backgroundColor: "#233b77", zIndex: 9, overflowY: "auto", height: "120px", borderRadius: "0 0 5px 5px"}}>
                      {productList &&
                        productList.map((product) => (
                          <ListItem
                            disablePadding
                            id={`${product.product_id}`}
                            sx={{ color: "#ffffff" }}
                            key={product.product_id}
                            className={`${product.product_id == productId? "selected-product": ""}`}
                            onClick={(e) => {
                              setProductId(e.target.id);
                              getProductMeeting(
                                product.product_id,
                                value.start.format().split("T")[0],
                                value.end.format().split("T")[0]
                              );
                            }}
                          >
                            <ListItemButton id={`${product.product_id}`}>{product.product_name}</ListItemButton>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </Box>
              </FormControl>
              <FormGroup sx={{border: "1px solid #e0e0e0", borderRadius: "5px", background: "#ffffff", height: "200px", overflowY: "auto", display: "block"}}>
                {
                isClicked.meeting ? (
                  filterData.product_meeting.length > 0 ? (
                    filterData.product_meeting.map((val, i) => (
                      <Box
                      key={i}
                        sx={{
                          textTransform: "capitalize",
                          mb: 1,
                          flex: "0 0 100%",
                          maxWidth: "100%",
                        }}
                      >
                        {val.call_type == 1 && "Purchase Product: " + val.total}
                        {val.call_type == 2 && "Purchase Module: " + val.total}
                        {val.call_type == 3 && "Other Reasion: " + val.total}
                      </Box>
                    ))
                  ) : (
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        padding: "8px 15px",
                      }}
                    >
                      Data not found
                    </Box>
                  )
                ) : (
                  ProductData?.bookcall?.map((val, i) => {
                    return (
                      <Box
                      key={i}
                        sx={{
                          textTransform: "capitalize",
                          // mb: 1,
                          flex: "0 0 100%",
                          maxWidth: "100%",
                          padding: "8px 15px",
                        }}
                      >
                        {val.call_type == 1
                          ? "Purchase product"
                          : val.call_type == 2
                          ? "Purchase Modules"
                          : "Other reasion"}{" "}
                        {"  " + "  " + val.total}
                      </Box>
                    );
                  })
                )}
              </FormGroup>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ marginBlock: "60px", borderBottom: "0.5px solid #bbb5b5" }}
          ></Grid>

          <Grid container spacing={{ xs: 2, md: 3, lg: 5 }} mt={5}>
            <Grid
              item
              lg={6}
              xs={12}
              sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
            >
              <h4>Client</h4>
              <FormControl
                fullWidth
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "5px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <Box className="dashboard-custom-dropdown" sx={{ backgroundColor: "#0CB4D0" }}>
                  All Clients {ProductData2?.clientcount}
                  <KeyboardArrowDownIcon sx={{ color: "white", pointerEvents: "none" }} />
                  <Box className="dashboard-custom-dropdown-items light-blue">
                    <List sx={{backgroundColor: "#0CB4D0", zIndex: 9, overflowY: "auto", height: "80px", borderRadius: "0 0 5px 5px"}}>
                      <ListItem disablePadding onClick={()=>getListClientVia('Products', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                        <ListItemButton>All Clients by Products</ListItemButton>
                      </ListItem>
                      <ListItem disablePadding onClick={()=>getListClientVia('Modules', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                        <ListItemButton>All Clients by Modules</ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Box>

              </FormControl>

              <FormGroup
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  background: "#ffffff",
                  height: "200px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                {
                  // isClicked.product ? (
                    clientList !== undefined && clientList.length > 0 ? (
                    clientList.map((val, i) => {
                      return (
                        <Box
                          key={i}
                          sx={{
                            textTransform: "capitalize",
                            flex: "0 0 100%",
                            maxWidth: "100%",
                            padding: "8px 15px",
                          }}
                        >
                          {`${val.name}  ${val.total}`}
                        </Box>
                      );
                    })
                  ) : (
                    <Box sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>Data not found</Box>
                  )
                  // ) : (
                  //   ProductData2?.client?.map((val, i) => {
                  //     return (
                  //       <Box
                  //         sx={{
                  //           textTransform: "capitalize",
                  //           flex: "0 0 100%",
                  //           maxWidth: "100%",
                  //           padding: "8px 15px",
                  //         }}
                  //       >
                  //         {`${val.product_name}  ${val.total}`}
                  //       </Box>
                  //     );
                  //   })
                  // )
                }
              </FormGroup>
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
            >
              <h4>HCPA Staff</h4>
              <FormControl
                fullWidth
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "5px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <Box className="dashboard-custom-dropdown" sx={{ backgroundColor: "#0CB4D0" }}>
                  All HCPA Staff {ProductData2?.staffcount}
                  <KeyboardArrowDownIcon sx={{ color: "white", pointerEvents: "none" }} />

                  <Box className="dashboard-custom-dropdown-items light-blue">
                    <List sx={{backgroundColor: "#0CB4D0", zIndex: 9, overflowY: "auto", height: "80px", borderRadius: "0 0 5px 5px"}}>
                      <ListItem disablePadding onClick={()=>getStaffBy('Type', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                        <ListItemButton>
                          All HCPA Staff by Staff Type
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding onClick={()=>getStaffBy('Name', value.start.format().split("T")[0], value.end.format().split("T")[0])}>
                        <ListItemButton>
                          All HCPA Staff by Staff Name
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </FormControl>
              <FormGroup
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  background: "#ffffff",
                  height: "200px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                {
                  staffBy.length > 0 ? (
                    staffBy.map((val, i) => {
                      return (
                        <Box
                        key={i}
                          sx={{
                            textTransform: "capitalize",
                            flex: "0 0 100%",
                            maxWidth: "100%",
                            padding: "8px 15px",
                          }}
                        >
                          {`${val.name}  ${val.total ? val.total : ''}`}
                        </Box>
                      );
                    })
                  ) : (
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        padding: "8px 15px",
                      }}
                    >
                      Data not found
                    </Box>
                  )
                }
              </FormGroup>
            </Grid>

            <Grid
              item
              lg={6}
              xs={12}
              sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
            >
              <h4>Products</h4>
              <FormControl
                fullWidth
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "5px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <Box className="dashboard-custom-dropdown" sx={{ backgroundColor: "#0CB4D0" }}>
                  All Product {ProductData2?.productscount}
                </Box>
              </FormControl>
              <FormGroup sx={{border: "1px solid #e0e0e0", borderRadius: "5px", background: "#ffffff", height: "200px", overflowY: "auto", display: "block"}}>
                {
                  dashboardProducts.length > 0 ? (
                    dashboardProducts.map((val, i) => {
                      return (<Box key={i} sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>{val.product_name}</Box>);
                    })
                  ) : (
                    <Box sx={{textTransform: "capitalize", flex: "0 0 100%", maxWidth: "100%", padding: "8px 15px"}}>Data not found</Box>
                  )
                }
              </FormGroup>
            </Grid>

            <Grid
              item
              lg={6}
              xs={12}
              sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
            >
              <h4>Modules</h4>
              <FormControl
                fullWidth
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "5px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <Box className="dashboard-custom-dropdown" sx={{ backgroundColor: "#0CB4D0" }}>
                  All Modules {ProductData2?.modulecount}
                  <KeyboardArrowDownIcon sx={{ color: "white", pointerEvents: "none" }} />
                  <Box className="dashboard-custom-dropdown-items light-blue">
                    <List
                      sx={{
                        backgroundColor: "#0CB4D0",
                        zIndex: 9,
                        overflowY: "auto",
                        height: "80px",
                        borderRadius: "0 0 5px 5px",
                      }}
                    >
                      <ListItem disablePadding onClick={()=>getModuleBy('Products')}>
                        <ListItemButton>All Modules by Products</ListItemButton>
                      </ListItem>
                      <ListItem disablePadding onClick={()=>getModuleBy('Modules')}>
                        <ListItemButton>All Modules by Name</ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Box>

              </FormControl>
              <FormGroup
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  background: "#ffffff",
                  height: "200px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                {
                  moduleBy.length > 0 ? (
                    moduleBy.map((val, i) => {
                      return (
                        <Box
                        key={i}
                          sx={{
                            textTransform: "capitalize",
                            flex: "0 0 100%",
                            maxWidth: "100%",
                            padding: "8px 15px",
                          }}
                        >
                          {val.name}
                        </Box>
                      );
                    })
                  ) : (
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        padding: "8px 15px",
                      }}
                    >
                      Data not found
                    </Box>
                  )
                }
              </FormGroup>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
