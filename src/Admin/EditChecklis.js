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
import FormBuilder from "./FormB";
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
import ExportChecklist from "../Api/Admin/CheckList/ExportChecklist";
import { useEffect } from "react";
export default function EditChecklis() {
  const Navigate = useNavigate();
  let prams = useParams();
  const childRef = useRef();
  const [formData, setFormData] = useState(null);
  const [EditData, setEditData] = useState();

  const [Product, setProduct] = useState(
    JSON.parse(localStorage.getItem("Product"))
  );
  const [Togal, setTogal] = useState(true);
  const [Data, setData] = useState();
  const handleSubmit = (data) => {
    setFormData(data);
  };

  const GetData = (data) => {
    console.log({ data });
    formik.values.json_data = JSON.parse(data);
    setData(JSON.parse(data));
    console.log(formik.values);
  };
  const GetDataTogle = (data) => {
    formik.values.json_data = JSON.parse(data);
    setData(JSON.parse(data));
    setTimeout(() => {
      setTogal(false);
    });
  };
  const GetDataEdit = () => {
    let obj = {
      id: prams.id,
    };
    ExportChecklist.ChecklisGetEditData(obj).then((resp) => {
      if (resp.ok) {
        console.log("ExportChecklist", resp.data.data);
        if (resp.data.data[0]) {
          setEditData(resp.data.data[0]);
        }
      }
    });
  };
  useEffect(() => {
    GetDataEdit();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: EditData?.title ? EditData?.title : "",
      id: prams.id,
      json_data: "",
      product_id: Product.products_id,
      status: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Enter your Document title"),
    }),
    onSubmit: (values) => {
      childRef.current.getFormData1();
      setTimeout(() => {
        ExportChecklist.ChecklisUpdate(values)
          .then((resp) => {
            console.log(resp);
            if (resp.data.message == " Update checklist details successfully") {
              toast.success("Checklist Update successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              Navigate("/Productlist/moduleList");
            } else {
              toast.error("Something went rong", {
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
            toast.error("Something went rong", {
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
      {console.log({ Data })}
      <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        Create Checklist
      </Typography>
      <hr height={3} />
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={4} mt={2}>
          <Grid xl={3}>
            {Togal ? (
              <ArrowBackIcon
                onClick={() => Navigate("/Productlist/moduleList")}
                style={{
                  color: "#0cb4d0",
                  fontSize: "50px",
                  marginLeft: "18px",
                }}
              />
            ) : null}
          </Grid>
          <Grid xl={6} mt={2}>
            <div style={{ display: "flex" }}>
              {Togal ? (
                <Button
                  mt={1}
                  sx={{ marginLeft: "10%" }}
                  type="submit"
                  className={"A1"}
                  variant="contained"
                >
                  {" "}
                  Generate Checklist
                </Button>
              ) : null}

              {Togal ? (
                <Button
                  onClick={() => {
                    childRef.current.getFormData();
                  }}
                  sx={{ marginLeft: "10%" }}
                  className={"A1"}
                  variant="contained"
                >
                  Preview{" "}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setTogal(true);
                  }}
                  sx={{ marginLeft: "10%" }}
                  className={"A1"}
                  variant="contained"
                >
                  Hide Preview{" "}
                </Button>
              )}
            </div>
          </Grid>
          <Grid xl={3}></Grid>
        </Grid>
        <Grid container spacing={4} mt={2}>
          <Grid xl={3} md={3}></Grid>
          <Grid xl={6} md={6}>
            <Box mt={3}>
              <TextField
                fullWidth
                id="fullWidth"
                label="CheckList Title"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                autoComplete="current-number"
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </Box>
          </Grid>
          <Grid xl={3}></Grid>
        </Grid>
      </Box>
      <br />
      <br />
      <br />
      {Togal ? (
        <>
          <FormBuilder
            EditData={EditData ? JSON.parse(EditData?.json_data) : ""}
            ref={childRef}
            GetDataTogle={GetDataTogle}
            GetData={GetData}
          />
        </>
      ) : (
        <>
          {Data?.map((item, index) => {
            return (
              <Grid key={index} container spacing={4} mt={2}>
                <Grid xl={3}></Grid>
                <Grid xl={6}>
                  <form>
                    {item.type == "header" ? (
                      <h1>
                        <center>{item.label}</center>{" "}
                      </h1>
                    ) : null}
                    {item.type == "radio-group" ? (
                      <>
                        {" "}
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            {item.label}
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
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
                      </>
                    ) : null}
                    {item.type == "text" ? (
                      <>
                        {" "}
                        <Box mt={3}>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            label={item.label}
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                          />
                        </Box>
                      </>
                    ) : null}
                    {item.type == "checkbox-group" ? (
                      <>
                        <FormControl
                          sx={{ m: 3 }}
                          component="fieldset"
                          variant="standard"
                        >
                          <FormLabel component="legend">{item.label}</FormLabel>
                          <FormGroup>
                            {item.values.map((val, i) => (
                              <FormControlLabel
                                control={<Checkbox key={i} name="gilad" />}
                                label={val.label}
                              />
                            ))}
                          </FormGroup>
                          {/* <FormHelperText>Be careful</FormHelperText> */}
                        </FormControl>
                      </>
                    ) : null}
                    {item.type == "file" ? (
                      <>
                        <Box mt={3}>
                          <FormLabel component="legend">{item.label}</FormLabel>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            // label={item.label}
                            type="file"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                          />
                        </Box>
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
                              name: "age",
                              id: "uncontrolled-native",
                            }}
                          >
                            <option value={""}></option>
                            {item.values.map((val, i) => {
                              return (
                                <option value={val.value}>{val.label}</option>
                              );
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
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={item.label}
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
                          />
                        </FormControl>
                      </Box>
                    ) : null}
                    {item.type == "button" ? (
                      <Button
                        type="submit"
                        className={"A1"}
                        variant="contained"
                      >
                        {item.label}
                      </Button>
                    ) : null}
                  </form>
                </Grid>
                <Grid xl={3}></Grid>
              </Grid>
            );
          })}
        </>
      )}
    </div>
  );
}