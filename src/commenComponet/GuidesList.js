import { Button, Grid, Typography } from "@mui/material";
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
    <div style={{ marginLeft: "320px" }}>
      <Grid container spacing={2} mb={2}>
        <Grid mt={3} ml={4} item xs={6}>
          {props.Stuts == 1 ? (
            <p
              style={{
                backgroundColor: "#1bbd1b",
                padding: "2px",
                borderRadius: "38%",
                fontSize: "13px",
                color: "white",
                width: "71px",
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
              }}
            >
              To Start
            </p>
          ) : null}

          <Typography sx={{ fontSize: "19px" }}>{props.title}</Typography>
        </Grid>
        <Grid mt={3} item xs={4}>
          <Typography
            onClick={() => {
              setOpen(true);
            }}
            mt={2}
            ml={2}
            sx={{ color: "#0CB4D0", fontSize: "15px", cursor: "pointer" }}
          >
            {" "}
            <RemoveRedEyeIcon
              sx={{ color: "#0CB4D0", fontSize: "20px", marginBottom: "7px" }}
            />{" "}
            View Guides
          </Typography>
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
            style={{ height: "300px", width: "779px" }}
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

          <Grid container spacing={2} mb={1}>
            <Grid mt={3} item xs={6}>
              <div style={{ display: "flex" }}>
                <Typography
                  mt={2}
                  ml={6}
                  sx={{
                    fontSize: "13px",
                    backgroundColor: "#E0E0E0",
                  }}
                >
                  Curent Chapter
                </Typography>
                <Typography mt={2} ml={1} sx={{ fontSize: "13px" }}>
                  1 of 14 guides comp
                </Typography>
              </div>
              <Typography
                mt={1}
                ml={6}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Chapter 1-Geting Started
              </Typography>
            </Grid>
            <Grid mt={3} item xs={3}>
              <Typography
                mt={4}
                ml={2}
                sx={{ color: "gray", fontSize: "15px" }}
              >
                {" "}
                previous Chapter
              </Typography>
            </Grid>
            <Grid mt={5} item xs={3}>
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
