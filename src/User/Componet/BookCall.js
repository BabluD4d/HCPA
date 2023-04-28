import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CallCard from "../../commenComponet/CallCard";
import Calendar from "../../commenComponet/calendar/Calendar";
import Details from "../../commenComponet/calendar/Details";
import TimeButton from "../../commenComponet/TimeButton";
import Futer from "../../commenComponet/Futer";

const BookCall = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [select, setselect] = useState();
  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };
  const handleActiveTime = (time) => {
    setselect(time);
  };
  return (
    <div>
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Book a Call
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={2.5}></Grid>
        <Grid item xs={7}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "25px" }}>
            Select a call type
          </Typography>
          <Grid container ml={5} mt={2} spacing={3}>
            <CallCard
              d={
                "Curabitur ligula saplen, tincidunt none, euismod vitae, posuere  imperdiet , leo"
              }
              count={1}
            />
            <CallCard
              d={
                "Curabitur ligula saplen, tincidunt none, euismod vitae, posuere  imperdiet , leo"
              }
              count={2}
            />
            <CallCard
              d={
                "Curabitur ligula saplen, tincidunt none, euismod vitae, posuere  imperdiet , leo"
              }
              count={3}
            />
          </Grid>
          <Box mt={4} ml={6}>
            <Typography sx={{ fontSize: "25px" }}>
              Choose date and time
            </Typography>

            <Calendar showDetailsHandle={showDetailsHandle} />
            <br />
            {/* {showDetails && <Details data={data} />} */}
          </Box>
          <Typography mt={2} sx={{ fontSize: "20px", textAlign: "center" }}>
            Choose Time
          </Typography>
          <Box>
            <Grid container mt={2} spacing={1}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"9:00 AM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"9:30 AM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"10:00 AM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"10:30 AM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"11:00 AM"}
                  />
                  {/* <TimeButton select={select} handleActiveTime={handleActiveTime}  time={"11:30"}/> */}
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"12:00 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"12:30 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"1:00 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"1:30 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"2:00 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"2:30 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"3:00 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"3:30 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"4:00 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"4:30 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"5:00 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"5:30 PM"}
                  />
                  <TimeButton
                    select={select}
                    handleActiveTime={handleActiveTime}
                    time={"6:00 PM"}
                  />
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={2.5}></Grid>
      <Grid mt={6} container spacing={1}>
        <Grid item xs={2.5}></Grid>
        <Grid item xs={7}>
          <Box ml={6}>
            <Typography sx={{ fontSize: "25px" }}>
              Enter your information
            </Typography>
            <Box >
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
              />
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
                variant="filled"
              />
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
                variant="filled"
              />
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
                variant="filled"
              />
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
                variant="filled"
              />
              </Box>
              <Box mt={3}> 
              <center>
               
              <Button sx={{marginRight:"10px"}} className={"clu1"} variant={"contained"}>Cancel</Button>
              <Button sx={{marginLeft:"1opx"}} className={"A1"} variant="contained">Confirm Booking</Button>
              </center>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Futer />
    </div>
  );
};

export default BookCall;
