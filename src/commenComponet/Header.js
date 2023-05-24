import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box, Button, Grid } from "@mui/material";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import BackpackIcon from "@mui/icons-material/Backpack";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContainer } from "react-toastify";
import { ListGroup, Modal } from "react-bootstrap";
import ExportDocumentuser from "../Api/user/Document/ExportDocumentuser";
import CloseIcon from '@mui/icons-material/Close';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#233B77",
  "&:hover": {
    backgroundColor: "#233B77",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const CrossIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 30,1),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const loaction = useLocation();
  const Navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [SerchValue, setSerchValue] = React.useState("");
  const [DataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [Data, setData] = useState()
  const GetData = (e) => {
    let obj = {
      search: e,
      user_id: DataUser?.user_id,
      role_id: localStorage.getItem("role"),
    };

    ExportDocumentuser.FileUserFilter(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setData(resp.data.data);
        }
      }
    });
  };
  // FileUserFilter
  return (
    <>
      {loaction.pathname == "/" ? null : (
        <div className="header">
          <Grid container>
            <Grid item xs={2} md={3} xl={3.5} sm={5} mt={2.5}>
              <div style={{ display: "flex" }}>
                <p
                  onClick={() => window.dispatchEvent(new Event("Togle"))}
                  className="sidebartogle"
                >
                  <MenuIcon
                    style={{
                      color: "white",
                      fontSize: "40px",
                      marginLeft: "5px",
                    }}
                  ></MenuIcon>
                </p>
                {localStorage.getItem("role") == 1 ||
              localStorage.getItem("role") == 2 ? null : (
                <Search sx={{ m: 1 }} className="serchbar">
                  <SearchIconWrapper >
                    <SearchIcon  />
                  </SearchIconWrapper>
                  {SerchValue?<CrossIconWrapper>
                    <CloseIcon onClick={()=>{setSerchValue("")}} />
                  </CrossIconWrapper>:null}
                  
                  <StyledInputBase
                    placeholder="Search Document"
                    inputProps={{ "aria-label": "search" }}
                    value={SerchValue}
                    onChange={(e, val) =>{ ;
                    if(e.target.value){
                      setSerchValue(e.target.value)
                        GetData(e.target.value)
                      }else{
                        setSerchValue("")
                        setData()
                      }
                    }
                    }
                  />
                   
                 
                </Search>)}
              </div>
            </Grid>
            <Grid item xs={1.5} md={6} xl={6} sm={2}></Grid>
            <Grid item md={2} xl={1.5} sm={4} xs={5} mt={2.5}>
              {localStorage.getItem("role") == 1 ||
              localStorage.getItem("role") == 2 ? null : (
                <Button
                  sx={{ m: 1, backgroundColor: "#0CB4D0" }}
                  onClick={() => Navigate("/BookCall")}
                  startIcon={<BackpackIcon />}
                  variant="contained"
                >
                  Book A Call
                </Button>
              )}

              {/* <ExitToAppIcon  sx={{ p: 2 }} className='serchbarrighticon'/> */}
            </Grid>
            <Grid item md={0.5} xl={1} sm={1} xs={2} mt={2.5}>
              {/* <Button variant="contained">Contained</Button> */}
              {/* <LogoutIcon onClick={()=>window.dispatchEvent(new Event("Admin"))} sx={{ m: 2 ,textAlign:"left",cursor:"pointer" }}  className='serchbarrighticon'/> */}
              <LogoutIcon
                onClick={() => setModalShow(true)}
                sx={{ m: 2, textAlign: "left", cursor: "pointer" }}
                className="serchbarrighticon"
              />
            </Grid>
          </Grid>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Log out ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure want to log out ?</p>
              <Grid container spacing={4} mt={2}>
                <Grid xl={1}> </Grid>
                <Grid xl={5}>
                  {" "}
                  <Button
                    type="button"
                    sx={{ marginLeft: "10px" }}
                    className={"A1"}
                    variant="contained"
                    onClick={() => {
                      localStorage.clear();
                      Navigate("/");
                    }}
                  >
                    Yes
                  </Button>
                </Grid>
                <Grid xl={6}>
                  <Button
                    type="button"
                    sx={{ marginLeft: "10px" }}
                    onClick={() => {
                      setModalShow(false);
                    }}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      )}
      {Data &&SerchValue? (
        <Box
          ml={7}
          className="sedow"
          sx={{ zIndex: "1", position: "relative" }}
        >
          <ListGroup
            style={{
              position: "absolute",
              width: "25%",
              border: "1px solid #0CB4D0",
              marginTop: "-20px",
              maxHeight: "215px",
              overflow: "auto",
            }}
          >
            {Data.map((val,i)=> <ListGroup.Item onClick={()=>{localStorage.setItem("ViewDocument",JSON.stringify(val));
            setTimeout(() => {
              if(loaction.pathname=="/Modelus/Document/ViewDocument"){
                window.dispatchEvent(new Event("FileChenge"))
              }else{
               
                Navigate("/Modelus/Document/ViewDocument")
              }
              setSerchValue("")
            });
          }}>{val.document_title}</ListGroup.Item>)}
            {Data[0]?null:<ListGroup.Item>No record found</ListGroup.Item>}

          </ListGroup>
        </Box>
      ) : null}
    </>
  );
};

export default Header;
