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
const DashBoard = () => {
  const [userdata, setuserdata] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
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
        // console.log(resp.data.data);
        if (resp.data) {
          setloader(false)
          setData(resp.data.data);
        }else{
          setloader(false)
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
        console.log("hello", resp.data.data);
        if (resp.data) {
          setloader(false)
          setProductData(resp.data.data.product);
        }else{
          setloader(false)
        }
      }
    })
    .catch((err) =>{
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setloader(false)
    }
  );
  };
  useEffect(() => {
    GetData();
    GetDataProduct();
  }, []);
  return (
    <div id="main">
            {loader?    <div style={{marginTop:"24%"}}>
                <center >
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
               
            </div>:<>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        DashBoard
      </Typography>
      <hr height={3} />
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Wellcome to the HCPA Portal Davis
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={7} xl={9} sm={8} lg={9}>
          <Typography mt={5} ml={8} sx={{ fontSize: "20px" }}>
            Welcome Video
          </Typography>
          <Box ml={8}>
            <div className="playerDiv">
              <ReactPlayer
                width={"100%"}
                height="100%"
                playing={true}
                muted={true}
                controls={true}
                url={BaseUrlImage+Data?.file_path}
              />
            </div>
          </Box>
          <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
            Product
          </Typography>
          <Grid container spacing={4} mt={2} pl={9}>
            {ProductData?.map((val,i)=>{
              return<>{val.purchase_status=="1"?<ProductCard Modules={6} id={val.id} ProductName={val.product_name} />:null}
              </>
            })}
{/*             
            <ProductCard Modules={3} ProductName={"SDA"} />
            <ProductCard Modules={2} ProductName={"Aged Caredis"} />
            <ProductCard Modules={6} ProductName={"Child Care"} />
            <ProductCard Modules={5} ProductName={"Vaccines"} /> */}
          </Grid>
        </Grid>
        <Grid item xs={4} xl={3} sm={4} lg={3}>
          <div style={{ display: "flex" }}>
            <Typography
              mt={5}
              ml={6}
              sx={{ fontSize: "20px", cursor: "pointer" }}
            >
              Files{" "}
            </Typography>
            <Typography
              mt={6}
              ml={1}
              sx={{ color: "#0CB4D0;", fontSize: "14px", cursor: "pointer" }}
            >
              {" "}
              View All Files
            </Typography>
          </div>
          <div className="center">
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              No files yet{" "}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "14px" }}>
              Exported files from your Products{" "}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "14px" }}>
              will show here{" "}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Futer />
            </>}

    </div>
  );
};

export default DashBoard;
