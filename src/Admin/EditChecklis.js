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
    formik.values.json_data = JSON.parse(data);
    setData(JSON.parse(data));
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
      <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #dee2e6', paddingBottom:'15px', marginBottom:'40px'}}>Create Checklist</Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <Grid container mt={2}>
          <Grid xs={2}>
            {Togal ? (
              <ArrowBackIcon
                className="back-icon-proact"
                onClick={() => Navigate("/Productlist/moduleList")}              
              />
            ) : null}
          </Grid>
          <Grid className='vie-doc-btn chek-btn-size' xs={10} mt={2}>
            <div >
              {Togal ? (
                <Button
                  mt={1}
                  type="submit"
                  className={"A1"}
                  variant="contained"
                >
                  Generate Checklist
                </Button>
              ) : null}

              {Togal ? (
                <Button
                  onClick={() => {
                    childRef.current.getFormData();
                  }}
                  sx={{ marginLeft: "10px"}} 
                  className={"A1"}
                  variant="contained"
                >
                  Preview
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setTogal(true);
                  }}
                  sx={{ marginLeft: "10%"}}
                  className={"A1"}
                  variant="contained"
                >
                  Hide Preview
                </Button>
              )}
            </div>
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid xs={12}>
            <Box mb={3}>
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
        </Grid>
      </Box>
      {Togal ? (
        <FormBuilder
          EditData={EditData ? JSON.parse(EditData?.json_data) : ""}
          ref={childRef}
          GetDataTogle={GetDataTogle}
          GetData={GetData}
        />
      ) : (
          <Grid container mt={2}>
          {Data?.map((item, index) => {
            return (
                <Grid xl={6}>
                  <form>
                    {item.type == "header" ? (
                      <h1 style={{textAlign:'left', fontSize:'20px', fontWeight:'600'}}>{item.label}</h1>
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
                            variant="filled"
                          />
                        </Box>
                    ) : null}
                    {item.type == "checkbox-group" ? (
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
                        </FormControl>
                    ) : null}
                    {item.type == "file" ? (
                        <Box mt={3}>
                          <FormLabel component="legend">{item.label}</FormLabel>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            type="file"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                          />
                        </Box>
                    ) : null}
                    {item.type == "date" ? (
                        <Box mt={3}>
                          <FormLabel component="legend">{item.label}</FormLabel>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="filled"
                          />
                        </Box>
                    ) : null}
                    {item.type == "select" ? (
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
                    ) : null}
                    {item.type == "autocomplete" ? (
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
                    ) : null}
                    {item.type == "number" ? (
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
                    ) : null}
                    {item.type == "paragraph" ? (
                      <p>
                        {item.label}
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
                          <TextareaAutosize
                            aria-label="empty textarea"
                          />
                        </FormControl>
                      </Box>
                    ) : null}
                    {item.type == "button" ? (
                      <Button
                        sx={{my:5}}
                        type="submit"
                        className={"A1"}
                        variant="contained"
                      >
                        {item.label}
                      </Button>
                    ) : null}
                  </form>
                </Grid>
            );
          })}
          </Grid>
        )}
    </div>
  );
}
