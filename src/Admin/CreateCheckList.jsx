import React, { useRef, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, NativeSelect, Pagination, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import FormBuilder from './FormB';
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
    console.log("hello")
    const GetData = (data) => {
        console.log({ data })
    }
    const childRef = useRef();
    const [formData, setFormData] = useState(null);

    const handleSubmit = (data) => {
      setFormData(data);
      
    };
    return (
        <div>
            {console.log("hello")}
            <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
                Create Checklist
            </Typography>
            <hr height={3} />
            <Grid container spacing={4} mt={2} >
                <Grid xl={3} >
                    <ArrowBackIcon onClick={() => Navigate('/Productlist/moduleList')} style={{ color: "#0cb4d0", fontSize: "50px", marginLeft: "18px" }} />
                </Grid>
                <Grid xl={6} >
                </Grid>
                <Grid xl={3} >
                    <div style={{ display: "flex" }}>
                        <Button mt={1} sx={{ marginLeft: "10%", }} onClick={() => { childRef.current.getFormData() }} className={"A1"} variant="contained"> Create Checklist</Button>

                        {/* <Button onClick={()=>Navigate("/CreactModules")}  sx={{ marginLeft: "10%", }} className={"A1"} variant="contained"> Create Modelus</Button> */}
                    </div>
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
            <FormBuilder  ref={childRef} GetData={GetData} />

        </div>
    )
}
