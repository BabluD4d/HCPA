import { Grid, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import ProductCard from "../commenComponet/ProductCard";
import AdminProductCart from "../commenComponet/AdminProductCart";
import ChecklistCardAdmin from "../commenComponet/ChecklistCardAdmin";
export const UserActionView = () => {
  const Navigate = useNavigate()
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Name : User
      </Typography>
      <hr height={3} />
      <div>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <ArrowBackIcon onClick={() => Navigate('/UserList')} style={{ color: "#0cb4d0", fontSize: "50px" }} />

          </Grid>
          <Grid item xs={6}>

            <Typography mt={2} sx={{ fontSize: "23px" }}>
              Active Products
            </Typography>
          </Grid>

        </Grid>

        <Grid container spacing={4} mt={2} pl={9}>
          <AdminProductCart Modules={3} ProductName={"SDA"} />
          <AdminProductCart Modules={2} ProductName={"Aged Caredis"} />
         
        </Grid>
        <Grid container mt={5} spacing={2}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={4}>
          <Typography mt={2} sx={{ fontSize: "28px" }}>
              Complete CheckList
            </Typography>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} pl={9}>
        <ChecklistCardAdmin Modules={3} ProductName={"SDA"} />
          <ChecklistCardAdmin Modules={2} ProductName={"Aged Caredis"} />
          </Grid>
      </div>
    </div>
  );
};
