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
              if(resp.data.data.registration_guid){
               setModuleData(resp.data.data.registration_guid)
              }
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
      <Typography sx={{ fontSize: "30px" }}>
      {Product.product_name}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography onClick={()=>Navigate("/")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
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
      <Grid container mt={2} >
        <Grid xl={3}>
          <ArrowBackIcon onClick={() => Navigate("/Modelus")} style={{ color: "#0cb4d0", fontSize: "50px"}} />
        </Grid>
      </Grid>
      <Typography my={4} fontSize={{xs:'20px', lg:'30px'}}>
        7 of 14 Guides Completed
      </Typography>
      {ModuleData?.map((val,i)=>
        <GuidesList ModulesList={ModulesList} title={val.title} val={val} Stuts={val.guid_status} />
        )}

        {/* <GuidesList title={"fdgf"} Stuts={"3"} />
        <GuidesList title={"Chapter 2 - getting Started"} Stuts={1} />
        <GuidesList title={"Chapter 3 - getting Started"} Stuts={2} /> */}
    </div>
  );
};

export default RegistrationGuide;
