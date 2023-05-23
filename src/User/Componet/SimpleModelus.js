import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModelusCardUnlook from "../../commenComponet/ModelusCardUnlook";
import Moduleslook from "../../commenComponet/Moduleslook";
import ExportModules from "../../Api/user/Modules/ExportModules";
import { toast } from "react-toastify";

export const SimpleModelus = () => {
  const [DataNotFoundmodule, setDataNotFoundmodule] = useState();
  const [ModuleData, setModuleData] = useState();
  const [loader, setloader] = useState(true);
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("UserProduct"))
  );
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const ModulesList = () => {
    let obj = {
      user_id: Data?.user_id,
      product_id: Product.id,
    };

    ExportModules.ModulesList(obj)
      .then((resp) => {
        if (resp.ok) {
          if (resp.data.data) {
            if (resp.data.data.module[0]) {
              setDataNotFoundmodule();
              setModuleData(resp.data.data.module)
            } else {
              setDataNotFoundmodule("No record found");
            }
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
  useEffect(() => {
    setloader(true);
    ModulesList()
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        NDIS
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography mt={1} ml={6} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
          Product{" "}
        </Typography>
        <Typography mt={1} sx={{ fontSize: "14px" }}>
          {" "}
          / NDIS
        </Typography>
      </div>
      <hr height={3} />
      <Grid container mt={2} spacing={2}>
      {ModuleData?.map((val, i) => {
         return (
          <>
                  {val.purchase_status == 1 ? (
                                      <ModelusCardUnlook
                                        size={3}
                                        Module={val}
                                        available={6}
                                      />
                                    ) : (
                                      <Moduleslook
                                        Module={val}
                                        available={6}
                                        size={3}
                                      />
                                    )}
                                  </>
                                ) })}
        {/* <ModelusCardUnlook Module={1} available={6}size={3} />
        <Moduleslook Module={2} available={6}size={3} />
        <Moduleslook Module={3} available={6}size={3} />
        <Moduleslook Module={3} available={6}size={3} />
        <Moduleslook Module={5} available={6}size={3} />
        <Moduleslook Module={6} available={6}size={3} /> */}
      </Grid>
    </div>
  );
};
