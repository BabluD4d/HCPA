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
  // let obj={
  //   "order":"desc",
  //     "sort":"products.id",
  //     "limit":10,
  //     "page" :1
  // }
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
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Admin DashBoard
      </Typography>
      <hr height={3} />
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
          <Grid container mt={5}>
            <Grid item md={3} xl={3.5} sm={12} xs={12} m={3}>
              <Box
                sx={{
                  color: "white",
                  backgroundColor: "#0CB4D0",
                  borderRadius: "20% 0% 20% 0%",
                }}
              >
                <center>
                  <Typography
                    pt={4}
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    Total User
                  </Typography>
                </center>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    {/* <Typography mt={2} mb={1} ml={5}>
                  <PersonIcon sx={{ fontSize: "45px" }} />{" "}
                </Typography> */}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography mt={3} mb={1} ml={5}>
                      <PersonIcon sx={{ fontSize: "45px" }} />{" "}
                    </Typography>
                  </Grid>
                  <Typography mt={3} sx={{ fontSize: "48px" }}>
                    {ProductData?.total_user}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={3} xl={3.5} sm={12} xs={12} m={3}>
              <Box
                sx={{
                  color: "white",
                  backgroundColor: " #097EAF",
                  borderRadius: "20% 0% 20% 0%",
                }}
              >
                <center>
                  <Typography
                    pt={4}
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    Total Product
                  </Typography>
                </center>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    {/* <Typography mt={2} mb={1} ml={5}>
                  <PersonIcon sx={{ fontSize: "45px" }} />{" "}
                </Typography> */}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography mt={3} mb={1} ml={5}>
                      <Inventory2Icon sx={{ fontSize: "45px" }} />{" "}
                    </Typography>
                  </Grid>
                  <Typography mt={3} sx={{ fontSize: "48px" }}>
                    {ProductData?.product_count}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={3} xl={3.5} sm={12} xs={12} m={3}>
              <Box
                sx={{
                  color: "white",
                  backgroundColor: "#233B77",
                  borderRadius: "20% 0% 20% 0%",
                }}
              >
                <center>
                  <Typography
                    pt={4}
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    Total Modules
                  </Typography>
                </center>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    {/* <Typography mt={2} mb={1} ml={5}>
                  <PersonIcon sx={{ fontSize: "45px" }} />{" "}
                </Typography> */}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography mt={3} mb={1} ml={5}>
                      <ConnectWithoutContactIcon sx={{ fontSize: "45px" }} />{" "}
                    </Typography>
                  </Grid>
                  <Typography mt={3} sx={{ fontSize: "48px" }}>
                    {ProductData?.module_count}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid container mt={5}>
            <Grid item ml={3} mr={3} md={11} lg={11} xl={11.4} sm={12} xs={12}>
              <Grid container mt={5}>
                <Grid item xs={8}>
                  <Typography
                    pt={4}
                    mb={2}
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    Call Book List
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    onClick={() => {
                      Navigate("/callList");
                    }}
                    mt={4}
                    sx={{
                      color: "#0CB4D0",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <RemoveRedEyeIcon
                      sx={{
                        color: "#0CB4D0",
                        marginBottom: "10px",
                        fontSize: "28px",
                      }}
                    />{" "}
                    View All List
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User Name </StyledTableCell>
                      <StyledTableCell align="left">Date </StyledTableCell>
                      <StyledTableCell align="left">Time</StyledTableCell>
                      <StyledTableCell align="left">Call Type</StyledTableCell>
                      <StyledTableCell align="left">Job Title</StyledTableCell>
                      <StyledTableCell align="left">
                        Contact Number
                      </StyledTableCell>
                      <StyledTableCell align="left">Notes</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ProductData?.call_list?.map((row) => (
                      <StyledTableRow key={row.full_name}>
                        <StyledTableCell component="th" scope="row">
                          {row.full_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {isYesterday(row.date)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.time}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.call_type == 1
                            ? "Purchase product"
                            : row.call_type == 2
                            ? "Purchase modelus"
                            : "Other reasion Type"}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.jobtitle}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.contact_number}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.notes}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item md={5} ml={3} mr={3} xl={5} sm={12} xs={12}>
              <Grid container mt={5}>
                <Grid item xs={8}>
                  <Typography
                    pt={4}
                    mb={2}
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    User List
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    onClick={() => {
                      Navigate("/UserList");
                    }}
                    mt={4}
                    sx={{
                      color: "#0CB4D0",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <RemoveRedEyeIcon
                      sx={{
                        color: "#0CB4D0",
                        marginBottom: "10px",
                        fontSize: "28px",
                      }}
                    />{" "}
                    View All List
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User Name </StyledTableCell>
                      <StyledTableCell align="left">Email </StyledTableCell>
                      <StyledTableCell align="left">Mobile</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ProductData?.userlist?.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.mobile_number}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={1} xl={1} sm={1} xs={0}></Grid>
            <Grid item ml={3} mr={3} md={5} xl={5} sm={12} xs={12}>
              <Grid container mt={5}>
                <Grid item xs={8}>
                  <Typography
                    pt={4}
                    mb={2}
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    Product List
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    onClick={() => {
                      Navigate("/Productlist");
                    }}
                    mt={4}
                    sx={{
                      color: "#0CB4D0",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <RemoveRedEyeIcon
                      sx={{
                        color: "#0CB4D0",
                        marginBottom: "10px",
                        fontSize: "28px",
                      }}
                    />{" "}
                    View All List
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product Name </StyledTableCell>
                      <StyledTableCell align="left">Modules </StyledTableCell>
                      {/* <StyledTableCell align="left">Mobile</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ProductData?.product?.map((row, i) => {
                      return i <= 4 ? (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.product_name}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">
                      {row.calories}
                    </StyledTableCell> */}
                          <StyledTableCell align="left">
                            {row.total_module}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">{row.carbs}</StyledTableCell>
              <StyledTableCell align="left">{row.protein}</StyledTableCell> */}
                        </StyledTableRow>
                      ) : null;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* <Grid item md={0.5} xl={1} sm={1} xs={0}></Grid> */}
          </Grid>
        </>
      )}
    </div>
  );
}
