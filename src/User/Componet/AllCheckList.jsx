import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from 'react-toastify';
import ExportModules from '../../Api/user/Modules/ExportModules';
import CreateIcon from '@mui/icons-material/Create';
import { ColorRing } from 'react-loader-spinner';
const AllCheckList = () => {
    const [Product, setProduct] = useState(localStorage.getItem("pp"));
    const [Data, setData] = useState(JSON.parse(localStorage.getItem("userdata"))); 
    const Navigate= useNavigate()
    const [loader, setloader] = useState(true);
    const [ModuleData, setModuleData] = useState();
    const [DataNotFoundmodule, setDataNotFoundmodule] = useState();
    useEffect(() => {
        CheckList()
        console.log({Product})
    }, [])
    const CheckList = () => {
        let obj = {
        //   user_id: Data?.user_id,
          product_id: Product,
        };
        ExportModules.getChacklistAll(obj)
          .then((resp) => {
            if (resp.ok) {
              if (resp.data.data) {
            console.log(resp.data.data)
                setloader(false);
                setModuleData(resp.data.data);

                //   setData(obj);
              } else {
                setDataNotFoundmodule("No record found");
                setloader(false);
              }
              setloader(false);
            }
          })
          .catch((err) => {
            setloader(false);
            toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setloader(false);
          });
      };
  return (
    <div>
        {loader?  <div style={{ marginTop: "24%" }}>
                  <center>
                    <ColorRing
                      visible={true}
                      height="100"
                      width="100"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#0CB4D0",
                        "#0CB4D0",
                        "#0CB4D0",
                        "#0CB4D0",
                        "#0CB4D0",
                      ]}
                    />
                  </center>
                </div>:<>
    <div style={{paddingTop:"12px"}}>
      <Typography fontSize={{xs:'20px', lg:'30px'}}>{"Checklist"}</Typography>
    </div>
    <hr height={3} />
    <div>
{/* <Grid></Grid> */}
<Grid pl={{xs:2, md:6, lg:2}} container spacing={2}>
<Grid item className='sedowFile' xs={12} sm={6} md={4} lg={4} style={{marginBottom:"15px"}}>
    <div>
   <ArrowBackIcon onClick={() => Navigate("/Modules")} style={{ color: "#0cb4d0", fontSize: "50px",cursor:"pointer"}} />
    </div>
    </Grid>
<Grid item className='sedowFile' xs={12} sm={6} md={4} lg={4} style={{marginBottom:"15px"}}>
    <Typography variant="span" sx={{ fontSize:"28px", backgroundColor:"#e0e0e0", px:1, py:0.5, borderRadius:'2px',textAlign:"center"}}>To Be Completed</Typography>
    </Grid>
</Grid>
    <Grid pl={{xs:2, md:6, lg:2}} container spacing={2}>

{ModuleData?.map((item,i)=>{
  return  <Grid item className='sedowFile' xs={12} sm={6} md={4} lg={4} style={{marginBottom:"15px"}}>
<Box sx={{ border: 1, borderColor: 'grey.400', p:2}}>
    <h6 style={{fontWeight:"bold"}}>{item.title}</h6>
    <h6 style={{fontWeight:"bold"}}>{item.document_title}</h6>
  <Grid container>         
     <Grid xs={6}md={6}lg={6}xl={6}>
     <div style={{ display: "flex",cursor:"pointer", width:"fit-content"}} onClick={()=>{localStorage.setItem("CheckList_id",item.id);
        setTimeout(() => {
          Navigate("/Modules/CheckList")
        });
      }}>

     
 <Typography ml={1} sx={{ color: "#0CB4D0", fontSize: "14px",marginTop:"5px" }} ><CreateIcon sx={{ color: "#0CB4D0", fontSize: "20px",marginBottom:"15px" }}  /> Fill out from</Typography>
     </div>
     </Grid>
     <Grid xs={6}md={6}lg={6}xl={6}>
     
     </Grid>
  </Grid>
</Box>
</Grid>
})}
        </Grid>
    </div>
                </>}
    </div>
  )
}

export default AllCheckList