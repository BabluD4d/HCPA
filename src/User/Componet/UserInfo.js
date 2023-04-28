import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Futer from "../../commenComponet/Futer";

const UserInfo = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={1}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "30px" }}>
            Profile
          </Typography>
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid mt={4} item xs={2}>
          <Button className="Edit" variant="outlined">
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      <hr height={3} />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          {" "}
          <Typography mt={4} ml={6} sx={{ fontSize: "24px" }}>
            Personal information
          </Typography>
          <Typography mt={1.5} ml={6} sx={{ fontSize: "18px" }}>
            Name
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            Lucy
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            ID
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            0012WQ12
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Password
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            ********
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Email
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            Lucy@gmail.com
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Mobile
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            +61 123 456 7890
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Mobile
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            +61 123 456 7890
          </Typography>
          <Typography mt={1.7} ml={6} sx={{ fontSize: "18px" }}>
            Payment Card
          </Typography>
          <Typography ml={6} sx={{ fontSize: "16px" }}>
            Mastercard ending in 0000
          </Typography>
        </Grid>
        <Grid ml={4} item xs={2.5}>
          <Typography mt={4} ml={4} sx={{ fontSize: "24px" }}>
            Business information
          </Typography>
          <Typography mt={1.5} pl={7} sx={{ fontSize: "18px" }}>
            {" "}
            Busines Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Type
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            An ABN
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Address
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            West NSW
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Email
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Lucy@gmail.com
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Mobile
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            +61 123 456 7890
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Busines Phone Number
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            +61 123 456 7890
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            States Operating In
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Mastercard ending in 0000
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            ABN Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Legal RegistrationABN Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
          <Typography mt={1.7} pl={7} sx={{ fontSize: "18px" }}>
            Trading Name
          </Typography>
          <Typography pl={7} sx={{ fontSize: "16px" }}>
            Yolop
          </Typography>
        </Grid>
      </Grid>
      <Futer />
    </div>
  );
};

export default UserInfo;
