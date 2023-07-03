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
import Logo from '../img/newlogo.png'
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
        <Box className={`header ${localStorage.getItem("role") == 3?  'user-header':'admin-header'}`} px={{xs:2, md:6}} sx={{position: 'fixed', left: 0, right: 0, top: 0, zIndex:9}}>
          <Grid container sx={{alignItems:'center', justifyContent:'space-between', height:{xs:'auto', sm:'100%'}}}>              
            
            <Grid item sm={3} md={2} xs={localStorage.getItem("role") ==3 ? 6 : 'auto'}>
                <div style={{ display: "flex", flexWrap:'wrap', alignItems:'center' }}>
                  <img src={Logo} className="header-logo" alt="header logo" onClick={()=>{Navigate("/")}} />
                  <div onClick={() => window.dispatchEvent(new Event("Togle"))} className="sidebartogle" sx={{alignSelf:'flex-end'}}>
                    <MenuIcon style={{color: "white", fontSize: "40px", verticalAlign:'baseline'}}></MenuIcon>
                  </div>
                {/* {
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
                } */}
                
                </div>
            </Grid>

            <Grid xs={5} sx={{display:{xs:'none', sm:'flex'}, alignItems:{xs:'flex-start', lg:'center'},flexDirection:{xs:'column', lg:'row'}, alignSelf:{ xs:'initial', xl:'flex-end'}, fontWeight:'500',color:'#ffffff', paddingBottom:{xs:0, xl:'4px'}}}>
              <Box component="span" sx={{fontSize:{xs:'14px', lg:'24px', fontWeight:'600'}, alignItems:'center', display:'inline-block'}}>HCPA Staff Portal </Box>
              <Box component="span">
                <Box component="span" sx={{display: {xs:'none', lg:'inline-block'}, fontSize:'14px', marginLeft:'15px', marginRight:'15px'}}>|</Box> {DataUser?.name} {DataUser.role==1?<>[Super Admin]</>:null} 
              </Box>
            </Grid>

            <Grid item sm={4} xs={localStorage.getItem("role") ==3 ? 6: 'auto'}>
              <Box sx={{display: 'flex', flexWrap:'wrap', alignItems:{xs:'flex-end', md:'center'}, justifyContent:{xs:'flex-end'}, flexDirection:{xs:'column', md:'row'}}}>
              {
                localStorage.getItem("role") ==3? (
                  <Box sx={{display:'flex', flexWrap:'wrap', alignItems:'center'}}>
                    {/* <div onClick={() => window.dispatchEvent(new Event("Togle"))} className="sidebartogle user-toggle">
                      <MenuIcon style={{color: "white", fontSize: "40px", verticalAlign:'baseline'}}></MenuIcon>
                    </div> */}
                    <Button
                      sx={{backgroundColor: "#0CB4D0" }}
                      onClick={() => Navigate("/BookCall")}
                      startIcon={<BackpackIcon sx={{marginTop: '-8px'}} />}
                      variant="contained"
                      >
                        Book A Call
                    </Button>
                  </Box>
                ):null
              }
              <Box sx={{display:'flex', flexWrap:'wrap', alignItems:'center', mt:{xs:1, md:0}}}>
                <Box component="span" sx={{color:'white',cursor:"pointer", ml:2}} onClick={() => setModalShow(true)}>Logout</Box>
                  <LogoutIcon
                    onClick={() => setModalShow(true)}
                    sx={{ textAlign: "left", cursor: "pointer", marginTop: '-8px', marginLeft:'10px' }}
                    className="serchbarrighticon"
                    />
                </Box>
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
              <Grid container spacing={1}>
                <Grid item sm={4}>
                  <Button
                    type="button"
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
                <Grid item sm={6}>
                  <Button
                    type="button"
                    onClick={() => {
                      setModalShow(false);
                    }}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </Modal.Body>
            {/* <Modal.Footer></Modal.Footer> */}
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
