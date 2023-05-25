import React, { useEffect, useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { styled } from "@mui/material/styles";
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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import ExportBookCall from '../Api/Admin/BookCallList/ExportBookCall';
import { ColorRing } from 'react-loader-spinner';
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
export default function CallListBook() {
  const [Data, setData] = useState([])
  const [loader, setloader] = useState(true);
  const GetData = () => {
    ExportBookCall.BooKCallListtAll().then(
      (resp) => {
        if (resp.ok) {
          if (resp.data) {
            console.log(resp.data)
            setData(resp.data.result);
            setloader(false)
          }else{
            setloader(false)
          
        }
        }
      }
    );
  }
  useEffect(() => {
    GetData()
  }, [])
  function isYesterday(date) {
    const today = new Date(date);

    const yesterday = new Date();

    if (
      today.getDate() === yesterday.getDate() &&
      today.getMonth() === yesterday.getMonth() &&
      today.getFullYear() === yesterday.getFullYear()
    ) {
      return "Today";
    } 
    else if (
      today.getDate() === yesterday.getDate() - 1 &&
      today.getMonth() === yesterday.getMonth() &&
      today.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }
    else if (
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
        Call List Book
      </Typography>
      <hr height={3} />
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
      <Grid  mt={5}container spacing={1}>
              <Grid item xs={2}>
                </Grid>
              <Grid item xs={8}>
              <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>User Name </StyledTableCell>
                  <StyledTableCell align="left">Date </StyledTableCell>
                  <StyledTableCell align="left">Time</StyledTableCell>
                  <StyledTableCell align="left">Call Type</StyledTableCell>
                  <StyledTableCell align="left">Job Title</StyledTableCell>
                  <StyledTableCell align="left">Contact Number</StyledTableCell>
                  <StyledTableCell align="left">Notes</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data?.map((row) => (
                  <StyledTableRow key={row.full_name}>
                    <StyledTableCell component="th" scope="row">
                      {row.full_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    {isYesterday(row.date)}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.time}</StyledTableCell>
                    <StyledTableCell align="left">{row.call_type == 1 ? "Purchase product":row.call_type==2?"Purchase modelus":"Other reasion Type"}</StyledTableCell>
                    <StyledTableCell align="left">{row.jobtitle}</StyledTableCell>
                    <StyledTableCell align="left">{row.contact_number}</StyledTableCell>
                    <StyledTableCell align="left">{row.notes}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
                </Grid>
                </Grid>
                </>}
    </div>
  )
}
