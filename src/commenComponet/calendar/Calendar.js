import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import { Button, Grid, Card, Box } from "@mui/material";

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selected, setselected] = useState("");

  const monthNames = ["January",    "February",    "March",    "April",    "May",    "June",    "July",    "August",    "September",    "October",    "November",    "December"  ];

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 5; i++) {
      days.push(
        <Grid
          className="col col-center"
          sx={{ fontWeight: '500', fontSize: {xs:'18px', md:'24px'}, backgroundColor:'#0cb4d0', color: '#fff', borderRadius:'5px 5px 0 0', padding: '10px 0' }}
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </Grid>
      );
    }
    return <Box className="days row" sx={{textAlign:'center', gap:{xs:0.5, sm:2}, alignItems: 'center', margin:0}}>{days}</Box>;
  };
  function isYesterday(date) {
    const today = new Date();

    const selectDateUser = new Date(date);

    if (
      (today.getDate() == selectDateUser.getDate() &&
        today.getMonth() == selectDateUser.getMonth() &&
        today.getFullYear() === selectDateUser.getFullYear()) ||
      (today.getDate() < selectDateUser.getDate() &&
        today.getMonth() == selectDateUser.getMonth() &&
        today.getFullYear() === selectDateUser.getFullYear()) ||
      (today.getMonth() < selectDateUser.getMonth() &&
        today.getFullYear() === selectDateUser.getFullYear()) ||
      today.getFullYear() < selectDateUser.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 5 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let formattedMonth = "";
    let count = 0;
    while (day <= endDate) {
      count = count + 1;
      for (let i = 0; i < 5; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayStr = format(cloneDay, "ccc dd MMM yy");
        const d = new Date(dayStr);
        days.push(
          <Box sx={{textAlign:'center', background: 'rgb(128 128 128 / 5%)', paddingTop: {xs:'20px', sm:'24px'}, paddingBottom: {xs:'20px', sm:'24px'}, borderRadius: '0 0 5px 5px'}}
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <Box variant="span"
              sx={{
                fontWeight: "500",
                fontSize: {xs:'20px',sm:'30px', md:'40px'},
                display: 'inline-block',
                lineHeight:{xs:'16px', sm:'26px', md:"36px"}
              }}
            >
              {formattedDate}
            </Box>
            <Box variant="h6" sx={{fontSize: {xs:'16px', sm:'20px', md:"24px"}, marginBottom:{xs:'5px', md:'15px'} }}>{monthNames[d.getMonth()]}</Box>

            {isYesterday(format(cloneDay, "ccc dd MMM yy")) ? (
              <>
                <svg style={{borderRadius:'100%', padding:'5px', background:'#212529', color:'#ffffff'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {
                    setselected(format(cloneDay, "ccc dd MMM yy"));
                  }}
                  className={`select-day ${format(cloneDay, "ccc dd MMM yy") == selected ? "A1" : ""}`}
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <Button
                  onClick={() => {
                    setselected(format(cloneDay, "ccc dd MMM yy"));
                  }}
                  className={
                    format(cloneDay, "ccc dd MMM yy") == selected ? "A1" : "clu"
                  }
                  variant={
                    format(cloneDay, "ccc dd MMM yy") == selected
                    ? "contained"
                    : "outlined"
                  }
                  >
                  Select Day
                </Button>
                </>
            ) : (
              <>
                <svg style={{borderRadius:'100%', padding:'5px', background:'rgb(128 128 128 / 30%)', color:'white'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="select-day">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <Button disabled variant={"outlined"}>
                  Select Day
                </Button>
              </>
            )}
          </Box>
        );
        day = addDays(day, 1);
      }
      if (rows == 0) {
        rows.push(
          <Box className="row" sx={{margin:'0', gap:{xs:0.5, sm:2}}} key={day}>
            {days}
          </Box>
        );
      }
      days = [];
    }
    return <div className="">{new Set(rows)}</div>;
  };
  const renderFooter = () => {
    return (
      <div className="">
        <Grid container mt={1} mb={3}>
          <Grid item xs={6} sx={{textAlign:'left'}}>
            <div
              className=""
              style={{
                color: "#0CB4D0",
                cursor: "pointer",
                fontWeight: "bold",
                display:'inline-block'
              }}
              onClick={() => changeWeekHandle("prev")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{width:'15px', height:'15px', verticalAlign:'text-top'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg> Prev week
            </div>
          </Grid>
          <Grid item xs={6} sx={{textAlign:'right'}}>
              <div
                onClick={() => changeWeekHandle("next")}
                className=""
                style={{
                  textAlign: "right",
                  color: "#0CB4D0",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: 'inline-block'
                }}
              >
                Next week <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{width:'15px', height:'15px', verticalAlign:'text-top'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
          </Grid>
          {/* <div>{currentWeek}</div> */}
        </Grid>
      </div>
    );
  };
  return (
    <div className="calendar">
      {/* {renderHeader()} */}
      {renderFooter()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
