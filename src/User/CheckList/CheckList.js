import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Pagination,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
// import { FormBuilder } from 'react-form-builder2';;
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ExportChecklist from "../../Api/user/CheckList/ExportChecklist";

export const CheckList = () => {
  const Navigate = useNavigate();
  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("UserProduct"))
  );
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [ChecklistData, setChecklistData] = useState([]);
  const [Data, setData] = useState([]);
  const [FormData, setFormData] = useState([]);
  const CheckListGetData = () => {
    let obj = {
      id: localStorage.getItem("CheckList_id"),
    };
    ExportChecklist.CheckListView(obj).then((resp) => {
      if (resp.ok) {
        if (resp.data) {
          setData(JSON.parse(resp.data.data.json_data));
          setChecklistData(resp.data.data);
        }
      }
    });
  };
  useEffect(() => {
    CheckListGetData();
  }, []);
  return (
    <div>
      <Grid container mt={2}>
        <Grid xl={3}>
          <ArrowBackIcon
            onClick={() => Navigate("/Modelus")}
            style={{ color: "#0cb4d0", fontSize: "50px"}}
          />
        </Grid>
        {/* <Grid xl={3}></Grid> */}
        {/* <Grid xl={6}> */}
          {/* <div style={{ display: "flex" }}>
            <Button mt={1} onClick={() => Navigate("/Productlist/cretechalist")} sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Checklist</Button>

            <Button onClick={() => Navigate("/CreactModules")} sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"><EditCalendarIcon
              className={"active"}
            /> &nbsp; &nbsp; &nbsp; Create Modelus</Button>
          </div> */}
        {/* </Grid> */}
      </Grid>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const org = FormData.filter(function (element) {
            return element !== undefined;
          });
          let obj = {
            id: localStorage.getItem("CheckList_id"),
            user_id: UserData?.user_id,
            product_id: Product.id,
            json_data: org,
          };
          ExportChecklist.CheckListsend(obj)
            .then((resp) => {
              if (resp.data.message == "register checklist successfully") {
                toast.success("Register checklist successfully", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                Navigate("/Modelus");
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
        }}
      >
        {Data?.map((item, index) => {
          return (
            <Grid key={index} container mt={2}>
              {/* <Grid xl={3}></Grid> */}
              <Grid xl={12}>
                {item.type == "header" ? (
                  <Box variant="h1" fontSize={{xs:'20px', lg:'30px'}}>{item.label}</Box>
                ) : null}
                {item.type == "radio-group" ? (
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        {item.label}
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e, val) => {
                          FormData[index] = { question: item.label, Ans: val };
                          setFormData([...FormData]);
                        }}
                      >
                        {item.values?.map((value, i) => {
                          return (
                            <FormControlLabel
                              key={i}
                              value={value.value}
                              control={<Radio />}
                              label={value.label}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                ) : null}
                {item.type == "text" ? (
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        label={item.label}
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e, val) => {
                          FormData[index] = {
                            question: item.label,
                            Ans: e.target.value,
                          };
                          setFormData([...FormData]);
                        }}
                        variant="filled"
                      />
                    </Box>
                ) : null}
                {item.type == "checkbox-group" ? (
                  <>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">{item.label}</FormLabel>
                      <RadioGroup
                        onChange={(e, val) => {
                          FormData[index] = {
                            question: item.label,
                            Ans: e.target.value,
                          };
                          setFormData([...FormData]);
                        }}
                      >
                        {item.values.map((val, i) => (
                          <FormControlLabel
                            control={
                              <Radio
                                value={val.label}
                                key={i}
                                name={val.label}
                              />
                            }
                            label={val.label}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </>
                ) : null}
                {item.type == "date" ? (
                  <>
                    <Box mt={3}>
                      <FormLabel component="legend">{item.label}</FormLabel>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        // label={item.label}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        onChange={(e, val) => {
                          FormData[index] = {
                            question: item.label,
                            Ans: e.target.value,
                          };
                          setFormData([...FormData]);
                        }}
                      />
                    </Box>
                  </>
                ) : null}
                {item.type == "select" ? (
                  <>
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        {item.label}
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: item.label,
                          id: "uncontrolled-native",
                        }}
                        onChange={(e, val) => {
                          FormData[index] = {
                            question: item.label,
                            Ans: e.target.value,
                          };
                          setFormData([...FormData]);
                        }}
                      >
                        <option value={""}></option>
                        {item.values.map((val, i) => {
                          return <option value={val.value}>{val.label}</option>;
                        })}
                      </NativeSelect>
                    </FormControl>
                  </>
                ) : null}
                {item.type == "autocomplete" ? (
                  <>
                    <FormControl fullWidth>
                      <Autocomplete
                        options={item.values}
                        id="disable-close-on-select"
                        // disableCloseOnSelect
                        onChange={(event, value) =>{      FormData[index] = {
                          question: item.label,
                          Ans: value.value,
                        };
                        setFormData([...FormData]);} }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                         
                            label={item.label}
                            value={FormData[index]?.Ans}
                            variant="standard"
                          />
                        )}
                      />
                    </FormControl>
                  </>
                ) : null}
                {item.type == "number" ? (
                  <>
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        label={item.label}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e, val) => {
                          FormData[index] = {
                            question: item.label,
                            Ans: e.target.value,
                          };
                          setFormData([...FormData]);
                        }}
                        variant="filled"
                      />
                    </Box>
                  </>
                ) : null}
                {item.type == "paragraph" ? (
                  <p>
                    <center>{item.label}</center>{" "}
                  </p>
                ) : null}
                {item.type == "textarea" ? (
                  <Box mt={1}>
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        {item.label}
                      </InputLabel>
                      <br />
                      <br />
                      <br />
                      <TextareaAutosize
                        aria-label="empty textarea"
                        // placeholder="Empty"
                        // style={{ width: 200 }}
                        onChange={(e, val) => {
                          FormData[index] = {
                            question: item.label,
                            Ans: e.target.value,
                          };
                          setFormData([...FormData]);
                        }}
                      />
                    </FormControl>
                  </Box>
                ) : null}
                {item.type == "button" ? (
                  <Button
                    type={item.subtype}
                    className={"A1"}
                    variant="contained"
                  >
                    {item.label}
                  </Button>
                ) : null}
                {/* {item.type == "submit" ? (
                  <Button type={item.type} className={"A1"} variant="contained">
                    {item.label}
                  </Button>
                ) : null} */}
              </Grid>
            </Grid>
          );
        })}
      </form>
    </div>
  );
};
