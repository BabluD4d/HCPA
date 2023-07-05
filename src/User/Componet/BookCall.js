import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CallCard from "../../commenComponet/CallCard";
import Calendar from "../../commenComponet/calendar/Calendar";
import Details from "../../commenComponet/calendar/Details";
import TimeButton from "../../commenComponet/TimeButton";
import Futer from "../../commenComponet/Futer";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ExportBookCall from "../../Api/user/BookCall/ExportBookCall";
const BookCall = () => {
  const Prams = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const [CallId, setCallId] = useState(Prams.id);
  const [DataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [data, setData] = useState(new Date());
  const timeSet = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'];
  const [select, setselect] = useState(timeSet[1]);
  const showDetailsHandle = (dayStr) => {
    console.log({dayStr})
    console.log(new Date(dayStr))
    setData(dayStr);
    setShowDetails(true);
  };
  const handleActiveTime = (time) => {
    setselect(time);
  };
  useEffect(() => {
    if (Prams?.id) {
      setCallId(Prams?.id);
    } else {
      setCallId(3);
    }
  }, []);
  const hendleCallis = (id) => {
    setCallId(id);
  };
  const formik = useFormik({
    initialValues: {
      full_name: "",
      call_type: CallId,
      contact_number: "",
      email: "",
      jobtitle: "",
      notes: "",
      date: "",
      time: select,
      user_id:DataUser.user_id
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      full_name: Yup.string().required("Enter your name"),
      jobtitle: Yup.string().required("Enter your job title"),
      notes: Yup.string().required("Enter your notes"),
      contact_number: Yup.number().required("Enter your Mobile Number"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Enter your email"),
    }),
    onSubmit: (values) => {
      let date= new Date(data)
      let Day=date.getDate()>=10?date.getDate():"0"+date.getDate()
      let Month= (date.getMonth() + 1)>=10?(date.getMonth() + 1):"0"+(date.getMonth() + 1)
      let Year= date.getFullYear()
      values.date=Year+"-"+Month+"-"+Day
      console.log(values) 
    // }
      setTimeout(() => {
        ExportBookCall.UserBookCall(values)
          .then((resp) => {
            formik.resetForm()
            if (resp.data.message == "create call successfully") {
              toast.success("create call successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              // Navigate("/Admin/AllDocumentAdmin");
            } else {
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
            }
          })
          .catch((err) =>
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
          );
      }, 1000);
    },
  });
  return (
    <div>
      <Typography fontSize={{xs:'20px', lg:'30px'}}>Book a Call</Typography>
      <Grid container>
        {/* <Grid item xs={2.5}></Grid> */}
        <Grid item xs={12}>
          <Typography mt={4} sx={{ fontSize: "25px" }}>
            Select a call type
          </Typography>
          <Grid container mt={2} spacing={3}>
            <CallCard
              Active={CallId == 1 ? "Purchase product" : false}
              d={
                "Curabitur ligula saplen, tincidunt none, euismod vitae, posuere  imperdiet , leo"
              }
              count={1}
              unactive={"Purchase product"}
              hendleCallis={hendleCallis}
            />
            <CallCard
              Active={CallId == 2 ? "Purchase Modules" : false}
              d={
                "Curabitur ligula saplen, tincidunt none, euismod vitae, posuere  imperdiet , leo"
              }
              count={2}
              unactive={"Purchase Modules"}
              hendleCallis={hendleCallis}
            />
            <CallCard
              Active={CallId == 3 ? "Other reasion Type" : false}
              d={
                "Curabitur ligula saplen, tincidunt none, euismod vitae, posuere  imperdiet , leo"
              }
              count={3}
              unactive={"Other reasion Type"}
              hendleCallis={hendleCallis}
            />
          </Grid>
          <Box>
            <Typography fontSize={{xs:'20px', lg:'24px'}} sx={{my:4}}>Choose date and time</Typography>
            <Calendar showDetailsHandle={showDetailsHandle} />
            {/* <br /> */}
            {/* {showDetails && <Details data={data} />} */}
          </Box>
          
        </Grid>
        <Grid container>                  
          <Grid item xs={12}>
          <Typography fontSize={{xs:'20px', lg:'24px'}} sx={{my:4}}>Choose Time</Typography>
            <Grid container>                  
            {
              timeSet.map((set, index)=>(
                <TimeButton
                  key={index}
                  select={select}
                  handleActiveTime={handleActiveTime}
                  time={set}
                  />
              ))
            }
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <Typography sx={{ fontSize: "25px", mt:5 }}>Enter your information</Typography>
              <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label="Full Name"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    name="full_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.full_name}
                  />
                  {formik.touched.full_name && formik.errors.full_name ? (
                    <div style={{ color: "red" }}>{formik.errors.full_name}</div>
                  ) : null}
                </Box>

                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label="Email"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="email"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                </Box>

                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label="Phone"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="contact_number"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact_number}
                  />
                  {formik.touched.contact_number && formik.errors.contact_number ? (
                    <div style={{ color: "red" }}>{formik.errors.contact_number}</div>
                  ) : null}
                </Box>

                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label="Job Title"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="jobtitle"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jobtitle}
                  />
                  {formik.touched.jobtitle && formik.errors.jobtitle ? (
                    <div style={{ color: "red" }}>{formik.errors.jobtitle}</div>
                  ) : null}
                </Box>

                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="Notes"
                    label="Notes"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="notes"
                    variant="filled"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.notes}
                  />
                  {formik.touched.notes && formik.errors.notes ? (
                    <div style={{ color: "red" }}>{formik.errors.notes}</div>
                  ) : null}
                </Box>

                <Box mt={3}>
                  <center>
                    <Button
                      sx={{ marginRight: "10px" }}
                      className={"clu1"}
                      variant={"contained"}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{ marginLeft: "1opx" }}
                      className={"A1"}
                      variant="contained"
                      type="submit"
                    >
                      Confirm Booking
                    </Button>
                  </center>
                </Box>

            </Box>
          </Grid>
        </Grid>
      </Grid>
       
      <Futer />
    </div>
  );
};

export default BookCall;
