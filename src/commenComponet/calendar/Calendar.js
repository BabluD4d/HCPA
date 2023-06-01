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
import { Button, Grid } from "@mui/material";

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selected, setselected] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


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
        <div
          className="col col-center"
          style={{ fontWeight: "bold", fontSize: "26px" }}
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
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
          <div
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
            <span
              style={{
                fontWeight: "bold",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              {formattedDate}
            </span>
            {/* <span className="bg">{formattedDate}</span> */}
            <h6 style={{ fontSize: "23px" }}>{monthNames[d.getMonth()]}</h6>

            {isYesterday(format(cloneDay, "ccc dd MMM yy")) ? (
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
            ) : (
              <Button disabled variant={"outlined"}>
                Select Day
              </Button>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      if (rows == 0) {
        rows.push(
          <div className={"row"} key={day}>
            {days}
          </div>
        );
      }
      days = [];
    }
    return <div className="">{new Set(rows)}</div>;
  };
  const renderFooter = () => {
    return (
      <div className="">
        <Grid container mt={3} mb={3} spacing={1}>
          <Grid item xs={9}>
            {" "}
            <div className="">
              <div
                className=""
                style={{
                  textAlign: "left",
                  color: "#0CB4D0",
                  cursor: "pointer",
                  width: "fit-content",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                onClick={() => changeWeekHandle("prev")}
              >
                {"< "} Prev week
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            {" "}
            <div className="">
              <div
                onClick={() => changeWeekHandle("next")}
                className=""
                style={{
                  textAlign: "right",
                  width: "fit-content",
                  color: "#0CB4D0",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {" "}
                Next week {" >"}
              </div>
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
