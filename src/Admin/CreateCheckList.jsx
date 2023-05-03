import React, { useRef, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, Pagination, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import FormBuilder from './FormB';
import { Autocomplete,   Checkbox, FormControlLabel, FormGroup, FormLabel,  Radio, RadioGroup, TextField, TextareaAutosize,  } from "@mui/material";
// import { FormBuilder } from 'react-form-builder2';

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
    const Navigate = useNavigate()
  
    const childRef = useRef();
    const [formData, setFormData] = useState(null);
    const [Togal, setTogal] = useState(true);
    const [Data, setData] = useState()
    const handleSubmit = (data) => {
      setFormData(data);
  
    };
    let DataShow =
    [
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
      console.log({ data })
      setData(JSON.parse(data))
      setTimeout(() => {
        setTogal(false)
      }, );
  }
    return (
        <div>
            {console.log({Data})}
            <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
                Create Checklist
            </Typography>
            <hr height={3} />
            <Grid container spacing={4} mt={2} >
                <Grid xl={3} >
                {Togal?    <ArrowBackIcon onClick={() => Navigate('/Productlist/moduleList')} style={{ color: "#0cb4d0", fontSize: "50px", marginLeft: "18px" }} />:null}
                </Grid>
                <Grid xl={6}  mt={2}>
                <div style={{ display: "flex" }}>
                {Togal?  <Button mt={1} sx={{ marginLeft: "10%", }} onClick={() => { childRef.current.getFormData1() }} className={"A1"} variant="contained"> Generate Checklist</Button>:null}

                        {Togal?  <Button onClick={()=>{childRef.current.getFormData()}}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained">Preview </Button>:
                        <Button onClick={()=>{setTogal(true)}}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained">Hide Preview </Button>}
                    </div>
                </Grid>
                <Grid xl={3} >
                
                </Grid>
            </Grid>
            {/* <FormBuilder
                form={formSchema}
                onSubmit={handleSubmit}
                submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
                backButton={<a href="/" className="btn btn-default btn-cancel btn-big">Back</a>}
            /> */}
            <br/>
            <br/>
            <br/>
            {Togal?  <FormBuilder  ref={childRef} GetData={GetData} />:<>
            
            
            {Data?.map((item, index) => {
        return <Grid key={index} container spacing={4} mt={2} >
          <Grid xl={3} >
          </Grid>
          <Grid xl={6} >
            <form>
              {item.type == "header" ? <h1><center>{item.label}</center> </h1> : null}
              {item.type == "radio-group" ? <>    <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">{item.label}</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  {
                    item.values?.map((value, i) => {
                      return <FormControlLabel key={i} value={value.value} control={<Radio />} label={value.label} />

                    })
                  }
                </RadioGroup>
              </FormControl></> : null}
              {item.type == "text" ? <>  <Box mt={3}>
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
              </Box></> : null}
              {item.type == "checkbox-group" ? <>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                  <FormLabel component="legend">{item.label}</FormLabel>
                  <FormGroup>
                    {item.values.map((val, i) => <FormControlLabel
                      control={
                        <Checkbox key={i} name="gilad" />
                      }
                      label={val.label}
                    />)}


                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </> : null}
              {item.type == "file" ? <><Box mt={3}>
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
              </Box></> : null}
              {item.type == "date" ? <><Box mt={3}>
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
              </Box></> : null}
              {item.type == "select" ? <><FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  {item.label}
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={""}></option>
                  {item.values.map((val, i) => {
                    return <option value={val.value}>{val.label}</option>

                  })}
                </NativeSelect>
              </FormControl></> : null}
              {item.type == "autocomplete" ? <>
                <FormControl fullWidth>
                  <Autocomplete
                    options={item.values}
                    id="disable-close-on-select"
                    // disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField {...params} label={item.label} variant="standard" />
                    )}
                  />

                </FormControl>
              </> : null}
              {item.type == "number" ? <>
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
              </> : null}
              {item.type == "paragraph" ? <p><center>{item.label}</center> </p> : null}
              {item.type == "textarea" ? <Box mt={1}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  {item.label}
                </InputLabel>
                <br/>
                <br/>
                <br/>
                <TextareaAutosize
                  aria-label="empty textarea"
                  // placeholder="Empty"
                  // style={{ width: 200 }}
                />
                </FormControl>
              </Box> : null}
              {item.type == "button" ? <Button type='submit'className={"A1"} variant="contained">{item.label}</Button> : null}

            </form>
          </Grid>
          <Grid xl={3} >
          </Grid>
        </Grid>

      })}
            </>}
          

        </div>
    )
}
