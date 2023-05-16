import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GuidesList from "../../commenComponet/GuidesList";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExportModules from "../../Api/user/Modules/ExportModules";
const RegistrationGuide = () => {
  const [Product, setProduct] = useState(JSON.parse(localStorage.getItem("UserProduct")));
  const [Data, setData] = useState(JSON.parse(localStorage.getItem("userdata"))); 
  const Navigate= useNavigate()
  const [ModuleData, setModuleData] = useState();
  window.addEventListener("activeProduct", () => setTimeout(() => {
    setProduct(JSON.parse(localStorage.getItem("UserProduct")))
  },));
  const ModulesList=()=>{

    let obj={
        user_id:Data?.user_id,
        product_id: Product.id,         
      }

      ExportModules.ModulesList(obj).then(
        (resp) => {
          if (resp.ok) {
            if (resp.data) {
            //   let obj={...resp?.data?.data?.user, ...resp.data.data.business
            //   }
            setModuleData(resp.data.data)
              console.log("user123",resp.data.data)
              if(resp.data.data.registration_guid){
               let video=  resp.data.data.registration_guid.find((val,i)=>val.view_video==0)
               console.log({video})
              //  setRegistrationCurent(video)
              }
            //   setData(obj);
            }
          }
        }
      );
  }
  useEffect(() => {
    ModulesList()
  }, [])
  
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
      {Product.product_name}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography onClick={()=>Navigate("/")} mt={1} ml={6} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          Product{" "}
        </Typography>
        <Typography onClick={()=>Navigate("/Modelus")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          {" "}
          / {Product.product_name}
        </Typography>
        <Typography mt={1} sx={{ fontSize: "14px" }}>
          {" "}
          / Registration Guides
        </Typography>
      </div>
      <hr height={3} />
      <Grid container spacing={4} mt={2} >
          {console.log(localStorage.getItem("Checklist"))}
        <Grid xl={3} >
          <ArrowBackIcon onClick={() => Navigate("/Modelus")} style={{ color: "#0cb4d0", fontSize: "50px", marginLeft: "18px" }} />
        </Grid>
        <Grid xl={3} >
        </Grid>
        <Grid xl={6} >
          {/* <div style={{ display: "flex" }}>
            <Button mt={1} onClick={() => Navigate("/Productlist/cretechalist")} sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Checklist</Button>

            <Button onClick={() => Navigate("/CreactModules")} sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Modelus</Button>
          </div> */}
        </Grid>
      </Grid>
      <Typography mt={4} sx={{ fontSize: "30px", marginLeft: "320px" }}>
        7 of 14 Guides Completed
      </Typography>
      {/* {ModuleData?.registration_guid.map((val,i)=>
        <GuidesList title={val.title} Stuts={val.view_video} />
        )} */}
        <GuidesList title={"fdgf"} Stuts={"3"} />
        <GuidesList title={"Chapter 2 - getting Started"} Stuts={1} />
        <GuidesList title={"Chapter 3 - getting Started"} Stuts={2} />
    </div>
  );
};

export default RegistrationGuide;
