import React from "react";
import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import { Table } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
export default function Product() {
  const Navigate = useNavigate();

  return (
    <div>
      {" "}
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Product List
      </Typography>
      <hr height={3} />
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
                  <th>Modules</th>
                  <th>Action</th>
                  <th>View Product</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>7</td>
                  <td>
                    <EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;
                    <DeleteIcon sx={{ color: "red" }} />{" "}
                  </td>
                  <td
                    onClick={() => Navigate("/Productlist/moduleList")}
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
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>7       </td>
                  <td>
                    <EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;
                    <DeleteIcon sx={{ color: "red" }} />{" "}
                  </td>
                  <td
                    onClick={() => Navigate("/Productlist/moduleList")}
                    style={{ color: "#0CB4D0", cursor: "pointer" }}
                  >
                    {" "}
                    <RemoveRedEyeIcon
                      sx={{
                        color: "#0CB4D0",
                        marginBottom: "10px",
                        fontSize: "28px",
                      }}
                    />
                    &nbsp; View{" "}
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>@twitter</td>
                  <td>6</td>
                  <td>
                    <EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;{" "}
                    <DeleteIcon sx={{ color: "red" }} />{" "}
                  </td>
                  <td
                    onClick={() => Navigate("/Productlist/moduleList")}
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
                    &nbsp;View{" "}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Pagination count={10} />
          </Grid>
          <Grid item mt={-3} xs={2}>  <Button onClick={()=>Navigate("/CreateProduct")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
            className={"active"}
          /> &nbsp; &nbsp; &nbsp; Create Product</Button> </Grid>
        </Grid>
      </Box>
    </div>
  );
}
