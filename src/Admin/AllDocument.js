import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import DocumentCard from "../../commenComponet/DocumentCard";
import { useNavigate } from "react-router-dom";
import DocumentCard from "../commenComponet/DocumentCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExportDocument from "../Api/Admin/Document/ExportDocument";
import { ColorRing } from "react-loader-spinner";
export default function AllDocumentAdmin() {

  const Navigate =useNavigate()
  const [Data, setData] = useState([])
  const [module, setmodule] = useState(JSON.parse(localStorage.getItem("module")));
  const [loader, setloader] = useState(true);
  let obj={
    module_id:module.module_id
  }
    const GetData = () => {
      ExportDocument.documentAll(obj).then(
        (resp) => {
          if (resp.ok) {
            if (resp.data) {
              setData(resp.data.data);
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
  return (
    <div>
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>NDIS Module 1</Typography>
      <Grid container>
        {/* <Grid className="document-module-cus" container xs={12}> */}
          <Grid item xs={12} sm={6} mb={2}>
            <div style={{display:"flex"}}>
              <ArrowBackIcon className="back-icon-proact" onClick={()=>Navigate(-1)} />
            </div>
          </Grid> 
          <Grid className="text-align-right" item xs={12} sm={6}>
            <Button onClick={()=>Navigate('/CreateDocuments')}  sx={{width:{xs:'100%', sm:'auto'}}} className={"A1"} variant="contained">  Create Document</Button> 
          </Grid>
        {/* </Grid> */}
      </Grid>

      <Grid container spacing={2} mb={5}>
        {
          loader ?
            <div style={{marginTop:"14%" ,marginLeft:"41%"}}>
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
            <>
              {
                Data?.map((val,i)=> <DocumentCard edit={true} title={val.document_title} dis={val.description} size={3} hellow={"yes"} val={val} />)
              }
            </>
        }
      </Grid>
    </div>
  );
}
