import { Box, Button, Grid, Typography } from '@mui/material'
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import VerticalShadesClosedIcon from '@mui/icons-material/VerticalShadesClosed';
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FileTable from '../../commenComponet/FileTable';
import Futer from '../../commenComponet/Futer';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
const Files = () => {
   
    const [value, setValue] = useState(0);
    const [saveData, setsaveData] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSaveData=(data)=>{
        setsaveData(data)
    }
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Typography mt={4} ml={6} sx={{ fontSize: "30px" }} >Files</Typography>
                </Grid>
                <Grid xs={9}></Grid>
                <Grid xs={2}>
                    <Grid container mt={4}>
                        <Grid mt={4} item xs={6}>
                            <Button onClick={()=>console.log({saveData})} className='sort' variant="outlined" startIcon={<VerticalAlignCenterIcon />}>
                                Sort
                            </Button>
                        </Grid>
                        <Grid mt={4} xs={2}>
                            <VerticalShadesClosedIcon />
                        </Grid>
                        <Grid mt={4} item xs={3}>
                            <DensityMediumIcon sx={{ color: "#0CB4D0" }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Box xs={12}xl={12} sm={12} lg={12} mt={4} ml={6} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs  xs={11}xl={12} sm={11} lg={11}   value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="NDIS" {...a11yProps(1)} />
                    <Tab label="SDA" {...a11yProps(2)} />
                    <Tab label="Aged Caredis" {...a11yProps(3)} />
                    <Tab label="Child Care" {...a11yProps(4)} />
                    <Tab label="Vaccines" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FileTable handleSaveData={handleSaveData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
            <FileTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Three
            </TabPanel>

            <Futer/>
        </div>
    )
}

export default Files