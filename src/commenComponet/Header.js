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
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: "100%",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   width: "auto",
  // },
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
  right:0,
  // padding: theme.spacing(0, 30,1),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width:'100%',
  "& .MuiInputBase-input": {
    height:'35px',
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
        <Box className="header" px={{xs:2, md:6}}>
          <Grid container sx={{alignItems:'center', justifyContent:'space-between', height:{xs:'auto', sm:'100%'}}}>
          <Grid item xs={12} sm='auto' sx={{order:{xs:2, sm:1}}}>
              <div style={{ display: "flex" }}>
                <div
                  onClick={() => window.dispatchEvent(new Event("Togle"))}
                  className="sidebartogle"
                >
                  <MenuIcon
                    style={{
                      color: "white",
                      fontSize: "40px",
                      // marginLeft: "5px",
                    }}
                  ></MenuIcon>
                </div>
                {
                localStorage.getItem("role") == 1 || localStorage.getItem("role") == 2 ? null : (
                  <Search className="serchbar">
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
                  </Search>
                )
                }
              </div>
            </Grid>
            <Grid item xs={12} sm='auto' sx={{order:{xs:1, sm:2}}}>
              <Box sx={{display: 'flex', flexWrap:'wrap', alignItems:'flex-start', justifyContent:{xs:'space-between'}}}>
              {
              localStorage.getItem("role") == 1 || localStorage.getItem("role") == 2 ? null : (
                <Button
                  sx={{backgroundColor: "#0CB4D0" }}
                  onClick={() => Navigate("/BookCall")}
                  startIcon={<BackpackIcon />}
                  variant="contained"
                >Book A Call</Button>
              )
              }
              <LogoutIcon
                onClick={() => setModalShow(true)}
                sx={{ textAlign: "left", cursor: "pointer" }}
                className="serchbarrighticon"
              />
              </Box>
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
        </Box>
      )}
      {Data && SerchValue? (
        <Box
          className="sedow"
          sx={{ zIndex: "1", position: "relative" }}
        >
          <ListGroup className='searchbar-result-wrapper' 
            style={{
              position: "absolute",
              border: "1px solid #0CB4D0",
              marginTop: "-20px",
              maxHeight: "215px",
              overflow: "auto"
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
