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
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>User's Answer</Typography>
      <Grid container>
        <Grid xl={3}> 
          <ArrowBackIcon className='back-icon-proact' onClick={()=>Navigate(-1)}/>
        </Grid>     
      </Grid>
      <Box my={5}>
        <Grid container spacing={4}>          
            {
              DataChecklist?.map((val,i)=>{
                return <>
                <Grid item xs={12} md={6} lg={4}>
                  <Box className='sedow' sx={{textAlign:"left", backgroundColor: "#f4f4f4", borderRadius:'3px', height:'100%'}}>
                    <Grid container sx={{borderBottom:'1px solid #bbb5b5'}} px={2} py={1}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: "16px" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20px', height:'20px', lineHeight:'20px', verticalAlign:'baseline', marginRight:'5px'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {val.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography sx={{ fontSize: "16px" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20px', height:'20px', lineHeight:'20px', verticalAlign:'baseline', marginRight:'5px'}}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {val.time}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{py:2}}>
                      {
                        JSON.parse(val.json_data).map((item,index)=>{
                          return<>
                            <Box px={2} py={1}>
                              <Box>Q {index+1} . {item?.question}</Box>
                              <Box> Ans . {item?.Ans}</Box>
                            </Box>
                          </>
                        })
                      }
                    </Box>
                  </Box>
                  </Grid>
                </>
              })
            }
        </Grid>
      </Box>  
    </div>
  )
}

export default AdminViewAns
