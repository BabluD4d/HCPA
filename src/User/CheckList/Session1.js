import { Check, CheckBox, Checklist, ExpandMore } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Accordion, AccordionDetails, Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const Session1 = () => {
    const [checked, setChecked] = React.useState("false");
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant='500' fontStyle={"revert"} gridAutoFlow={"column"}  >
                        Legal Name of Application
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography><Checkbox icon={<RadioButtonUncheckedIcon />} />Mr</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography><Checkbox icon={<RadioButtonUncheckedIcon />} />Miss</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography><Checkbox icon={<RadioButtonUncheckedIcon />} />Ms</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography><Checkbox icon={<RadioButtonUncheckedIcon />} />Mrs</Typography>
                </Grid>

            </Grid>
            <Box gap={5}>
                <Typography style={{ paddingTop: "3%" }}>
                    <TextField
                        defaultValue=" Lucky Lavender "
                        variant="filled"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                          }}
                       />
                </Typography>
                <Typography style={{ paddingTop: "3%" }}>
                    <TextField
                        defaultValue="December 15,1980"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        label='Date of birth' />
                </Typography>    
                 <Typography style={{ paddingTop: "3%" }}>
                    <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    defaultValue="  sandeep@email.com "
                    fullWidth
                    label=' Email' />
                </Typography>   
                <Typography style={{ paddingTop: "3%" }}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        defaultValue="+00 123 456 7890"
                        fullWidth
                        label='Mobile' />
                </Typography>   
                <Typography style={{ paddingTop: "3%" }}>

                    <TextField
                     
                     InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                         defaultValue=" Sample ABN Name "
                        fullWidth
                        label=' ABN  ' />

                </Typography>
                <Typography style={{ paddingTop: "3%" }}>

                    <TextField
                    
                    InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                         defaultValue=" Sample Legal ABN Name"
                        fullWidth
                        label=' Legal Register ABN Name   ' />

                </Typography>
                <Typography style={{ paddingTop: "3%" }}>

                    <TextField
                     
                     InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                         defaultValue="Sample Trading Name "
                        fullWidth
                        label='Trading Name' />

                </Typography>
            </Box>
            <Box>
                <Typography>  GST Registraction<Checkbox icon={<RadioButtonUncheckedIcon/>} />Yes<Checkbox  icon={<RadioButtonUncheckedIcon/>}/> No</Typography>
            </Box>
            <Box>
                <Typography style={{ paddingTop: "3%" }}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                          }}
                          variant="filled"
                     
                         defaultValue="Sample business registraction name "
                        fullWidth
                        label='Registered Business Address ' />

                </Typography>
            </Box>
            <Box mt={6} alignItems={"baseline"} >
                <Typography variant='500' component={'h5'}>States You Wish To Opperate in:</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4} md={8}>
                        <Typography>
                            <Checkbox />
                            Victoria</Typography>
                        <Typography>

                            <Checkbox />  New South Wales
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <Typography>
                            <Checkbox />Northern Territory
                        </Typography>
                        <Typography>

                            <Checkbox />   West Australia
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={8}>
                        <Typography>
                            <Checkbox />
                            Queensland</Typography>
                        <Typography>

                            <Checkbox />   Trasmania
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <Typography>
                            <Checkbox /> South Australia
                        </Typography>
                        <Typography>

                            <Checkbox />    Australian Capital Territory
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={4}>
                <Typography variant='500' component={'h5'}> Is Postal Address a P.O. CheckBox

                    <Checkbox icon={<RadioButtonUncheckedIcon/>} /> Yes
                    <Checkbox icon={<RadioButtonUncheckedIcon/>}/>No
                </Typography>

            </Box>

            <Box mt={4}>
                <Typography variant='500' component={'h5'}>Type of Business:</Typography>
                <Checkbox />Parent Organisation
                <Checkbox />Individual with ABN
                <Checkbox />Entity with an
            </Box>


            <Box mt={6} alignItems={"baseline"} >

                <Typography variant='500' component={'h5'}>Legal Entity Type</Typography>



                <Grid container spacing={2}>
                    <Grid item xs={4} md={8}>
                        <Typography>
                            <Checkbox />
                            Australian Private Company</Typography>
                        <Typography>

                            <Checkbox /> Organisation
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <Typography>
                            <Checkbox /> Individual/SoleProprietor
                        </Typography>
                        <Typography>

                            <Checkbox />  Trustee on Behalf of a trust
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={8}>
                        <Typography>
                            <Checkbox />  Partnership
                        </Typography>
                        <Typography>

                            <Checkbox /> Local Government
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <Typography>
                            <Checkbox />  Austrlian Public Company
                        </Typography>
                        <Typography>

                            <Checkbox /> State/TerritoryGovernment
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={8}>
                        <Typography>
                            <Checkbox />  Incorporated Association
                        </Typography>
                        <Typography>
                            <Checkbox /> Aborignal Corporation
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <Typography>
                            <Checkbox />  Incorporate Cooperaive
                        </Typography>

                    </Grid>
                </Grid>


            </Box>
            <Button style={{ backgroundColor: "#0CB4D0", color: 'white', marginTop: "5%" }}>Save and proceed</Button>
        </Box>



    )
}
