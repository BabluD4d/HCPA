import { Check, CheckBox, Checklist, ExpandMore } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Accordion, AccordionDetails, Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Session1 } from './Session1';
import { Session2 } from './Session2';
import { Session3 } from './Session3';
import { Session4 } from './Session4';
import { useNavigate } from 'react-router-dom';

export const CheckList = () => {
const Navigate=useNavigate()
const [expanded, setExpanded] = React.useState(false);

const handleChange = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};
    return (
        <div>
        <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
        HCPA CheckList-NDIS
        </Typography>
        <div style={{ display: "flex" }}>
          <Typography onClick={()=>Navigate("/")} mt={1} ml={6} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
            Product{" "}
          </Typography>
          <Typography  mt={1} ml={1}mr={1} sx={{ fontSize: "14px", }}>
            {" / "}
          </Typography>
          <Typography onClick={()=>Navigate("/Modelus")} mt={1} sx={{ fontSize: "14px", color: "#0CB4D0" }}>
            {" "}
             NDIS
          </Typography>
          <Typography mt={1} ml={1}mr={1} sx={{ fontSize: "14px", }}>
            {" / "}
          </Typography>
          <Typography mt={1} sx={{ fontSize: "14px" }}>
            {" "}
             HCPA CheckList-NDIS
          </Typography>
        </div>
        <hr height={3} />
        <Box   >
            <Grid container spacing={2}>
                <Grid xs={4} height={"60vh"} >
                        <Box>
                            <Box m={3} >
                            <Typography  mt={4} mb={2} ml={6} sx={{ fontSize: "22px" , fontWeight:"bold"}}>Complete 0 of 4</Typography>
                                <Grid mt={1} mb={1}ml={5} container spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography onClick={()=>setExpanded("panel1")} >  Section1:Details </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CheckCircleIcon sx={{color:"gray"}} />
                                    </Grid>

                                </Grid>
                                <Grid mt={1} mb={1}ml={5}  container spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography>  Section 2: Services and Qualifications </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <CheckCircleIcon sx={{color:"gray"}} />
                                    </Grid>

                                </Grid>
                                <Grid mt={1} mb={1}ml={5}  container spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography>  Section 3: Suitability </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <CheckCircleIcon sx={{color:"gray"}} />
                                    </Grid>

                                </Grid>
                                <Grid mt={1} mb={1}ml={5} container spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography> Section 4: Declaration </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <CheckCircleIcon sx={{color:"gray"}} />
                                    </Grid>

                                </Grid>
                            </Box>
                        </Box>

                 
                </Grid>
                <Grid item xs={8} sx={{height:"75vh",overflow:"auto"}}>
                    <Container>
                        <Box flex={1}  >
                            <Stack spacing={0} >
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} gap={2}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Section 1:Details</Typography>
                                    </AccordionSummary >
                                    <AccordionDetails>
                                        <Session1 />
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Section 2: Services and Qualifications</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Session2/>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Section 3: Suitability</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Session3/>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Section 4: Declaration</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        
                                        <Session4/>
                                    </AccordionDetails>
                                </Accordion>
                            </Stack>
                        </Box>
                    </Container>
                </Grid>
            </Grid>

        </Box>
        </div>
    )
}

