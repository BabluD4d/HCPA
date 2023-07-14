import {
  FormGroup,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import ExportDeshboard from "../Api/Admin/Deshboard/ExportDeshboard";
import { ColorRing } from "react-loader-spinner";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  const [filterData, setFilterData] = useState({
    product_module: [],
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
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
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
    // console.log(value.start.format().split("T")[0], 'hhhh');
    ExportDeshboard.getAllDeshbordList1(obj)
      .then((resp) => {
        if (resp.data.msg == "Unauthenticated.") {
          localStorage.clear();
          Navigate("/");
        } else {
          if (resp.ok) {
            if (resp.data) {
              setProductData(resp.data.data);
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

  const getProductList = () => {
    ExportDeshboard.getAllProducts()
      .then((res) => setProductList(res.data.data))
      .catch((error) => console.log(error));
  };

  const getProductModule = (product_id, date_from, date_to) => {
    setIsClicked({ product: true, client: false, meeting: false });
    ExportDeshboard.getProductWiseModule(product_id, date_from, date_to)
      .then((res) =>
        setFilterData({ ...filterData, product_module: res.data.data })
      )
      .catch((error) => console.log(error, "this is the error"));
  };

  const getProductClient = (product_id, date_from, date_to) => {
    setIsClicked({ product: false, client: true, meeting: false });
    ExportDeshboard.getProductWiseClient(product_id, date_from, date_to)
      .then((res) =>
        setFilterData({ ...filterData, product_client: res.data.data })
      )
      .catch((error) => console.log(error, "this is the error"));
  };

  const getProductMeeting = (product_id, date_from, date_to) => {
    console.log(product_id, date_from, date_to, "client data is shere...");
    setIsClicked({ product: false, client: false, meeting: true });
    ExportDeshboard.getProductWiseMeeting(product_id, date_from, date_to)
      .then((res) => {
        console.log(res, 'this is the res data...')
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
    setTimeout(() => {
      setIsOpen(false);
      GetDataList1(obj);
    });
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
    e.target.classList.contains("clicked")
      ? e.target.classList.remove("clicked")
      : e.target.classList.add("clicked");
    e.target.nextElementSibling.classList.contains("shown")
      ? e.target.nextElementSibling.classList.remove("shown")
      : e.target.nextElementSibling.classList.add("shown");
  };

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
          <Grid container>
            <Grid item sm={2} xs={12} pt={4} pl={5}>
              <h3>OVERVIEW</h3>
            </Grid>
            <Grid item sm={3} xs={12} pt={2} pl={5}>
              {/* <FormControl mt={3} variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Product Type
                </InputLabel>
                <Select
                  // disabled={localStorage.getItem("role") == 1?false:true}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Product"
                  name="role_id"
                  // onChange={formik.handleChange}
                  // value={formik.values.role_id}
                  // onBlur={formik.handleBlur}
                  autoComplete="current-number"
                  // onChange={handleChange}
                >
                  {ProductDataList?.map((val, i) => (
                    <MenuItem value={val.id}>{val.product_name}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            </Grid>
            <Grid item sm={3} xs={12} pt={2} pl={5}>
              {/* <FormControl mt={3} variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Module Type
                </InputLabel>
                <Select
                  // disabled={localStorage.getItem("role") == 1?false:true}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Product"
                  name="role_id"
                  // onChange={formik.handleChange}
                  // value={formik.values.role_id}
                  // onBlur={formik.handleBlur}
                  autoComplete="current-number"
                  // onChange={handleChange}
                >
                  {ProductDataList?.map((val, i) => (
                    <MenuItem value={val.id}>{val.product_name}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            </Grid>
            <Grid item sm={4} pt={4} xs={12}>
              <div>
                <div
                  style={{
                    display: "flex",
                    width: "fit-content",
                    cursor: "pointer",
                  }}
                  onClick={onToggle}
                >
                  <h4>
                    <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                      <CalendarMonthIcon
                        style={{ marginTop: "-10px", marginRight: "5px" }}
                      />
                      {" " + " " + "Date Range : "}
                      {value.start.format("DD MMM  YYYY")}
                      {" - "}
                      {value.end.format("DD MMM  YYYY")}
                    </div>
                  </h4>
                  {/* {isOpen && (<button className="date-apply button" onClick={onToggle}>Apply</button>)} */}
                </div>
                {isOpen && (
                  <div
                    className="date-range"
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      backgroundColor: "#fff",
                    }}
                  >
                    <DateRangePicker
                      value={value}
                      onSelect={onSelect}
                      singleDateRange={false}
                      rangeColors={["#f33e5b", "#3ecf8e", "#fed14c"]}
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid
              item
              xs="12"
              md={6}
              lg={4}
              sx={{ boxShadow: "0px 10px 30px -5px #e0e0e0" }}
            >
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
                <Box
                  className="dashboard-custom-dropdown"
                  onClick={(e) => {
                    controlDropdown(e);
                  }}
                >
                  Products Sold {ProductData?.purchase_count}{" "}
                  <KeyboardArrowDownIcon sx={{ color: "white" }} />
                </Box>

                <Box className="dashboard-custom-dropdown-items">
                  <List
                    sx={{
                      backgroundColor: "#ffffff",
                      zIndex: 9,
                      overflowY: "auto",
                      height: "250px",
                    }}
                  >
                    {productList &&
                      productList.map((product) => (
                        <ListItem
                          disablePadding
                          id={`${product.product_id}`}
                          key={product.product_id}
                          className={`${
                            product.product_id == productId
                              ? "selected-product"
                              : ""
                          }`}
                          onClick={(e) => {
                            setProductId(e.target.id);
                            getProductModule(
                              product.product_id,
                              value.start.format().split("T")[0],
                              value.end.format().split("T")[0]
                            );
                          }}
                        >
                          <ListItemButton id={`${product.product_id}`}>
                            {product.product_name}
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </FormControl>

              <FormGroup
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  padding: "10px 15px",
                  background: "#ffffff",
                  height: "200px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                {isClicked.product ? (
                  filterData?.product_module.length > 0 ? (
                    filterData.product_module.map((val, i) => {
                      return (
                        <Box
                          sx={{
                            textTransform: "capitalize",
                            mb: 1,
                            flex: "0 0 100%",
                            maxWidth: "100%",
                          }}
                        >
                          {`${val.module_name}  ${val.total}`}
                        </Box>
                      );
                    })
                  ) : (
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        mb: 1,
                        flex: "0 0 100%",
                        maxWidth: "100%",
                      }}
                    >
                      Data not found
                    </Box>
                  )
                ) : (
                  ProductData?.purchase?.map((val, i) => {
                    return (
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          mb: 1,
                          flex: "0 0 100%",
                          maxWidth: "100%",
                        }}
                      >
                        {`${val.product_name}  ${val.total}`}
                      </Box>
                    );
                  })
                )}
              </FormGroup>
            </Grid>
            <Grid item sm={4} xs={12}>
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
                <Box
                  className="dashboard-custom-dropdown"
                  onClick={(e) => {
                    controlDropdown(e);
                  }}
                >
                  New Clients Added {ProductData?.user_count}{" "}
                  <KeyboardArrowDownIcon sx={{ color: "white" }} />
                </Box>
                <Box className="dashboard-custom-dropdown-items">
                  <List
                    sx={{
                      backgroundColor: "#ffffff",
                      zIndex: 9,
                      overflowY: "auto",
                      height: "250px",
                    }}
                  >
                    {productList &&
                      productList.map((product) => (
                        <ListItem
                          disablePadding
                          id={`${product.product_id}`}
                          key={product.product_id}
                          className={`${
                            product.product_id == productId
                              ? "selected-product"
                              : ""
                          }`}
                          onClick={(e) => {
                            setProductId(e.target.id);
                            getProductClient(
                              product.product_id,
                              value.start.format().split("T")[0],
                              value.end.format().split("T")[0]
                            );
                          }}
                        >
                          <ListItemButton id={`${product.product_id}`}>
                            {product.product_name}
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </FormControl>
              <FormGroup
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  padding: "10px 15px",
                  background: "#ffffff",
                  height: "200px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                {isClicked.client ? (
                  filterData.product_client.length > 0 ? (
                    filterData.product_client.map((val, i) => {
                      return (
                        <Box
                          sx={{
                            textTransform: "capitalize",
                            mb: 1,
                            flex: "0 0 100%",
                            maxWidth: "100%",
                          }}
                        >
                          {`${val.name}`}
                        </Box>
                      );
                    })
                  ) : (
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        mb: 1,
                        flex: "0 0 100%",
                        maxWidth: "100%",
                      }}
                    >
                      Data not found
                    </Box>
                  )
                ) : (
                  ProductData?.user?.map((val, i) => {
                    return (
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          mb: 1,
                          flex: "0 0 100%",
                          maxWidth: "100%",
                        }}
                      >
                        {val.name}
                      </Box>
                    );
                  })
                )}
              </FormGroup>
            </Grid>

            <Grid item sm={4} xs={12}>
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
                <Box
                  className="dashboard-custom-dropdown"
                  onClick={(e) => {
                    controlDropdown(e);
                  }}
                >
                  Meeting Booked {ProductData?.bookcall_count}{" "}
                  <KeyboardArrowDownIcon sx={{ color: "white" }} />
                </Box>
                <Box className="dashboard-custom-dropdown-items">
                  <List
                    sx={{
                      backgroundColor: "#ffffff",
                      zIndex: 9,
                      overflowY: "auto",
                      height: "250px",
                    }}
                  >
                    {productList &&
                      productList.map((product) => (
                        <ListItem
                          disablePadding
                          id={`${product.product_id}`}
                          key={product.product_id}
                          className={`${
                            product.product_id == productId
                              ? "selected-product"
                              : ""
                          }`}
                          onClick={(e) => {
                            setProductId(e.target.id);
                            getProductMeeting(
                              product.product_id,
                              value.start.format().split("T")[0],
                              value.end.format().split("T")[0]
                            );
                          }}
                        >
                          <ListItemButton id={`${product.product_id}`}>
                            {product.product_name}
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </FormControl>
              <FormGroup
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                  padding: "10px 15px",
                  background: "#ffffff",
                  height: "200px",
                  overflowY: "auto",
                  display: "block",
                }}
              >
                {isClicked.meeting ? (
                  filterData.product_meeting.length > 0 ? (
                    filterData.product_meeting.map((val, i) => (
                      <Box sx={{textTransform: "capitalize",mb: 1,flex: "0 0 100%",maxWidth: "100%"}}>
                        {val.call_type == 1 && 'Purchase Product: ' + val.total}
                        {val.call_type == 2 && 'Purchase Module: ' + val.total}
                        {val.call_type == 3 && 'Other Reasion: ' + val.total}
                      </Box>
                    ))
                  ) : (
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        mb: 1,
                        flex: "0 0 100%",
                        maxWidth: "100%",
                      }}
                    >
                      Data not found
                    </Box>
                  )
                ) : (
                  ProductData?.bookcall?.map((val, i) => {
                    return (
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          mb: 1,
                          flex: "0 0 100%",
                          maxWidth: "100%",
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
            <Grid className="product-table-ar" item lg={6} xs={12}>
              <h4>Clients</h4>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#0CB4D0", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    All Clients {"     " + ProductData2?.clientcount}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ height: "320px", overflow: "auto" }}>
                  {ProductData2?.client?.map((val, i) => {
                    return (
                      <Typography>
                        {val.product_name} {"  " + "  " + val.total}
                        <hr />
                      </Typography>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid className="product-table-ar" item lg={6} xs={12}>
              <h4>HCPA Staff</h4>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#0CB4D0", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    All HCPA Staff {"     " + ProductData2?.staffcount}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ height: "320px", overflow: "auto" }}>
                  {ProductData2?.staff?.map((val, i) => {
                    return (
                      <Typography>
                        {val.role_name} {"  " + "  " + val.total}
                        <hr />
                      </Typography>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid className="product-table-ar" item lg={6} xs={12}>
              <h4>Products</h4>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#0CB4D0", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    All Product {"     " + ProductData2?.productscount}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ height: "320px", overflow: "auto" }}>
                  {ProductData2?.product?.map((val, i) => {
                    return (
                      <Typography>
                        {val.product_name}
                        <hr />
                      </Typography>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid className="product-table-ar" item lg={6} xs={12}>
              <h4>Modules</h4>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#0CB4D0", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    All Modules {"     " + ProductData2?.modulecount}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ height: "320px", overflow: "auto" }}>
                  {ProductData2?.module?.map((val, i) => {
                    return (
                      <Typography>
                        {val.product_name} {"  " + "  " + val.total_module}
                        <hr />
                      </Typography>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
