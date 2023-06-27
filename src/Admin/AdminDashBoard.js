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
  const [loader, setloader] = useState(true);

  const GetData = () => {
    ExportDeshboard.getAllDeshbord()
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

  useEffect(() => {
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
    }   else if (
      today.getDate() === yesterday.getDate() + 1 &&
      today.getMonth() === yesterday.getMonth() &&
      today.getFullYear() === yesterday.getFullYear()
    ) {
      return "Tomorrow";
    }
     else {
      return date;
    }
  }

  return (
    <div id="main">
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #dee2e6', paddingBottom:'15px', marginBottom:'40px'}}>Admin Dashboard</Typography>
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
        <>
          <Grid container spacing={{xs:2, md:3, lg:5}}>
            <Grid item sm={4} xs={12}>
              <Box sx={{p:{xs:2, md:4}, display: "flex", flexWrap:"wrap", height:'100%', alignItems:'center', flexDirection:'column', justifyContent:'center', color: "white", backgroundColor: "#0CB4D0", borderRadius: "20% 0% 20% 0%"}}>
                <Typography sx={{ fontSize: {xs:'18px', md:'24px', lg:"28px"}, fontWeight: {xs:'500', md:"bold"} }}>Total User</Typography>
                <Typography sx={{ fontSize: {xs:'18px', md:'24px', lg:"48px"} }} mt={1}><PersonIcon sx={{ fontSize: {xs:'18px', sm:'36px', lg:'48px'}, verticalAlign:'baseline' }}  /> {ProductData?.total_user}</Typography>
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box sx={{p:{xs:2, md:4}, display: "flex", flexWrap:"wrap", height:'100%', alignItems:'center', flexDirection:'column', justifyContent:'center', color: "white", backgroundColor: " #097EAF", borderRadius: "20% 0% 20% 0%"}}>
                <Typography sx={{ fontSize: {xs:'18px', md:'24px', lg:"28px"}, fontWeight: {xs:'500', md:"bold"} }}>Total Product</Typography>
                <Typography sx={{ fontSize: {xs:'18px', md:'24px', lg:"48px"} }} mt={1}><Inventory2Icon sx={{fontSize: {xs:'18px', sm:'36px', lg:'48px'}, verticalAlign:'baseline'}}  />{ProductData?.product_count}</Typography>
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box sx={{p:{xs:2, md:4}, display: "flex", flexWrap:"wrap", height:'100%', alignItems:'center', flexDirection:'column', justifyContent:'center', color: "white", backgroundColor: "#233B77", borderRadius: "20% 0% 20% 0%"}}>
                <Typography sx={{ fontSize: {xs:'18px', md:'24px', lg:"28px"}, fontWeight: {xs:'500', md:"bold"} }}>Total Modules</Typography>
                <Typography sx={{ fontSize: {xs:'18px', md:'24px', lg:"48px"} }} mt={1}><ConnectWithoutContactIcon sx={{fontSize: {xs:'18px', sm:'36px', lg:'48px'}, verticalAlign:'baseline'}} /> {ProductData?.module_count}</Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container mt={5}>           
            <Grid className="table-grid-co" item xs={12}>

              <Grid container alignItems="center" mb={1}>
                <Grid item xs={6}>
                  <Typography className="ad-title-mb" fontSize={{xs:'20px', lg:'30px'}} sx={{fontWeight: "bold" }}>Call Book List</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="view-all-common"  onClick={() => {Navigate("/callList");}} sx={{color: "#0CB4D0", fontSize: {xs:'16px', lg:"20px"}, cursor: "pointer"}}>
                  <RemoveRedEyeIcon sx={{color: "#0CB4D0", verticalAlign:'baseline', fontSize: "20px"}} />View All List</Typography>
                </Grid>
              </Grid>

              <TableContainer className="table-com-ar" component={Paper}>
                <Table aria-label="customized table">

                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User Name </StyledTableCell>
                      <StyledTableCell>Date </StyledTableCell>
                      <StyledTableCell>Time</StyledTableCell>
                      <StyledTableCell>Call Type</StyledTableCell>
                      <StyledTableCell>Job Title</StyledTableCell>
                      <StyledTableCell>Contact Number</StyledTableCell>
                      <StyledTableCell>Notes</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {ProductData?.call_list?.map((row) => (
                      <StyledTableRow key={row.full_name}>
                        <StyledTableCell component="th" scope="row">{row.full_name}</StyledTableCell>
                        <StyledTableCell align="left">{isYesterday(row.date)}</StyledTableCell>
                        <StyledTableCell align="left">{row.time}</StyledTableCell>
                        <StyledTableCell align="left">{row.call_type == 1 ? "Purchase product" : row.call_type == 2 ? "Purchase modelus" : "Other reasion Type"}</StyledTableCell>
                        <StyledTableCell align="left">{row.jobtitle}</StyledTableCell>
                        <StyledTableCell align="left">{row.contact_number}</StyledTableCell>
                        <StyledTableCell align="left">{row.notes}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>


            <Grid className="overflow-hide" container mt={0} mb={5} spacing={5}>                  
              <Grid item lg={6} xs={12}>
                <Grid container alignItems="center" mb={1}>
                  <Grid item xs={6}>
                    <Typography className="ad-title-mb" fontSize={{xs:'20px', lg:'30px'}} sx={{fontWeight: "bold" }}>User List</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography variant="span" className="view-all-common" onClick={() => {Navigate("/UserList")}} sx={{color: "#0CB4D0", fontSize: {xs:'16px', lg:"20px"}, cursor: "pointer"}}>
                      <RemoveRedEyeIcon sx={{color: "#0CB4D0", verticalAlign:'baseline', fontSize: "20px"}} />View All List
                    </Typography>
                  </Grid>
                </Grid>
                
                <TableContainer className="user-product-list-table user-list-table" component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User Name </StyledTableCell>
                        <StyledTableCell>Email </StyledTableCell>
                        <StyledTableCell>Mobile</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ProductData?.userlist?.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                          <StyledTableCell align="left">{row.email}</StyledTableCell>
                          <StyledTableCell align="left">{row.mobile_number}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid className="product-table-ar" item lg={6} xs={12}>
                <Grid container alignItems="center" mb={1}>
                  <Grid item xs={6}>
                    <Typography className="ad-title-mb" fontSize={{xs:'20px', lg:'30px'}} sx={{fontWeight: "bold" }}>Product List</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography variant="span" className="view-all-common" onClick={() => {Navigate("/Productlist")}} sx={{color: "#0CB4D0", fontSize: {xs:'16px', lg:"20px"}, cursor: "pointer"}}>
                      <RemoveRedEyeIcon sx={{color: "#0CB4D0", verticalAlign:'baseline', fontSize: "20px"}} />View All List
                    </Typography>
                  </Grid>
                </Grid>

                <TableContainer className="user-product-list-table" component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Product Name </StyledTableCell>
                        <StyledTableCell align="left">Modules </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ProductData?.product?.map((row, i) => {
                        return i <= 4 ? (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.product_name}</StyledTableCell>
                            <StyledTableCell>{row.total_module}</StyledTableCell>
                          </StyledTableRow>
                        ) : null;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
