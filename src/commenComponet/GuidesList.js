import {Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BaseUrlImage } from "../Api/BaseApi";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ExportModules from "../Api/user/Modules/ExportModules";
import { toast } from "react-toastify";

const GuidesList = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("UserProduct"))
  );
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const ViewguidUpdateUser = (id) => {
    let obj = {
      user_id: Data?.user_id,
      product_id: Product.id,
      registrationguide_id: id,
      status: true,
    };

    ExportModules.guidUpdateUser(obj)
      .then((resp) => {
        if (resp.ok) {
          props.ModulesList();
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
      });
  };
  return (
    <div>
      <Grid container mb={2}>
        <Grid item xs={12} sx={{p:3, backgroundColor:'rgba(128,128,128,0.05)', borderRadius:'5px'}}>
          <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between">
            {props.Stuts == 1 ? (
              <p
                style={{
                  backgroundColor: "#1bbd1b",
                  padding: "2px",
                  borderRadius: "38%",
                  fontSize: "13px",
                  color: "white",
                  width: "71px",
                  marginBottom:0,
                }}
              >
                Completed
              </p>
            ) : props.Stuts == 3 ? (
              <p
                style={{
                  backgroundColor: "#0CB4D0",
                  padding: "2px",
                  borderRadius: "38%",
                  fontSize: "13px",
                  color: "white",
                  width: "96px",
                  marginBottom:0,
                }}
              >
                Curent Chapter
              </p>
            ) : props.Stuts == 0 ? (
              <p
                style={{
                  backgroundColor: "#c7c0c0",
                  padding: "2px",
                  borderRadius: "38%",
                  fontSize: "14px",
                  color: "white",
                  width: "55px",
                  marginBottom:0,
                }}
              >
                To Start
              </p>
            ) : null}
            <Typography
              onClick={() => {
                setOpen(true);
              }}
              sx={{ color: "#0CB4D0", fontSize: "15px", cursor: "pointer" }}
            >
              <RemoveRedEyeIcon
                sx={{ color: "#0CB4D0", fontSize: "20px", verticalAlign:'baseline'}}
              />{" "}
              View Guides
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "19px" }}>{props.title}</Typography>
        </Grid>       
      </Grid>
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            className="playerDiv"
            style={{ height: "300px", maxWidth: "779px", width: '100%' }}
          >
            <ReactPlayer
              width={"100%"}
              height="100%"
              playing={true}
              muted={true}
              controls={true}
              url={
                props.val?.file_path
                  ? BaseUrlImage + props.val?.file_path
                  : props.val?.video_link
              }
            />
          </div>

          <Grid container spacing={2} alignItems="center" sx={{pt:2}}>
            <Grid item xs={12} sm={6} md={4}>
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    backgroundColor: "#E0E0E0",
                  }}
                >
                  Curent Chapter
                </Typography>
                <Typography ml={1} sx={{ fontSize: "13px" }}>
                  1 of 14 guides comp
                </Typography>
              </div>
              <Typography
                mt={1}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Chapter 1-Geting Started
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ color: "gray", fontSize: "15px", textAlign:{xs:'left', sm:'right'} }}>previous Chapter</Typography>
            </Grid>
            <Grid item xs={12} sm={12}  md={4} sx={{textAlign:{xs:'left', sm:'right'}}}>
              <Button
                onClick={() => {
                  ViewguidUpdateUser(props.val.id);
                }}
                variant="contained"
                sx={{ backgroundColor: "#0CB4D0" }}
              >
                Mark Completed
              </Button>
            </Grid>
          </Grid>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GuidesList;
