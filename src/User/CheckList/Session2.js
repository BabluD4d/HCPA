import { Check, CheckBox, Checklist, ExpandMore } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Accordion, AccordionDetails, Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const Session2 = () => {
    return (

        <Box flex={1}>
            <Typography variant='100'>
                 Please note: Equivalency to a Disability Support Worker includes:Cert lll in Disabilty. Cert lll Independent Support and Cert lll in <br /> Community Services

            </Typography>
            <Typography/>
            <Typography variant='500'  > 
               <Checkbox /> 102. Assistance to Access and Maintain Employment :</Typography>
            <Box>
                <Typography>Qualification</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={2} md={8}>
                        <Typography>
                            <Checkbox />
                            Aborginal Health Worker </Typography>
                        <Typography>

                            <Checkbox />Development Educatoe
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={4}>
                        <Typography>
                            <Checkbox />  Welfare Worker
                        </Typography>
                        <Typography>

                            <Checkbox />  Social Worker
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={4}>
                        <Typography>
                            <Checkbox />   Disability Support Worker
                        </Typography>
                    </Grid>


                </Grid>

            </Box>
            <Typography variant='500' >    <Checkbox /> 103. Assistance Products for Personal Care and Safety :</Typography>
            <Box>
                No Qualification Required
            </Box>
            <Box flex={1} >
                <Typography variant='500'  >    <Checkbox /> 104. Assistance with Daily Personal Activities(High Intensty):</Typography>
                .Supplementary module (extra cost at time of audit)<Divider />
                <Divider />
                Qualification
                <List>
                    <ListItem style={{ margin: "2px" }}>
                        <Checkbox />Aborignal Health Worker
                    </ListItem>
                    <ListItem style={{ margin: "2px" }}>
                        <Checkbox /> Development Educator
                    </ListItem>
                    <ListItem style={{ margin: "2px" }}>
                        <Checkbox /> Disability
                    </ListItem>
                </List>
                <Typography>
                    Specialisations (please select):
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Restrictive Practices </Typography>
                            <Typography>

                                <Checkbox /> Urinary Catheter
                            </Typography>
                            <Typography>

                                <Checkbox /> PEG Feeding ai
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Complex Bowel Care</Typography>
                            <Typography>

                                <Checkbox /> Complex Wound Mangement
                            </Typography>
                            <Typography>

                                <Checkbox /> Ventilator Man
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Tracheostomy Managment </Typography>
                            <Typography>

                                <Checkbox /> Sub-cutaneous Mangement
                            </Typography>
                            <Typography>

                                <Checkbox /> Severe Dyspha
                            </Typography>
                        </Grid>
                    </Grid>
                </Typography>




            </Box>
            <Box>
                <Typography variant='500'><Checkbox />105. Personal Mobility Equipement</Typography>
                <Box m={2}>

                    <Typography variant='500' >No Qualification Required</Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant='500'><Checkbox />106. Assistance with Life Stage Transition</Typography>
                <Divider />
                <Typography>.PLease note that level 1&2 support coordination, psychosocial recovery coaching and accommodation & tenancy assistance <br /> all fall within this service group</Typography>
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} md={8}>
                            <Typography>
                                <Checkbox />
                                Aborginal Health Worker </Typography>
                            <Typography>

                                <Checkbox />Development Educatoe
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={4}>
                            <Typography>
                                <Checkbox />  Welfare Worker
                            </Typography>
                            <Typography>

                                <Checkbox />  Social Worker
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={4}>
                            <Typography>
                                <Checkbox />   Disability support Worker
                            </Typography>

                        </Grid>
                    </Grid>

                </Box>
            </Box>

            <Box>
                <Typography><Checkbox /> 107. Assistance with Daily Personal Activities</Typography>
                <Box>
                    <Typography>Qualifications:</Typography>
                    <List>
                        <ListItem>
                            <Checkbox />Aborginal Health Worker
                        </ListItem>
                        <ListItem>
                            <Checkbox />Disability Support Worker
                        </ListItem>  <ListItem>
                            <Checkbox /> Welfare Worker
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box>
                <Typography><Checkbox />108. Assistance with Travel and Transport</Typography>
                <Box>
                    <Typography> No Qualification required</Typography>
                    <Typography><Checkbox />Australian Drivers Licence</Typography>
                </Box>
            </Box>
            <Box>
                <Typography><Checkbox />109. Vehicle Modification</Typography>
                <Box m={2}>
                    <Typography>Qualifications</Typography>
                    <List>
                        <ListItem>
                            <Checkbox />Engineer
                        </ListItem>

                        <ListItem>
                            <Checkbox />Mechanic
                        </ListItem>

                    </List>
                </Box>
            </Box>
            <Box>
                <Typography><Checkbox />110. Specialised Positive Behaviour Support</Typography>
                <Divider />
                <Typography>.Supplemantary module (extra cost at time of adult)</Typography>
                <Divider />
                <Divider />
                <Typography>Will you be implementing restrictive practices? <Checkbox />Yes<Checkbox />No</Typography>

                <Box>
                    <Typography>Qualification</Typography>
                    <List>
                        <ListItem>
                            <Checkbox />Occupational Therapist
                        </ListItem>
                        <ListItem>
                            <Checkbox />psychologist
                        </ListItem>
                        <ListItem>
                            <Checkbox /> Social Worker
                        </ListItem>
                        <ListItem>
                            <Checkbox /> Other Health Professional
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box>
                <Typography><Checkbox /> 111. Home Modification</Typography>
                <Box>
                    <Typography>Qualifications:</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={2} md={6}>
                            <Typography>
                                <Checkbox />
                                Architech </Typography>
                            <Typography>

                                <Checkbox /> Building Designer

                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={6}>
                            <Typography>
                                <Checkbox />   Carpenter/Joiner
                            </Typography>
                            <Typography>

                                <Checkbox />  Electrician
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={6}>
                            <Typography>
                                <Checkbox />
                                Building Inspector/Worker Assessor  </Typography>
                            <Typography>

                                <Checkbox />  Building Surveryor,Builder

                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={6}>
                            <Typography>
                                <Checkbox />  Occupational Therapist
                            </Typography>
                            <Typography>

                                <Checkbox />   Plumber,Gas Fitter,or Drainer
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} md={6}>
                        <Typography>
                            <Checkbox />
                            Buiding Work Project Manager </Typography>
                        <Typography>

                            <Checkbox /> Building Work Supervisor

                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={6}>
                        <Typography>
                            <Checkbox />   Rehabilitation Engineer
                        </Typography>
                        <Typography>

                            <Checkbox />  Tiler
                        </Typography>
                    </Grid>
                </Box>
            </Box>
            <Box>
                <Typography><Checkbox /> 112. Assistance wEquipment for Receration</Typography>
                <Box>
                    <Typography>No qualification required.</Typography>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 113.  Vision Equipment</Typography>
                <Box>
                    <Typography>No qualification required.</Typography>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 114.  Community Nursing Care:</Typography>
                <Box>
                    <Typography>Qualifications</Typography>
                    <Grid item xs={2} md={6}>
                        <Typography>
                            <Checkbox />Registered Nurse
                        </Typography>

                    </Grid>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 115.  Assistance with Daily Tasks/Shared Living:</Typography>
                <Divider />
                <Typography>* SIL(supported independent Living).ILO and STA are all components of this service group</Typography>

                <Box>
                    <Typography>Qualifications</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Disability Support Worker </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />  Welfare Worker </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox /> Taxie or bus driver </Typography>
                        </ListItem>
                    </List>

                </Box>

                <Box>
                    <Typography><Checkbox /> 114.  Community Nursing Care:</Typography>
                    <Box>
                        <Typography>Qualifications</Typography>
                        <Grid item xs={2} md={6}>
                            <Typography>
                                <Checkbox />Registered Nurse
                            </Typography>

                        </Grid>

                    </Box>


                </Box>
            </Box>
            <Box>
                <Typography><Checkbox /> 116. Innovative Community Participation</Typography>

                <Box>
                    <Typography>No qualification required</Typography>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 117. Development of Life Skill</Typography>

                <Box>
                    <Typography>Qualifications</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Aborignal Health Worker</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />  Disability Support Worker</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />  Welfare Worker</Typography>
                        </ListItem>
                    </List>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 118. Early Childhood Supports:</Typography>
                <Divider />


                <Box>
                    <Typography>Qualifications:</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Audiologist </Typography>
                            <Typography>

                                <Checkbox />  Art Therapist
                            </Typography>
                            <Typography>

                                <Checkbox />  Counsellor
                            </Typography>
                            <Typography>

                                <Checkbox />  Development Educator
                            </Typography>
                            <Typography>

                                <Checkbox />  Music Therapist Registraction
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Orthoptist</Typography>
                            <Typography>

                                <Checkbox />Occupational Therapist
                            </Typography>
                            <Typography>

                                <Checkbox />Physiotherapist
                            </Typography>
                            <Typography>

                                <Checkbox />Podiatrist
                            </Typography>
                            <Typography>

                                <Checkbox />Psychologist
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Speech  Pathologist </Typography>
                            <Typography>

                                <Checkbox />  Social Worker
                            </Typography>
                            <Typography>

                                <Checkbox />  Teacher
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 119. Specialised Hearing Services</Typography>

                <Box>
                    <Typography>Qualifications</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Audiologist</Typography>
                        </ListItem>

                    </List>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 120.  Assistance with Household Tasks   </Typography>

                <Box>
                    <Typography>Qualifications</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Cleaner</Typography>
                            <Typography><Checkbox />  Gardener</Typography>
                            <Typography><Checkbox /> Other</Typography>

                        </ListItem>

                    </List>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 121.  Interpreting and Translating          </Typography>

                <Box>
                    <Typography>Qualifications</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Interpreter</Typography>
                            <Typography><Checkbox />  Translator</Typography>


                        </ListItem>

                    </List>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 122.  Hearing Equipement               </Typography>

                <Box>
                    <Typography>No qualification required</Typography>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 123. Assistance Products for Household Tasks:                  </Typography>

                <Box>
                    <Typography>No qualification required</Typography>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 124. Communication and Information  Equipement:    </Typography>

                <Box>
                    <Typography>No qualification required</Typography>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 125.Participation in the Community    </Typography>

                <Box>
                    <Typography>Qualifications:</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Aborginal Health Worker</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography><Checkbox />  Development Educator    </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography><Checkbox />   Disability Support  Worker</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography><Checkbox />    Welfare Worker</Typography>
                        </ListItem>
                    </List>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 126. Exercise Physiology & Personal Wellbeing </Typography>
                <Box>
                    <Typography>Qualifications:</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox />  Exercise Physiologist</Typography>
                        </ListItem>

                        <ListItem>
                            <Typography><Checkbox />   Personal Trainer </Typography>
                        </ListItem>

                    </List>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 127. Plan Managment </Typography>
                <Box>
                    <Typography>Qualifications:</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Accountant    </Typography>
                        </ListItem>

                        <ListItem>
                            <Typography><Checkbox />  Bookkeper     </Typography>
                        </ListItem>

                    </List>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 128.  Therapeutic Supports:   </Typography>
                <Box>
                    <Typography>Qualifications:</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Audiologist </Typography>
                            <Typography>

                                <Checkbox />    Art Therapist
                            </Typography>
                            <Typography>

                                <Checkbox />  Counsellor
                            </Typography>
                            <Typography>

                                <Checkbox />  Development Educators
                            </Typography>
                            <Typography>

                                <Checkbox />  Dietician
                            </Typography>
                            <Typography>

                                <Checkbox />   Exercise Physiologist
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Music Therapist    </Typography>
                            <Typography>

                                <Checkbox />  Orthoptist
                            </Typography>
                            <Typography>

                                <Checkbox /> Occupational Therapist
                            </Typography>
                            <Typography>

                                <Checkbox />   Physio Therapist
                            </Typography>
                            <Typography>

                                <Checkbox />   Podiatrist Psychologist
                            </Typography>
                            <Typography>

                                <Checkbox />   Rehabilitation Counsellor
                            </Typography>




                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography>
                                <Checkbox />
                                Speech Pathologist </Typography>
                            <Typography>

                                <Checkbox />Social Worker
                            </Typography>
                            <Typography>

                                <Checkbox />  Teacher
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 129.  Specialised Driver Training   </Typography>
                <Box>
                    <Typography>Qualifications:</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox />  Driving Instructor Registraction/Qualification    </Typography>
                        </ListItem>
                    </List>

                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 130.   Assistance  Animals   </Typography>
                <Box>
                    <Typography>No qualification are required</Typography>



                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 131. Specialist Disability Accommodation (SDA): </Typography>
                <Divider />
                <Typography>*Supplemantary module(extra cost at time od audit)</Typography>
                <Box>
                    <Typography>No qualification required</Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox />Housing provider</Typography>
                        </ListItem>
                    </List>



                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 132. Support Coordination: </Typography>
                <Divider />
                <Typography>*Supplemantary module(extra cost at time od audit)</Typography>
                <Box>
                    <Typography> Qualifications </Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox />   Occupational Therapist</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />   Psychologist</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />   Social Worker</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox /> Oher Alllied Health Professional  </Typography>
                        </ListItem>
                    </List>



                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 133. Specialised Supported Employment: </Typography>
                <Box>
                    <Typography> Qualifications </Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox /> Aborginal Health Worker</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />Disability Support Worker</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox />Welfare Worker</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox /> Teacher        </Typography>
                        </ListItem>
                    </List>



                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 134. Hearing Services    : </Typography>
                <Box>
                    <Typography> Qualifications </Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox />  Audiologist    </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography><Checkbox /> Audiometrist Support Worker    </Typography>
                        </ListItem>
                    </List>



                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 135. Custom Prosthetics: </Typography>
                <Box>
                    <Typography> Qualifications </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>
                                <Checkbox />Orthoptist
                            </Typography>
                            <Typography>
                                <Checkbox />Prosthetist
                            </Typography>
                            <Typography>
                                <Checkbox /> Pedorthist
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <Checkbox />  Physiotherapist
                            </Typography>
                            <Typography>
                                <Checkbox />  Podiatrist
                            </Typography>

                        </Grid>
                    </Grid>


                </Box>


            </Box>
            <Box>
                <Typography><Checkbox /> 136.  Group and Centre-Based Activities : </Typography>
                <Box>
                    <Typography> Qualifications </Typography>
                    <List>
                        <ListItem>
                            <Typography><Checkbox />Developmental Educator</Typography>
                            <Typography><Checkbox />Disability Support Worker</Typography>
                            <Typography><Checkbox />Welfare Worker</Typography>
                            <Typography><Checkbox />Social Worker</Typography>

                        </ListItem>
                    </List>


                </Box>


            </Box>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography>Administering Medication?</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Checkbox icon={<RadioButtonUncheckedIcon/>} />Yes
                        <Checkbox icon={<RadioButtonUncheckedIcon/>} /> No

                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography>Disposing of Waste. Infectious and Hazardous Substances</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Checkbox  icon={<RadioButtonUncheckedIcon/>}/>Yes
                        <Checkbox icon={<RadioButtonUncheckedIcon/>}/> No

                    </Grid>
                </Grid>
            </Box>

           
                <Button  style={{ backgroundColor: "#E0E0E0", color:"black" }}>Previous step</Button>
                <Button style={{ backgroundColor: "#0CB4D0",color:"white" ,marginLeft:"5px" }}>Save and proceed</Button>
                {/* <Button style={{ backgroundColor: "#0CB4D0", color: 'white', marginTop: "5%" }}>Save and proceed</Button> */}
           
        </Box>
    )
}
