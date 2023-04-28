import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import List from "@mui/material/List";
// import Divider from '@mui/material/Divider';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from "@mui/icons-material/Description";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Logo from "../img/title.svg";
import Logo1 from "../img/LogoSvg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PersonIcon from "@mui/icons-material/Person";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PhoneIcon from "@mui/icons-material/Phone";
import ClearIcon from "@mui/icons-material/Clear";
const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [Count, setCount] = useState(0);
  const [hideShow, sethideShow] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [Data, setData] = useState(JSON.parse(localStorage.getItem("userdata")));
      
  const Navigate = useNavigate();
  const loaction = useLocation();
  const ref = useRef(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const Activeclass = (item) => {
    Navigate(item);
    // setCount(Count + 1);
    sethideShow(false)
  };
  // useEffect(() => {
  //   console.log("first",ref.current ? ref.current.offsetWidth : 0)
  // }, [ref?.current?.offsetWidth])
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("userdata")))
    console.log(JSON.parse(localStorage.getItem("userdata")))
    window.addEventListener("Togle", () => sethideShow(true));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Token") && localStorage.getItem("role") == 1 || localStorage.getItem("role") == 2) {
      setAdmin(true)
    }else{
      setAdmin(false)
    }
    // else{
    //   setAdmin(false)
    // }
  }, [])

  window.addEventListener("Admin", () => setTimeout(() => {
    setAdmin(!Admin)
  },));
  return (
    <>
      {/* columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
      {loaction.pathname == "/login" ? null : (
        <>
          {hideShow ? (
            <div
              className="newside"
              style={{
                position: "absolute",
                backgroundColor: "white",
                height: "100vh",
                width: "300px",
              }}
            >
              <div>
                <div style={{ display: "flex", paddingLeft: "20%" }}>
                  <img
                    style={{ marginLeft: "30px" }}
                    onClick={() => {
                      // alert()
                      Activeclass("/");
                    }}
                    src={Logo}
                    width={90}
                    alt=""
                  />
                  <p onClick={() => sethideShow(false)} style={{ marginLeft: "20%", fontSize: "55px" }}>

                    <ClearIcon />
                  </p>
                </div>

                {/* <Typography className='pagestxt' >pages</Typography> */}
                <List md={2} lg={2} mt={8} sm={0} xl={2} item xs={2}>
                  {Admin ? <>

                    <ListItem
                      className={
                        loaction.pathname == "/DashBoard" || loaction.pathname == "/Admin" ? "active" : ""
                      }
                      onClick={() => {
                        Activeclass("/DashBoard");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <DashboardIcon
                            className={
                              loaction.pathname == "/DashBoard" || loaction.pathname == "/Admin" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Admin DashBoard"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={
                        loaction.pathname == "/UserList" ||
                          loaction.pathname == "/UserActionView" ||
                          loaction.pathname == "/UserAnsView" ||
                          loaction.pathname == "/ActiveModuleByUser"

                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        Activeclass("/UserList");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonIcon
                            className={
                              loaction.pathname == "/UserList" ||
                                loaction.pathname == "/UserActionView"
                                || loaction.pathname == "/ActiveModuleByUser"
                                || loaction.pathname == "/UserAnsView"
                                ? "active"
                                : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"User List "} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={loaction.pathname == "/callList" ? "active" : ""}
                      onClick={() => {
                        Activeclass("/callList");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <PhoneIcon
                            className={
                              loaction.pathname == "/callList" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Book Call List "} />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      className={
                        loaction.pathname.includes("Product") ? "active" : ""
                      }
                      onClick={() => {
                        Activeclass("/Productlist");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Inventory2Icon
                            className={
                              loaction.pathname.includes("Product") ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Product List"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={
                        loaction.pathname.includes("Modules") || loaction.pathname == "/Admin/AllDocumentAdmin" || loaction.pathname == "/CreateDocuments" || loaction.pathname == "/EditDocument" ? "active" : ""
                      }
                      onClick={() => {
                        Activeclass("/ModulesList");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <WysiwygIcon
                            className={
                              loaction.pathname.includes("Modules") || loaction.pathname == "/Admin/AllDocumentAdmin" || loaction.pathname == "/CreateDocuments" || loaction.pathname == "/EditDocument" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Modules List"} />
                      </ListItemButton>
                    </ListItem>
                  </> : <>
                    <ListItem
                      className={loaction.pathname == "/" ? "active" : ""}
                      onClick={() => {
                        Activeclass("/");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <DashboardIcon
                            className={loaction.pathname == "/" ? "active" : ""}
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="hidetext"
                          sm={0}
                          xl={0}
                          primary={"Dashboard"}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={loaction.pathname == "/Files" ? "active" : ""}
                      onClick={() => {
                        Activeclass("/Files");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <DescriptionIcon
                            className={
                              loaction.pathname == "/Files" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Files"} />
                      </ListItemButton>
                    </ListItem>

                    <Accordion
                      style={{ width: "100%" }}
                      className="Accordion123"
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                      sx={{ borderBottom: "none !important" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className="product Accordion1 Accordion123"
                      >
                        <ListItem className="product" disablePadding>
                          <ListItemButton className="product">
                            <ListItemIcon className="product">
                              <Inventory2Icon />
                            </ListItemIcon>
                            <ListItemText primary={"Products"} />
                          </ListItemButton>
                        </ListItem>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* <Typography className='pagestxt1' >NDIS</Typography> */}

                        <ListItem
                          className={
                            loaction.pathname.includes("/Modelus") ? "active" : ""
                          }
                          onClick={() => {
                            Activeclass("/Modelus");
                          }}
                          disablePadding
                        >
                          <ListItemButton sx={{ marginLeft: "33px" }}>
                            <ListItemText primary={"NDIS"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"SDA"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Aged care"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Child care"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Vaccines"} />
                          </ListItemButton>
                        </ListItem>
                      </AccordionDetails>
                    </Accordion>
                  </>}
                </List>
                <Box
                  position={"absolute"}
                  bottom="0px"
                  sx={{
                    backgroundColor: "#0CB4D0",
                    width: "100%",
                    paddingTop: "30px",
                    paddingBottom: "4px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => Navigate(Admin?"/Profile/Admin":"/profile")}
                >
                  <Grid container spacing={2}>
                    <Grid className="profile" xs={2}>
                      <img
                        style={{ borderRadius: "50%" }}
                        src={
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        width={70}
                        alt=""
                      />
                    </Grid>
                    <Grid xs={10}>
                      <Typography m={0} p={0}>
                        {Data?.name}
                      </Typography>
                      <Typography m={0} p={0} pl={1}>
                        {" "}
                        {Data?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          ) : (
            <Grid
              className="leftCol"
              sx={{ height: "100vh", overflow: "auto" }}
              pb={12}
              md={2}
              lg={2}
              sm={2}
              xl={2}
              item
              xs={2}
            >
              <div className="leftCol">
                <img
                  onClick={() => {
                    // alert()
                    Activeclass("/");
                  }}
                  src={Logo1}
                  width={"100%"}
                  alt=""
                />

                {/* <Typography className='pagestxt' >pages</Typography> */}
                <List md={2} lg={2} mt={8} sm={0} xl={2} item xs={2}>
                  {Admin ? <>

                    <ListItem
                      className={
                        loaction.pathname == "/DashBoard" || loaction.pathname == "/Admin" ? "active" : ""
                      }
                      onClick={() => {
                        Activeclass("/DashBoard");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <DashboardIcon
                            className={
                              loaction.pathname == "/DashBoard" || loaction.pathname == "/Admin" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Admin DashBoard"} />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      className={
                        loaction.pathname == "/UserList" ||
                          loaction.pathname == "/UserActionView" ||
                          loaction.pathname == "/UserAnsView" ||
                          loaction.pathname == "/ActiveModuleByUser"
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        Activeclass("/UserList");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonIcon
                            className={
                              loaction.pathname == "/UserList" ||
                                loaction.pathname == "/UserActionView" ||
                                loaction.pathname == "/UserAnsView" ||
                                loaction.pathname == "/ActiveModuleByUser"
                                ? "active"
                                : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"User List "} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={loaction.pathname == "/callList" ? "active" : ""}
                      onClick={() => {
                        Activeclass("/callList");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <PhoneIcon
                            className={
                              loaction.pathname == "/callList" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Book Call List "} />
                      </ListItemButton>
                    </ListItem>

                    <ListItem
                      className={
                        loaction.pathname.includes("Product") ? "active" : ""
                      }
                      onClick={() => {
                        Activeclass("/Productlist");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Inventory2Icon
                            className={
                              loaction.pathname.includes("Product") ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Product List"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={
                        loaction.pathname.includes("Modules") || loaction.pathname == "/Admin/AllDocumentAdmin" || loaction.pathname == "/CreateDocuments" || loaction.pathname == "/EditDocument" ? "active" : ""
                      }
                      onClick={() => {
                        Activeclass("/ModulesList");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <WysiwygIcon
                            className={
                              loaction.pathname.includes("Modules") || loaction.pathname == "/Admin/AllDocumentAdmin" || loaction.pathname == "/CreateDocuments" || loaction.pathname == "/EditDocument" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Modules List"} />
                      </ListItemButton>
                    </ListItem>
                  </> : <>
                    <ListItem
                      className={loaction.pathname == "/" ? "active" : ""}
                      onClick={() => {
                        Activeclass("/");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <DashboardIcon
                            className={loaction.pathname == "/" ? "active" : ""}
                          />
                        </ListItemIcon>
                        <ListItemText
                          className="hidetext"
                          sm={0}
                          xl={0}
                          primary={"Dashboard"}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      className={loaction.pathname == "/Files" ? "active" : ""}
                      onClick={() => {
                        Activeclass("/Files");
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <DescriptionIcon
                            className={
                              loaction.pathname == "/Files" ? "active" : ""
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={"Files"} />
                      </ListItemButton>
                    </ListItem>

                    <Accordion
                      style={{ width: "100%" }}
                      className="Accordion123"
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                      sx={{ borderBottom: "none !important" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className="product Accordion1 Accordion123"
                      >
                        <ListItem className="product" disablePadding>
                          <ListItemButton className="product">
                            <ListItemIcon className="product">
                              <Inventory2Icon />
                            </ListItemIcon>
                            <ListItemText primary={"Products"} />
                          </ListItemButton>
                        </ListItem>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ListItem
                          className={
                            loaction.pathname.includes("/Modelus") ? "active" : ""
                          }
                          onClick={() => {
                            Activeclass("/Modelus");
                          }}
                          disablePadding
                        >
                          <ListItemButton sx={{ marginLeft: "33px" }}>
                            <ListItemText primary={"NDIS"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"SDA"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Aged care"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Child care"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem className="childA" disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Vaccines"} />
                          </ListItemButton>
                        </ListItem>
                      </AccordionDetails>
                    </Accordion>
                  </>}
                </List>
                <Box
                  position={"absolute"}
                  bottom="0px"
                  sx={{
                    backgroundColor: "#0CB4D0",
                    width: "15%",
                    paddingTop: "30px",
                    paddingBottom: "4px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => Navigate(Admin?"/Profile/Admin":"/profile")}
                >
                  <Grid container spacing={2}>
                    <Grid className="profile" xs={2}>
                      <img
                        style={{ borderRadius: "50%" }}
                        src={
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        width={70}
                        alt=""
                      />
                    </Grid>
                    <Grid xs={10}>
                      <Typography m={0} p={0}>
                        {Data?.name}
                      </Typography>
                      <Typography m={0} p={0} pl={1}>
                        {" "}
                        {Data?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Sidebar;
