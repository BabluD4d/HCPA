import { Check, CheckBox, Checklist, ExpandMore } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export const Session3 = () => {
  return (
    <Container>
      <Typography mt={4}>
        The NDIS Commissiion Will Assess the Suitablility of the Application .
        including the Applicant's Key Personal. in conjuction with the
        qualifications, competencies and experience od the Applicant. The below
        question will be used as part of the suitability assessment The answer
        to these question will be assessed on a case-by-case basis.The
        information must be include for all Key Personnel in your organisation ,
        including directors,Board Members,Chief Officers, and any other senior
        managment
      </Typography>
      <Typography variant="400" component={"h5"}>
        PLease check YES or NO for the following questions:
      </Typography>
      <Box>
        <Container
          maxWidth="md"
          sx={{ height: "540px", mt: "5%", bgcolor: "whitesmoke" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 1</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography>
              <b>
                Has the Application ever been in receivership, subject to a
                winding-up order and/or under administration?
              </b>
            </Typography>
            <Typography>This includes where the applicant</Typography>
            <ul>
              <li>
                Is under external adminstration (or equivalent in home
                juirisdiction)
              </li>
              <li>
                Is subject to a winding-up order or an applicataion for
                windingup(or equivalent in home jurisdiction)
              </li>

              <li>
                Has a receiver or receiver and manager ben appointed to the
                company(or equivalent in home jurisdiction) (
              </li>
              <li>
                Has a comapny adminstrator been appointed to the company (or
                equivalent in home jurisdiction)
              </li>
              <li>
                Is the company currently subjected to a deed of comapny
                administration(or equivalent in home jurisdiction)
              </li>
              <li>
                Has received notice that action for the involuntary cancellation
                of its in Corporation had a commenced or is proposed
              </li>
            </ul>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ mt: "5%", bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 2</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography variant="b">
              Have any of the Application's Key Personnel ever been appointed
              convicted of an indictable offense?{" "}
            </Typography>
            <Typography>
              This includes convicitions of indictable offences against a Law of
              the Commonwealth,State or Territory or other
              jurisdiction(including foregin country).Where the answer is yes ,
              please indicate which Key Personal was convicted ,and the nature
              of the conviction
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 3</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography variant="h6">
              {" "}
              Is the Application , or any of the Applicant's Key Personal an
              insolved under adminstration, or been an insolvent under
              adminstation(or
              <Divider /> equivalent in home jurisdiction){" "}
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 4</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography>
              <b>
                Have any of the Key Personal or any of the Applicant's Key
                Personal commenced bankruptcy proceeding?
              </b>
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 5</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography>
              <b>
                Have any of the Application's Key Personnel been disqualified as
                a Director of a company ,and /or disqualified from managing
                corporation?
              </b>
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 6</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography>
              <b>
                Have any of the Application's Key Personnel , or the Applicant
                overall, been subject to any findings or judgement in relation
                to fraud, <br /> misrepresentation or dishonesty?
              </b>
            </Typography>
            <Typography>
              This includes where the Applicant's Key Personnel or the Applicant
              overall has:
            </Typography>
            <Typography pt={"50px"}>
              Been the subject of any finding or judgment in relation to fraud ,
              misrepresentation or dishonesty in any administrative civil or
              criminal <br />
              proceedings , or is currently party to any proceedings that may
              result in the applicataion beign the subject of such findings or
              judgment been <br />
              disqualified from managing corporations under Part 2D.6 of the
              Corporation Act 2001.
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 7</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography>
              <b>
                Have any of the Application's Key Personnel been disqualified as
                a Director of a company ,and /or disqualified from managing
                corporation?
              </b>
            </Typography>
            <Typography pt="50px">
              {" "}
              This includes any adverse findings or enforcement action by:
            </Typography>
            <ul>
              <li>
                A department of or authority or the other body establisheed for
                a public purpose by the Commonwealth, a State or Territory,
                including those with <br />
                responsibilities relating to the quality or requaltion of
                services provided to the people with a disability, older people
                or children.
              </li>
              <li>The National Disability Insurance Agency</li>
              <li>The Austrlian Securities and Investment Commissiion.</li>
              <li>The Australian Charities and Not-for-profit Commissiion.</li>
              <li>The Australian Competition and Consumer Commissiion.</li>
              <li>The Australian Prudential Regulation and Authority</li>
              <li>
                AUSTRAC:
                <ul>
                  <li>
                    A work health and safety authority of a State or Territory.
                  </li>
                  <li>
                    A body of a State or Territory that has responsibilities to
                    those mentioned above enforcement action may include.
                  </li>
                  <ul>
                    <li>Banning Orders</li>
                    <li>Cancellation of NDIS Registraction</li>
                    <li>
                      Involuntary cancellation of an entity's incorporation
                      status
                    </li>
                    <li>Any other compliance or enforcement</li>
                  </ul>
                </ul>
              </li>
            </ul>
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ bgcolor: "whitesmoke" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>Question 8</Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox />
              Yes
              <Checkbox /> No
            </Grid>
          </Grid>
          <hr />
          <Box>
            <Typography>
              <b>
                {" "}
                If you have circled YES to any of the above question .please
                provide a detailed comment below with explanation.
              </b>
            </Typography>
            <List>
              <ListItem>
                <Typography> Detailed Comment </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  This is a paragraph of a text quite long testing{" "}
                </Typography>
              </ListItem>
              <ListItem>
                {/* <input height={100} className=' form form-control ' /> */}
              </ListItem>
            </List>
          </Box>
        </Container>
      </Box>
      <Box>
        <Button style={{ backgroundColor: "#E0E0E0", color: "black" }}>
          Previous step
        </Button>
        <Button
          style={{
            backgroundColor: "#0CB4D0",
            color: "white",
            marginLeft: "5px",
          }}
        >
          Save and proceed
        </Button>
      </Box>
    </Container>
  );
};
