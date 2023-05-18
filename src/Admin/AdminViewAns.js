import React from 'react'
import { useState } from 'react';
import Exportpurchaselist from '../Api/Admin/purchaselist/Exportpurchaselist';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
const AdminViewAns = () => {
    const Navigate=useNavigate()
    const [DataChecklist, setDataChecklist] = useState()
    const [Product, setProduct] = useState(
        JSON.parse(localStorage.getItem("Product"))
      )
    const GetCheckListData = () => {
        // alert(Product.id)
          let obj = {
            checklist_id: localStorage.getItem("Checklist_Aid"),
            user_id: localStorage.getItem("UserProduct_id"),
            product_id: Product.id,
          };
          Exportpurchaselist.ViewAnsChecklist(obj).then((resp) => {
            if (resp.ok) {
              console.log("Ok",resp.data.data);
              if (resp.data.data[0]) {
                setDataChecklist(resp.data.data);
              }
            }
          });
        };
        
        useEffect(() => {
            GetCheckListData()
          }, [])
  return (
    <div>
           <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        User's Answer
      </Typography>
      <hr height={3} />
      <div style={{display:"flex",marginBlock:"10px",marginLeft:"10px"}}>
     <ArrowBackIcon onClick={()=>Navigate(-1)} style={{color:"#0cb4d0" ,fontSize:"50px"}}/>
      </div>
      <Box mt={5}>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item mt={5} xs={8}>
            {DataChecklist?.map((val,i)=>{
               return <>
          <Box mt={5} className='sedow'
            pb={7}
            sx={{textAlign:"left",
            backgroundColor: "#f4f4f4",
        }}>
                <Grid  container spacing={1}>
        <Grid item xs={6}>   <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
      Date : {val.date}
    </Typography></Grid>
        <Grid item  xs={6}> <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
      Time : {val.time}
    </Typography></Grid>
        </Grid>
        <hr/>
                {JSON.parse(val.json_data).map((item,index)=>{
                    return<>
                    <h1>Q {index+1} . {item?.question}</h1>
                    <h4 style={{textAlign:"center"}}> Ans . {item?.Ans}</h4>
                    </>
                })}
            </Box>
                </>
            })}
          </Grid>
          </Grid>
          </Box>
      
    </div>
  )
}

export default AdminViewAns
