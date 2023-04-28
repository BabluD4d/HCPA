import { Box, Container,  Grid, Typography } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React from 'react'
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../commenComponet/ProductCard';
import Futer from '../../commenComponet/Futer';
const DashBoard = () => {
    const Navigate=useNavigate()
    return (
        <div id="main">

            <Typography mt={4} ml={6} sx={{ fontSize: "30px" }} >DashBoard</Typography>
            <hr height={3} />
            <Typography mt={4} ml={6} sx={{ fontSize: "30px" }} >Wellcome to the HCPA Portal Davis</Typography>

            <Grid container spacing={2}>
                <Grid item xs={7}xl={9} sm={8} lg={9}  >
                    <Typography mt={5} ml={8} sx={{ fontSize: "20px" }} >Welcome  Video</Typography>
                    <Box ml={8}>
                        <div className='playerDiv'>
                            <ReactPlayer width={'100%'} height='100%' playing={false}
                                muted={true}
                                controls={true}
                                url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" />
                        </div>

                    </Box>
                    <Typography mt={4} ml={6} sx={{ fontSize: "30px" }} >Product</Typography>
                    <Grid container spacing={4} mt={2} pl={9}>
                        <ProductCard Modules={6} ProductName={"NDIS"} />
                        <ProductCard Modules={3} ProductName={"SDA"} />
                        <ProductCard Modules={2} ProductName={"Aged Caredis"} />
                        <ProductCard Modules={6} ProductName={"Child Care"} />
                        <ProductCard Modules={5} ProductName={"Vaccines"} />
                    </Grid>

                </Grid>
                <Grid item xs={4}xl={3} sm={4} lg={3}>
                    <div style={{ display: "flex" }}>
                        <Typography mt={5} ml={6} sx={{ fontSize: "20px" }} >Files </Typography>
                        <Typography mt={6} ml={1} sx={{ color: "#0CB4D0;", fontSize: "14px" }}>  View All Files</Typography>
                    </div>
                    <div className='center'>

                        <Typography  sx={{ fontSize: "20px",fontWeight:"bold" }} >No files yet </Typography>
                        <Typography  sx={{ color: "gray", fontSize: "14px" }}>Exported files from your Products </Typography>
                        <Typography  sx={{ color: "gray", fontSize: "14px" }}>will show here </Typography>
                    </div>
                </Grid>

            </Grid>

            <Futer/>
        </div>
    )
}

export default DashBoard