import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import React from "react";
import { Table } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
export default function UserList() {
  const Navigate = useNavigate()
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        User List
      </Typography>
      <hr height={3} />
        <Grid container spacing={1}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
      <Box mt={8}>
            <Table striped hover >
              <thead style={{ paddingBlock: "30px", backgroundColor: "#0CB4D0", color: "white", fontSize: "20px" }}>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>View Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>drn</td>
                  <td>Active</td>
                  <td><EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;<DeleteIcon sx={{ color: "red" }} /> </td>
                  <td onClick={() => Navigate("/UserActionView")} style={{ color: "#0CB4D0", cursor: "pointer" }}>  <RemoveRedEyeIcon
                    sx={{
                      color: "#0CB4D0",
                      marginBottom: "10px",
                      fontSize: "28px",
                    }}
                  /> &nbsp; View </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>Active</td>
                  <td><EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp;<DeleteIcon sx={{ color: "red" }} /> </td>
                  <td onClick={() => Navigate("/UserActionView")} style={{ color: "#0CB4D0", cursor: "pointer" }}>  <RemoveRedEyeIcon
                    sx={{
                      color: "#0CB4D0",
                      marginBottom: "10px",
                      fontSize: "28px",
                    }}
                  />&nbsp; View </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>Active</td>
                  <td><EditIcon sx={{ color: "#0CB4D0" }} /> &nbsp; <DeleteIcon sx={{ color: "red" }} /> </td>
                  <td onClick={() => Navigate("/UserActionView")} style={{ color: "#0CB4D0", cursor: "pointer" }}>  <RemoveRedEyeIcon
                    sx={{
                      color: "#0CB4D0",
                      marginBottom: "10px",
                      fontSize: "28px",
                    }}
                  /> &nbsp;View </td>
                </tr>
              </tbody>
            </Table>
            <Pagination count={10} />
      </Box>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => Navigate("/CreateUser")} sx={{ marginLeft: "10%", }} className={"A1"} variant="contained">
              Create Product</Button>
          </Grid>
        </Grid>
    </div>
  );
}
