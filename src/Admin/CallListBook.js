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
  const [DataUser, setDataUser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const Navigate=useNavigate()
  const GetData = () => {
    ExportBookCall.BooKCallListtAll().then(
      (resp) => {
        if (resp.ok) {
          if (resp.data) {
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
    console.log(DataUser?.access[0].accessibility)
    if (DataUser?.access[0].accessibility.BookCall == "No") {
      Navigate("/Profile/Admin");
    }
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
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>Call List Book</Typography>
      {
        loader ?
        <div style={{marginTop:"24%"}}>
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
        :
        <Grid className='calllist-table-main' mt={5} container>            
          <Grid item xs={12} className='table-com-ar client-table'>
            <TableContainer component={Paper} sx={{mb:5}}>
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
                  {Data?.map((row) => (
                    <StyledTableRow key={row.full_name}>
                      <StyledTableCell component="th" scope="row">{row.full_name}</StyledTableCell>
                      <StyledTableCell>{isYesterday(row.date)}</StyledTableCell>
                      <StyledTableCell>{row.time}</StyledTableCell>
                      <StyledTableCell>{row.call_type == 1 ? "Purchase product":row.call_type==2?"Purchase Modules":"Other reasion Type"}</StyledTableCell>
                      <StyledTableCell>{row.jobtitle}</StyledTableCell>
                      <StyledTableCell>{row.contact_number}</StyledTableCell>
                      <StyledTableCell>{row.notes}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      }
    </div>
  )
}
