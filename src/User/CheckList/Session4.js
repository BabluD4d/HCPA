import { Check, CheckBox, Checklist, ExpandMore } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Accordion, AccordionDetails, Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';



export const Session4 = () => {
    return (
        <>

            <Container maxWidth='md' sx={{ height: "350px", mt: '5%', bgcolor: 'whitesmoke' }}>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography> Have you previously established a PRODA(Provider Digital Access)Accounts?</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Checkbox />Yes
                        <Checkbox /> No

                    </Grid>

                </Grid>
                <hr />
                <Box>
                    <Typography>ONLY DO THIS STEP IF YOU REQUIRE REGISTRACTION  FOR  THE NDIS.</Typography>
                    <ul style={{ font: '82px' }}>
                        <b>


                            <li>IF NO-Skip this step.</li>
                            <li>IF YES - Please provide us with your PRODA details below . We will call you upon login attempts to retrieve verification code from you (You <br /> will not have to send us an ID) </li>
                        </b>
                    </ul>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Username </Typography>
                            <br />
                            <input className=' form form-control ' />


                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Password</Typography>
                            <br />
                            <input className=' form form-control ' />
                        </Grid>

                    </Grid>
                </Box>


            </Container>
            <Container maxWidth='md' sx={{ height: "650px", mt: '5%', bgcolor: 'whitesmoke' }}>

                <Typography>ID Veriufication</Typography>

                <hr />
                <Box mt={5}>
                    <Typography> Please attached 3 of the required ID for your registraction.Each  form of ID must be clear and legible.</Typography>
                    <Typography>ONLY DO THIS IF YOU REQUIRE REGISTRACTION FOR THE NDIS</Typography>

                    <Box mt={6}>

                        <Typography>Recommended Forms of ID (We require all 3):  </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography><Checkbox /> Medicare Card* </Typography>



                            </Grid>
                            <Grid item xs={4}>
                                <Typography><Checkbox />Australian Drivers Licences* </Typography>

                            </Grid>
                            <Grid item xs={4}>
                                <Typography><Checkbox />Australian Password* </Typography>

                            </Grid>

                        </Grid>
                    </Box>
                    <Box>
                        <Box mt={9}>
                            <Typography> Plus, two Alternative ID:  </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography><Checkbox /> Medicare Card </Typography>
                                    <Typography><Checkbox /> Australian Drivers Licence </Typography>




                                </Grid>
                                <Grid item xs={6}>
                                    <Typography><Checkbox /> Austrilian Password</Typography>
                                    <Typography><Checkbox />   ImmiCard </Typography>

                                </Grid>


                            </Grid>
                        </Box>
                    </Box>

                    <Box mt={7}>
                        <Typography>  Plus , one of the following :</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography><Checkbox />  Austrilian Password   </Typography>
                                <Typography><Checkbox /> Australian    Birth Certificate </Typography>
                                <Typography><Checkbox /> Australian Citzenship(Front and Back)       </Typography>

                            </Grid>
                            <Grid item xs={6}>
                                <Typography><Checkbox /> Foregin Password Certificate of Citzenship by Descent</Typography>
                                <Typography><Checkbox />   ImmiCard </Typography>

                            </Grid>


                        </Grid>
                    </Box>

                </Box>
                <List style={{ marginTop: "33px" }}>
                    <ListItem>
                        <Typography>Health Care Provider Association Pty Ltd accept no responsibility for the accuracy or completeness of any information provided.</Typography>
                    </ListItem>
                    <ListItem>
                        I confirm that the information provided on and in connection with this form is true , complete ,and accurate. I allow Health Care <br />
                        Providers Association Rty Ltd to create or make changes to my PRODA concerning our contract and this form if necessary.
                    </ListItem>
                    <ListItem>
                        I allow Health Care Provider Association Pty Ltd to use this information in completing the required services as agreed upon in the <br />
                        service agreement and put this information forward to potential clients and the online HCPAPortal
                    </ListItem>
                </List>
                <Box>
                    <Typography style={{ paddingTop: "3%" }}>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            defaultValue=" "
                            fullWidth
                        />
                        <Typography>Full Legal Name </Typography>

                    </Typography>
                    <Typography style={{ paddingTop: "3%" }}>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            defaultValue=" "
                            fullWidth
                        />
                        <Typography> Signature</Typography>

                    </Typography>
                    <Typography style={{ paddingTop: "3%" }}>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            defaultValue=" "
                            fullWidth
                        />
                        <Typography> Date</Typography>

                    </Typography>
                </Box>
                <Button  style={{ backgroundColor: "#E0E0E0", color:"black" }}>Previous step</Button>
                <Button style={{ backgroundColor: "#0CB4D0",color:"white" ,marginLeft:"5px" }}>Save and proceed</Button>
            </Container>
        </>
    )
}
