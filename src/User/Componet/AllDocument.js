import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DocumentCard from "../../commenComponet/DocumentCard";
import { useNavigate } from "react-router-dom";
// import ExportDocument from "../../Api/user/Document/ExportDocumentuser";
import ExportDocumentuser from "../../Api/user/Document/ExportDocumentuser";

export default function AllDocument() {
  const Navigate = useNavigate();
  const [Data, setData] = useState();
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("UserProduct"))
  );
  const [Module, setModule] = useState(
    JSON.parse(localStorage.getItem("UserModule"))
  );
;

  const GetData = () => {
    let obj = {
      module_id: Module.id,
    };
    //  alert(localStorage.getItem("UserDoc_d"))
    ExportDocumentuser.DocumentGetData(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setData(resp.data.data);
        }
      }
    });
  };
  useEffect(() => {
    GetData();
    if(!Product?.product_name){
      Navigate("/Home")
    }

  }, []);

  return (
    <div>
      <Typography sx={{ fontSize: "30px" }}>
        {Module.module_name}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography
          onClick={() => Navigate("/")}
          mt={1}
          sx={{ fontSize: "14px", color: "#0CB4D0" }}
        >
          Product
        </Typography>
        <Typography
          onClick={() => Navigate("/Modules")}
          mt={1}
          sx={{ fontSize: "14px", color: "#0CB4D0" }}
        >
          / {Product?.product_name}
        </Typography>
        <Typography
          onClick={() => Navigate("/Modules/all")}
          mt={1}
          sx={{ fontSize: "14px", color: "#0CB4D0" }}
        >
          / Modules
        </Typography>
        <Typography mt={1} sx={{ fontSize: "14px" }}>
          / {Module.module_name}
        </Typography>
      </div>
      <hr height={3} />
      <Grid container spacing={2}>
        {Data?.map((val, i) => (
          <DocumentCard
            key={i}
            title={val.document_title}
            dis={val.description}
            val={val}
            size={3}
          />
        ))}
        {/* <DocumentCard title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} />
        <DocumentCard title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} />
        <DocumentCard title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} />
        <DocumentCard title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} />
        <DocumentCard title={"High Intensity Daily Personal Activities"} dis={"The purpose of this policy and procedure is to set out the relevant NDIS Practice Standards"} size={3} /> */}
      </Grid>
    </div>
  );
}
