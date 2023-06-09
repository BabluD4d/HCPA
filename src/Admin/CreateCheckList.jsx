import React, { useRef, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, Pagination, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import FormBuilder from './FormB';
import { Autocomplete,   Checkbox, FormControlLabel, FormGroup, FormLabel,  Radio, RadioGroup, TextField, TextareaAutosize,  } from "@mui/material";
// import { FormBuilder } from 'react-form-builder2';;
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ExportChecklist from '../Api/Admin/CheckList/ExportChecklist';

// import "./styles.css";
const formSchema = {
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        required: true,
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        required: true,
      },
      {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
      },
    ],
  };
export default function CreateCheckList() {
    const Navigate = useNavigate();
    const childRef = useRef();
    const [formData, setFormData] = useState(null);
    const [Product, setProduct] = useState(JSON.parse(localStorage.getItem("Product")));
    const [Togal, setTogal] = useState(true);
    const [Data, setData] = useState()
    const handleSubmit = (data) => {setFormData(data)};

    let DataShow = [
      {
        "type": "header",
        "subtype": "h1",
        "label": "CheckList",
        "access": false
      },
      {
        "type": "radio-group",
        "required": true,
        "label": "Q.1  Legal Name of Application",
        "inline": true,
        "name": "radio-group-1683003347823-0",
        "access": true,
        "other": false,
        "role": "1",
        "values": [
          {
            "label": "MR",
            "value": "Mr",
            "selected": true
          },
          {
            "label": "Miss",
            "value": "Miss",
            "selected": false
          },
          {
            "label": "MS",
            "value": "Ms",
            "selected": false
          },
          {
            "label": "Mrs",
            "value": "Mrs",
            "selected": false
          }
        ]
      },
      {
        "type": "text",
        "required": true,
        "label": "Q.2 Trending name",
        "className": "form-control",
        "name": "text-1683003614731-0",
        "access": false,
        "subtype": "text"
      },
      {
        "type": "checkbox-group",
        "required": false,
        "label": "Q.3  GST Registration",
        "toggle": false,
        "inline": false,
        "name": "checkbox-group-1683003705213-0",
        "access": false,
        "other": false,
        "values": [
          {
            "label": "Yes",
            "value": "yes",
            "selected": false
          },
          {
            "label": "No",
            "value": "no",
            "selected": true
          }
        ]
      },
      {
        "type": "file",
        "required": false,
        "label": "Please Upload your profile pick",
        "className": "form-control",
        "name": "file-1683005649446-0",
        "access": false,
        "subtype": "file",
        "multiple": false
      },
      {
        "type": "date",
        "required": false,
        "label": "Date Field",
        "className": "form-control",
        "name": "date-1683005701919-0",
        "access": false,
        "value": "2023-05-16"
      },
      {
        "type": "select",
        "required": false,
        "label": "Select",
        "className": "form-control",
        "name": "select-1683005771478-0",
        "access": false,
        "multiple": false,
        "values": [
          {
            "label": "Option 1",
            "value": "option-1",
            "selected": true
          },
          {
            "label": "Option 2",
            "value": "option-2",
            "selected": false
          },
          {
            "label": "Option 3",
            "value": "option-3",
            "selected": false
          }
        ]
      },
      {
        "type": "autocomplete",
        "required": false,
        "label": "Autocomplete",
        "className": "form-control",
        "name": "autocomplete-1683005749219-0",
        "access": false,
        "requireValidOption": false,
        "values": [
          {
            "label": "Option 1",
            "value": "option-1",
            "selected": true
          },
          {
            "label": "Option 2",
            "value": "option-2",
            "selected": false
          },
          {
            "label": "Option 3",
            "value": "option-3",
            "selected": false
          }
        ]
      },
      {
        "type": "number",
        "required": false,
        "label": "Number",
        "className": "form-control",
        "name": "number-1683005791900-0",
        "access": false
      },
      {
        "type": "paragraph",
        "subtype": "p",
        "label": "Paragraphujkmy,k,uykrtkukym",
        "className": "kjuykuk",
        "access": false
      },
      {
        "type": "textarea",
        "required": false,
        "label": "Text Area",
        "className": "form-control",
        "name": "textarea-1683005784519-0",
        "access": false,
        "subtype": "textarea"
      },
      {
        "type": "button",
        "label": "Submit",
        "subtype": "button",
        "className": "btn-success btn",
        "name": "button-1683005722001-0",
        "access": false,
        "style": "success"
      }
    ]

    const GetData = (data) => {
      formik.values.json_data=JSON.parse(data)
      setData(JSON.parse(data))     
    }

    const GetDataTogle = (data) => {
      formik.values.json_data=JSON.parse(data)
      setData(JSON.parse(data))
      setTimeout(() => {
        setTogal(false)
      });
    }

    const formik = useFormik({
      initialValues: {
        title: "",
        product_id: Product.products_id,
        json_data: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Enter your Document title"),
      }),
      onSubmit: (values) => {
        childRef.current.getFormData1()
        setTimeout(() => {
          ExportChecklist.CreateChecklist(values)
            .then((resp) => {
              if (resp.data.message=="checklist detail submit successfully") {
              toast.success("Checklist Created successfully", {
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
              }else{
                toast.error('Something went wrong', {
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
        <Typography className="main-title-ad" fontSize={{xs:'20px', lg:'30px'}} sx={{borderBottom:'1px solid #bbb5b5', paddingBottom:'15px', marginBottom:'40px'}}>Create Checklist</Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
         
          <Grid container mt={2}>          
            <Grid xs={2} >
              {Togal ? <ArrowBackIcon className='back-icon-proact' onClick={() => Navigate('/Productlist/moduleList')} />:null}
            </Grid>               
            <Grid className='vie-doc-btn chek-btn-size' xs={10}  mt={2}>
              <div>
                {Togal ? <Button mt={1} type='submit' className={"A1"} variant="contained"> Generate Checklist</Button>:null}
                {Togal ? <Button onClick={()=>{childRef.current.getFormData()}}  sx={{ marginLeft: "10px"}} className={"A1"} variant="contained">Preview </Button>:<Button onClick={()=>{setTogal(true)}}  sx={{ marginLeft: "10%", marginRight: "1%"  }} className={"A1"} variant="contained">Hide Preview </Button>}
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
              {
                Togal ? <FormBuilder ref={childRef} GetDataTogle={GetDataTogle} GetData={GetData} />:
                <Grid container mt={2}>
                  {
                    Data?.map((item, index) => {
                      return (
                          <Grid xs={12}>
                            <form>
                              {item.type == "header" ? <h1 style={{textAlign:'left', fontSize:'20px', fontWeight:'600'}}>{item.label}</h1> : null}
                              {
                                item.type == "radio-group" ?
                                  <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">{item.label}</FormLabel>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                    {
                                      item.values?.map((value, i) => {
                                        return <FormControlLabel key={i} value={value.value} control={<Radio />} label={value.label} />
                                      })
                                    }
                                    </RadioGroup>
                                  </FormControl>
                                : null
                              }
                              {
                                item.type == "text" ?
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
                                  </Box> : null
                              }
                              {
                                item.type == "checkbox-group" ?
                                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend">{item.label}</FormLabel>
                                    <FormGroup>
                                      {item.values.map((val, i) => <FormControlLabel control={<Checkbox key={i} name="gilad" />} label={val.label} />)}
                                    </FormGroup>
                                  </FormControl>
                                : null
                              }
                              {
                                item.type == "file" ? 
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
                                </Box>: null
                              }
                              {
                                item.type == "date" ? 
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
                                  </Box>: null
                              }
                              {
                                item.type == "select" ? 
                                <FormControl fullWidth>
                                  <InputLabel variant="standard" htmlFor="uncontrolled-native">{item.label}</InputLabel>
                                  <NativeSelect inputProps={{name: 'age', id: 'uncontrolled-native'}}>
                                    <option value={""}></option>
                                    {
                                      item.values.map((val, i) => {
                                        return <option value={val.value}>{val.label}</option>
                                      })
                                    }
                                  </NativeSelect>
                                </FormControl>:null
                              }
                              {
                                item.type == "autocomplete" ?
                                  <FormControl fullWidth>
                                    <Autocomplete
                                      options={item.values}
                                      id="disable-close-on-select"
                                      renderInput={(params) => (
                                        <TextField {...params} label={item.label} variant="standard" />
                                      )}
                                    />
                                  </FormControl>
                                : null
                              }
                              {
                                item.type == "number" ?
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
                                : null
                              }
                              {item.type == "paragraph" ? <p style={{marginTop:'5px'}}>{item.label}</p> : null}
                              {
                                item.type == "textarea" ?
                                  <Box mt={1}>
                                    <FormControl fullWidth>
                                      {/* <InputLabel variant="standard" htmlFor="uncontrolled-select">
                                        {item.label}
                                      </InputLabel> */}
                                      <TextareaAutosize aria-label="empty textarea" id="uncontrolled-select" />
                                    </FormControl>
                                  </Box> : null
                              }
                              {item.type == "button" ? <Button type='submit' sx={{my:5}} className={"A1"} variant="contained">{item.label}</Button> : null}
                            </form>
                          </Grid>
                      )
                    })
                  }
                </Grid>
              }
            </Grid>
          </Grid>
        </Box>
      </div>
    )
}
