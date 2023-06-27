import { Box, Container, Grid, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../commenComponet/ProductCard";
import Futer from "../../commenComponet/Futer";
import ExportDashBoard from "../../Api/user/DashBoard/ExportDashBoard";
import ExportProduct from "../../Api/user/Product/ExportProduct";
import { BaseUrlImage } from "../../Api/BaseApi";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import DeshBoardCardFile from "./DeshBoardCard";
import ExportDocumentuser from "../../Api/user/Document/ExportDocumentuser";
const DashBoard = () => {
  const [userdata, setuserdata] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [FileData, setFileData] = useState([]);
  const Navigate = useNavigate();
  const [Data, setData] = useState();
  const [loader, setloader] = useState(true);
  const [ProductData, setProductData] = useState([]);
  const GetData = () => {
    // let obj = {
    //   user_id: userdata.user_id,
    // };
    ExportDashBoard.UserWellcome().then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setloader(false);
          setData(resp.data.data);
        } else {
          setloader(false);
        }
      }
    });
  };
  const GetDataProduct = () => {
    let obj = {
      user_id: userdata.user_id,
    };
    ExportProduct.ProductList(obj)
      .then((resp) => {
        if (resp.ok) {
          if (resp.data) {
            setloader(false);
            setProductData(resp.data.data.product);
          } else {
            setloader(false);
          }
        }
      })
      .catch((err) => {
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
  const GetDataFile = (id) => {
    let obj = {
      user_id: userdata.user_id,
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
    GetDataProduct();
  }, []);
  return (
    <div id="main">
      {loader ? (
        <div style={{ marginTop: "24%" }}>
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
      ) : (
        <>
          <Typography fontSize={{xs:'20px', lg:'30px'}}>
            DashBoard
          </Typography>
          <hr height={3} />
          <Typography mt={4} fontSize={{xs:'20px', lg:'30px'}}>
            Welcome to the HCPA Portal Davis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <Box pt={5}>
                <Typography sx={{ fontSize: "20px" }}>Welcome Video</Typography>
                <div className="playerDiv">
                  <ReactPlayer
                    width={"100%"}
                    height="100%"
                    playing={true}
                    muted={true}
                    controls={true}
                    url={BaseUrlImage + Data?.file_path}
                  />
                </div>
              </Box>
              <Typography my={4} fontSize={{xs:'20px', lg:'30px'}}>Product</Typography>
              <Grid container spacing={{xs:2, lg:4}} mt={2}>
                {ProductData?.map((val, i) => {
                  return (
                    <>
                      {val.purchase_status == "1" ? (
                        <ProductCard
                          val={val}
                          Modules={6}
                          id={val.id}
                          ProductName={val.product_name}
                        />
                      ) : null}
                    </>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box pl={{xs:2, md:6, lg:2}} pt={5} onClick={()=>Navigate("/Files")} >
                <Typography
                  mt={5}
                  // ml={4}
                  variant="span"
                  sx={{ fontSize: "20px", cursor: "pointer", }}
                >
                  Files
                </Typography>
                <Typography
                  mt={5.5}
                  // ml={1}
                  variant="span"
                  sx={{
                    color: "#0CB4D0;",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  View All Files
                </Typography>
              </Box>
              {FileData[0]? <Grid pl={{xs:2, md:6, lg:2}} container spacing={2}>
                {FileData.map((item, i) => {
                  return (
                    <>{i < 4 ? <DeshBoardCardFile item={item} /> : null}</>
                  );
                })}
              </Grid>: <div className="center">
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  No files yet{" "}
                </Typography>
                <Typography sx={{ color: "gray", fontSize: "14px" }}>
                  Exported files from your Products{" "}
                </Typography>
                <Typography sx={{ color: "gray", fontSize: "14px" }}>
                  will show here{" "}
                </Typography>
              </div>}
             
             
            </Grid>
          </Grid>
          <Futer />
        </>
      )}
    </div>
  );
};

export default DashBoard;
