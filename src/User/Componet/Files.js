import { Box, Button, Grid, Typography } from "@mui/material";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import VerticalShadesClosedIcon from "@mui/icons-material/VerticalShadesClosed";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FileTable from "../../commenComponet/FileTable";
import Futer from "../../commenComponet/Futer";
import ExportProduct from "../../Api/user/Product/ExportProduct";
import ExportDocumentuser from "../../Api/user/Document/ExportDocumentuser";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";
// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }
const Files = () => {
  const [value, setValue] = useState("All");
  const [saveData, setsaveData] = useState([]);
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [FileData, setFileData] = useState();
  const [ProductData, setProductData] = useState([]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSaveData = (data) => {
    setsaveData(data);
  };
  const GetData = () => {
    let obj = {
      user_id: Data.user_id,
    };
    ExportProduct.ProductList(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setProductData(resp.data.data.product);
        }
      }
    });
  };
  const GetDataFile = (id) => {
    let obj = {
      user_id: Data.user_id,
      product_id: id,
    };
    ExportDocumentuser.DocumentGetDataSaveFile(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setFileData(resp.data.data);
        }
      }
    });
  };
  useEffect(() => {
    GetData();
    GetDataFile("All");
  }, []);

  return (
    <div>
      {/* <Grid container> */}
        {/* <Grid item xs={1}> */}
        {/* </Grid>
        <Grid xs={9}></Grid>
      <Grid xs={2}> */}
          {/* <Grid container mt={4}> */}
            {/* <Grid mt={4} item xs={6}></Grid> */}
            {/* <Grid mt={4} item xs={2}><VerticalShadesClosedIcon /></Grid>
            <Grid mt={4} item xs={3}><DensityMediumIcon sx={{ color: "#0CB4D0" }} /></Grid> */}
          {/* </Grid> */}
        {/* </Grid> */}
      {/* </Grid> */}
            <Typography fontSize={{xs:'20px', lg:'30px'}}>Files</Typography>

      <Box
        xs={12}
        xl={12}
        sm={12}
        lg={12}
        mt={4}
        // ml={6}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <div style={{ display: "flex", marginBlock: "20px", overflowX:'auto', gap:'20px', alignItems:'center' }}>
          <h4 className={value == "All" ? "fileActive" : ""} onClick={() => {handleChange("All"); GetDataFile("All");}} style={{flex: '0 0 auto', cursor: "pointer"}}>
            All
          </h4>
          {ProductData.map((val, i) => {
            return (
              <h4
                className={value == i ? "fileActive" : "file-modules"} onClick={() => {handleChange(i); GetDataFile(val.id)}}
                style={{flex: '0 0 auto', cursor: "pointer"}}
              >
                {val.product_name}
              </h4>
            );
          })}
        </div>
        {FileData ? (
          <FileTable FileData={FileData} handleSaveData={handleSaveData} />
        ) : (
          <center>No record found</center>
        )}
      </Box>

      {/* <Futer /> */}
    </div>
  );
};

export default Files;
