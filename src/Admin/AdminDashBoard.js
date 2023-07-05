import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import Exportproduct from "../Api/Admin/Product/Exportproduct";
import ExportDeshboard from "../Api/Admin/Deshboard/ExportDeshboard";
import { ColorRing } from "react-loader-spinner";
import { error } from "jquery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  const [loader, setloader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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
              console.log(resp.data.data)
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
    console.log(value.start.format().split("T")[0])
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

  useEffect(() => {
    let obj = {
      date_from: value.start.format().split("T")[0],
      date_to:value.end.format().split("T")[0],
    };
    GetDataList1(obj);
    GetData();
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
      date_to:value.end.format().split("T")[0],
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
        <div style={{ position: "relative",marginBottom:"60px" }}>
          <Grid container spacing={{ xs: 2, md: 3, lg: 5 }}>
            <Grid container>
              <Grid item sm={8} xs={12} pt={4} pl={5}>
                <h3>OVERVIEW</h3>
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
                      />
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#233b77", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Products Sold {    "     "+ProductData?.purchase_count} </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"190px",overflow:"auto"}}>
                  {ProductData?.purchase?.map((val,i)=>{
                 return <Typography>
                  {val.product_name } {"  "+"  "+val.total}
                  
                  </Typography>

                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#233b77", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>New Clients Added {    "     "+ProductData?.user_count}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"190px",overflow:"auto"}}>
                {ProductData?.user?.map((val,i)=>{
                 return <Typography>
                  {val.name } 
                 
                  </Typography>

                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{ backgroundColor: "#233b77", color: "white" }}
                  expandIcon={<KeyboardArrowUpIcon sx={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Meeting Booked {    "     "+ProductData?.bookcall_count}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"190px",overflow:"auto"}}>
                {ProductData?.bookcall?.map((val,i)=>{
                 return <Typography>
                  {val.call_type==1?"Purchase product" :val.call_type==2?"Purchase Modules":"Other reasion"} {"  "+"  "+val.total}
                  </Typography>

                  })}
                </AccordionDetails>
              </Accordion>
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
                  <Typography>All Clients {    "     "+ProductData2?.clientcount} </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"320px",overflow:"auto"}}>
                {ProductData2?.client?.map((val,i)=>{
                 return <Typography>
                  {val.product_name } {"  "+"  "+val.total}
                  <hr/>
                  </Typography>

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
                  <Typography>All HCPA Staff {    "     "+ProductData2?.staffcount} </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"320px",overflow:"auto"}}>
                {ProductData2?.staff?.map((val,i)=>{
                 return <Typography>
                  {val.role_name } {"  "+"  "+val.total}
                  <hr/>
                  </Typography>

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
                  <Typography>All Product {    "     "+ProductData2?.productscount} </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"320px",overflow:"auto"}}>
                     {ProductData2?.product?.map((val,i)=>{
                 return <Typography>
                  {val.product_name } 
                  <hr/>
                  </Typography>

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
                  <Typography>All Modules {    "     "+ProductData2?.modulecount} </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{height:"320px",overflow:"auto"}}>
                     {ProductData2?.module?.map((val,i)=>{
                 return <Typography>
                  {val.product_name } {"  "+"  "+val.total_module}
                  <hr/>
                  </Typography>

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
