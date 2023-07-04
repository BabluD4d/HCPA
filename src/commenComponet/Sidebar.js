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
import LockIcon from "@mui/icons-material/Lock";
import Logo from "../img/title.svg";
import Logo1 from "../img/LogoSvg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PersonIcon from "@mui/icons-material/Person";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PhoneIcon from "@mui/icons-material/Phone";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleIcon from "@mui/icons-material/People";
import ExportProduct from "../Api/user/Product/ExportProduct";
const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [Count, setCount] = useState();
  const [ProductData, setProductData] = useState([]);
  const [hideShow, sethideShow] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [Data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const Navigate = useNavigate();
  const loaction = useLocation();
  const ref = useRef(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const Activeclass = (item) => {
    if (item.includes("/Modelus")) {
      Navigate(item);
      sethideShow(false);
    } else {
      // alert(2)

      localStorage.removeItem("activeProduct");
      localStorage.removeItem("UserProduct");
      Navigate(item);
      setCount();
      sethideShow(false);
    }
  };
  useEffect(() => {
    setCount(localStorage.getItem("activeProduct"));
    GetData();
    setData(JSON.parse(localStorage.getItem("userdata")));
  }, []);

  window.addEventListener("Togle", TogleFu);
  function eventHandler() {
    setData(JSON.parse(localStorage.getItem("userdata")));
    // Event handling logic goes here
    // Remove the event listener after it is fired
    window.removeEventListener("UserChange", eventHandler);
  }
  function TogleFu() {
    sethideShow(!hideShow);
    // Event handling logic goes here
    // Remove the event listener after it is fired
    window.removeEventListener("Togle", TogleFu);
  }

  window.addEventListener("UserChange", eventHandler);
  useEffect(() => {
    if (
      (localStorage.getItem("Token") && localStorage.getItem("role") == 1) ||
      localStorage.getItem("role") == 2 ||
      localStorage.getItem("role") == 4 ||
      localStorage.getItem("role") == 5 ||
      localStorage.getItem("role") == 6 ||
      localStorage.getItem("role") == 7 ||
      localStorage.getItem("role") == 8
    ) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);
  useEffect(() => {
    if (!loaction.pathname.includes("/Modelus")) {
      localStorage.removeItem("activeProduct");
      localStorage.removeItem("UserProduct");
      setCount();
    }
  }, [loaction.pathname]);

  const GetData = () => {
    let obj = {
      user_id: Data.user_id,
    };
    // alert(Data.user_id)
    ExportProduct.ProductList(obj).then((resp) => {
      if (resp.data.msg == "Unauthenticated.") {
        localStorage.clear();
        Navigate("/");
      } else {
        if (resp.ok) {
          if (resp.data) {
            setProductData(resp.data.data.product);
          }
        }
      }
    });
  };
  window.addEventListener("Admin", () =>
    setTimeout(() => {
      setAdmin(!Admin);
    })
  );

  return (
    <>
      {/* columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
      {loaction.pathname == "/login" ? null : (
        <>
          {hideShow ? (
            <div
              className="newside"
              style={{
                position: "fixed",
                backgroundColor: "white",
                height: "calc(100vh - 90px)",
                maxWidth: "300px",
                width: "100%",
                top: "90px",
                bottom: 0,
                boxShadow: "0px 0 10px -3px #212529",
              }}
            >
              <div style={{ height: "100vh", paddingBottom: "100px" }}>
                {/* <div style={{ display: "flex", paddingLeft: "20%" }}>
                  <img
                    style={{ marginLeft: "30px" }}
                    onClick={() => {
                      Activeclass("/Home");
                    }}
                    src={Logo}
                    width={90}
                    alt=""
                  />
                  <p onClick={() => sethideShow(false)} style={{ marginLeft: "20%", fontSize: "55px" }}>

                    <ClearIcon />
                  </p>
                </div> */}

                {/* <Typography className='pagestxt' >pages</Typography> */}
                <List
                  md={2}
                  lg={2}
                  mt={8}
                  sm={0}
                  xl={2}
                  item
                  xs={2}
                  sx={{
                    overflowY: "auto",
                    height: "100%",
                    paddingBottom: "90px",
                  }}
                >
                  {Admin ? (
                    <>
                      <ListItem
                        className={
                          loaction.pathname == "/DashBoard" ||
                          loaction.pathname == "/Admin"
                            ? "active"
                            : ""
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
                                loaction.pathname == "/DashBoard" ||
                                loaction.pathname == "/Admin"
                                  ? "active"
                                  : ""
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
                          loaction.pathname == "/CreateUser" ||
                          loaction.pathname == "/CreateStaff" ||
                          loaction.pathname == "/ActiveModuleByUser" ||
                          loaction.pathname.includes("/UserList/")
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
                                loaction.pathname == "/ActiveModuleByUser" ||
                                loaction.pathname == "/CreateUser" ||
                                loaction.pathname == "/CreateStaff" ||
                                loaction.pathname == "/UserAnsView" ||
                                loaction.pathname.includes("/UserList/")
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"User List "} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        className={
                          loaction.pathname == "/callList" ? "active" : ""
                        }
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
                                loaction.pathname.includes("Product")
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Product List"} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        className={
                          loaction.pathname.includes("Modules") ||
                          loaction.pathname == "/Admin/AllDocumentAdmin" ||
                          loaction.pathname == "/CreateDocuments" ||
                          loaction.pathname == "/EditDocument"
                            ? "active"
                            : ""
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
                                loaction.pathname.includes("Modules") ||
                                loaction.pathname ==
                                  "/Admin/AllDocumentAdmin" ||
                                loaction.pathname == "/CreateDocuments" ||
                                loaction.pathname == "/EditDocument"
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Modules List"} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        className={
                          loaction.pathname == "/UserDeshboard" ? "active" : ""
                        }
                        onClick={() => {
                          Activeclass("/UserDeshboard");
                        }}
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <PeopleIcon
                              className={
                                loaction.pathname == "/UserDeshboard"
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Client Portal"} />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem
                        className={loaction.pathname == "/Home" ? "active" : ""}
                        onClick={() => {
                          Activeclass("/");
                        }}
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <DashboardIcon
                              className={
                                loaction.pathname == "/Home" ? "active" : ""
                              }
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
                        className={
                          loaction.pathname == "/Files" ? "active" : ""
                        }
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
                        defaultExpanded
                        style={{ width: "100%" }}
                        className="Accordion123"
                        // expanded={expanded === "panel1"}
                        // onChange={handleChange("panel1")}
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
                          {ProductData?.map((val, i) => (
                            <>
                              {val.purchase_status == "1" ? (
                                <ListItem
                                  key={i}
                                  className={
                                    Count == val.id
                                      ? "active childA "
                                      : "childA"
                                  }
                                  onClick={() => {
                                    setCount(val.id);
                                    setTimeout(() => {
                                      window.dispatchEvent(
                                        new Event("activeProduct")
                                      );
                                    });
                                    localStorage.setItem(
                                      "UserProduct",
                                      JSON.stringify(val)
                                    );
                                    localStorage.setItem(
                                      "activeProduct",
                                      val.id
                                    );
                                    Activeclass("/Modelus", val.id);
                                  }}
                                  disablePadding
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <LockOpenIcon
                                        className={
                                          Count == val.id
                                            ? "active IList"
                                            : "IList"
                                        }
                                      />
                                    </ListItemIcon>
                                    <ListItemText primary={val.product_name} />
                                  </ListItemButton>
                                </ListItem>
                              ) : (
                                <ListItem
                                  key={i}
                                  onClick={() => {
                                    setCount();
                                    localStorage.setItem(
                                      "UserProduct",
                                      JSON.stringify(val)
                                    );
                                    Activeclass("/Modelus");
                                    localStorage.setItem(
                                      "activeProduct",
                                      val.id
                                    );
                                    window.dispatchEvent(
                                      new Event("activeProduct")
                                    );
                                  }}
                                  className="childA"
                                  disablePadding
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <LockIcon className="IList" />
                                    </ListItemIcon>
                                    <ListItemText primary={val.product_name} />
                                  </ListItemButton>
                                </ListItem>
                              )}
                            </>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}
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
                >
                  <Grid container spacing={2}>
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundColor: "#0CB4D0",
                        width: "100%",
                        left: 0,
                        bottom: 0,
                        paddingTop: "25px",
                        paddingBottom: "25px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        textAlign: "center",
                        // cursor: "pointer",
                        color: "white",
                      }}
                      // onClick={() => Navigate(Admin?"/Profile/Admin":"/profile")}
                    >
                      <Grid container alignItems="center">
                        <Grid
                          item
                          className="profile"
                          xs={12}
                          sx={{ textAlign: "left" }}
                        >
                          <img
                            style={{ borderRadius: "50%" }}
                            src={
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                            }
                            width={70}
                            alt=""
                          />
                        </Grid>
                        <Grid item xs={12} textAlign="left">
                          <Typography textTransform="capitalize">{`[${Data?.name}]`}</Typography>
                          <Typography>{Data?.email}</Typography>
                          <Typography
                            sx={{ textAlign: "right", cursor: "pointer" }}
                            onClick={() =>
                              Navigate(Admin ? "/Profile/Admin" : "/profile")
                            }
                          >
                            Edit Profile
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              style={{
                                fontSize: "14px",
                                width: "20px",
                                marginTop: "-15px",
                                marginLeft: "10px",
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* <Grid className="profile" xs={2}>
                      <img
                        style={{ borderRadius: "50%" }}
                        src={
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        width={70}
                        alt=""
                      />
                    </Grid> */}
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
              item
              className="leftCol"
              sx={{
                position: "fixed",
                left: 0,
                top: 90,
                width: 320,
                maxWidth: "100%",
                zIndex: 8,
                background: "#ffffff",
                height: "calc(100vh - 90px)",
                overflow: "auto",
                boxShadow: "0px 0 10px -3px #212529",
              }}
              // sx={{ height: 'calc(100vh - 90px)', overflow: "auto", boxShadow:'0px 0 10px -3px #212529', position:'relative' }}
              // pb={12}
              md={2}
              lg={2}
              sm={2}
              xl={2}
              xs={2}
            >
              <div
                className="leftCol"
                style={{
                  height: "100%",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {/* <div style={{backgroundColor:"#233b77"}}> */}

                {/* <img
                  onClick={() => {Activeclass("/")}}
                  src={Logo1}
                  width={"90%"}
                  style={{margin:'auto', display:'block'}}
                  alt=""
                /> */}
                {/* </div>
                 */}
                {/* <Typography className='pagestxt' >pages</Typography> */}
                <List
                  md={2}
                  lg={2}
                  mt={8}
                  sm={0}
                  xl={2}
                  item
                  xs={2}
                  p={0}
                  sx={{ height: "calc(100% - 192px)", overflow: "auto" }}
                >
                  {Admin ? (
                    <>
                      <ListItem
                        className={
                          loaction.pathname == "/DashBoard" ||
                          loaction.pathname == "/Admin"
                            ? "active"
                            : ""
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
                                loaction.pathname == "/DashBoard" ||
                                loaction.pathname == "/Admin"
                                  ? "active"
                                  : ""
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
                          loaction.pathname == "/CreateUser" ||
                          loaction.pathname == "/CreateStaff" ||
                          loaction.pathname == "/ActiveModuleByUser" ||
                          loaction.pathname.includes("/UserList/")
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
                                loaction.pathname == "/CreateUser" ||
                                loaction.pathname == "/CreateStaff" ||
                                loaction.pathname == "/ActiveModuleByUser" ||
                                loaction.pathname.includes("/UserList/")
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"User List "} />
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        className={
                          loaction.pathname == "/callList" ? "active" : ""
                        }
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
                                loaction.pathname.includes("Product")
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Product List"} />
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        className={
                          loaction.pathname.includes("Modules") ||
                          loaction.pathname == "/Admin/AllDocumentAdmin" ||
                          loaction.pathname == "/CreateDocuments" ||
                          loaction.pathname == "/EditDocument"
                            ? "active"
                            : ""
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
                                loaction.pathname.includes("Modules") ||
                                loaction.pathname ==
                                  "/Admin/AllDocumentAdmin" ||
                                loaction.pathname == "/CreateDocuments" ||
                                loaction.pathname == "/EditDocument"
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Modules List"} />
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        className={
                          loaction.pathname == "/UserDeshboard" ? "active" : ""
                        }
                        onClick={() => {
                          Activeclass("/UserDeshboard");
                        }}
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <PeopleIcon
                              className={
                                loaction.pathname == "/UserDeshboard"
                                  ? "active"
                                  : ""
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={"Client Portal"} />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem
                        className={loaction.pathname == "/Home" ? "active" : ""}
                        onClick={() => {
                          Activeclass("/");
                        }}
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <DashboardIcon
                              className={
                                loaction.pathname == "/Home" ? "active" : ""
                              }
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
                        className={
                          loaction.pathname == "/Files" ? "active" : ""
                        }
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
                        defaultExpanded
                        style={{ width: "100%" }}
                        className="Accordion123"
                        // expanded={expanded === "panel1"}
                        // onChange={handleChange("panel1")}
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
                          {ProductData?.map((val, i) => (
                            <>
                              {val.purchase_status == "1" ? (
                                <ListItem
                                  key={i}
                                  className={
                                    Count == val.id
                                      ? "active childA "
                                      : "childA"
                                  }
                                  onClick={() => {
                                    setCount(val.id);
                                    setTimeout(() => {
                                      window.dispatchEvent(
                                        new Event("activeProduct")
                                      );
                                    }, 500);
                                    localStorage.setItem(
                                      "UserProduct",
                                      JSON.stringify(val)
                                    );
                                    localStorage.setItem(
                                      "activeProduct",
                                      val.id
                                    );
                                    Activeclass("/Modelus", val.id);
                                  }}
                                  disablePadding
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <LockOpenIcon
                                        className={
                                          Count == val.id
                                            ? "active IList"
                                            : "IList"
                                        }
                                      />
                                    </ListItemIcon>
                                    <ListItemText primary={val.product_name} />
                                  </ListItemButton>
                                </ListItem>
                              ) : (
                                <ListItem
                                  key={i}
                                  onClick={() => {
                                    setCount();
                                    localStorage.setItem(
                                      "UserProduct",
                                      JSON.stringify(val)
                                    );
                                    Activeclass("/Modelus");
                                    localStorage.setItem(
                                      "activeProduct",
                                      val.id
                                    );
                                    window.dispatchEvent(
                                      new Event("activeProduct")
                                    );
                                  }}
                                  className="childA"
                                  disablePadding
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <LockIcon className="IList" />
                                    </ListItemIcon>
                                    <ListItemText primary={val.product_name} />
                                  </ListItemButton>
                                </ListItem>
                              )}
                            </>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}
                </List>
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "#0CB4D0",
                    width: "100%",
                    left: 0,
                    bottom: 0,
                    paddingTop: "25px",
                    paddingBottom: "25px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    textAlign: "center",

                    color: "white",
                  }}
                  // onClick={() => Navigate(Admin?"/Profile/Admin":"/profile")}
                >
                  <Grid container>
                    <Grid
                      item
                      className="profile"
                      xs={12}
                      sx={{ textAlign: "left" }}
                    >
                      <img
                        style={{ borderRadius: "50%" }}
                        src={
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        width={70}
                        alt=""
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography textTransform="capitalize">{`[${Data?.name}]`}</Typography>
                      <Typography>{Data?.email}</Typography>
                      <Typography
                        sx={{ textAlign: "right", cursor: "pointer" }}
                        onClick={() =>
                          Navigate(Admin ? "/Profile/Admin" : "/profile")
                        }
                      >
                        Edit Profile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{
                            fontSize: "14px",
                            width: "20px",
                            marginTop: "-15px",
                            marginLeft: "10px",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
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
