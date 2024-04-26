import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Cleaning from "../../public/Images/housekeeping/about-cleaning-service.jpeg";
import Childcare from "../../public/Images/ChildCare/about-nanny-services.webp";
import Seniorcare from "../../public/Images/SeniorCare/Seniors.jpg";
import BestEmployee from "../components/BestEmployee";
import "./About.css";
import EmployeeList from "../components/EmployeeList";
import { Employee } from "../Employee";
import { fetchEmployees } from "../servicesApi";

export default function About(employee) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ScrollTop = (props: { children: React.ReactElement }) => {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
    return (
      <Zoom in={trigger}>
        <div
          onClick={handleScrollTop}
          role="presentation"
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 100,
          }}
        >
          {props.children}
        </div>
      </Zoom>
    );
  };

  return (
    <>
      <Box id="about-us">
        <Container>
          <Box p={5}>
            <Box>
              <Typography
                variant="h4"
                className="bottom-line"
                textAlign={"center"}
                marginBottom={5}
              >
                <span>A</span>bout <span>U</span>s
              </Typography>
              <Typography variant="body1" marginBottom={3} textAlign={"center"}>
                Caring for her four children while juggling a demanding
                full-time job and household responsibilities, owners knows
                firsthand the overwhelming challenges many parents face.
                Struggling with stress and depression from this balancing act,
                she found inspiration in her own struggles. This led her to
                establish YourBest Care, a compassionate initiative born from
                her desire to support others experiencing similar hardships.
                With a mission to alleviate the burdens of fellow parents,
                YourBest Care offers comprehensive housekeeping, childcare, and
                senior care services. the Founder's journey from adversity to
                empathy drives our commitment to providing reliable and
                compassionate care for families in need.
              </Typography>
              <Typography variant="body1" marginBottom={5} textAlign={"center"}>
                At YourBest Care, we are your one-stop service provider for
                housekeeping, child care, and senior care. Our primary mission
                is to provide top-tier, personalized solutions to meet the
                varied needs of every household.
              </Typography>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Box
                    className="container"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Box className="overlay">
                      <HashLink
                        to={"/services#housekeeping"}
                        className="overlayButton"
                      >
                        Cleaning Service
                      </HashLink>
                    </Box>
                    <Avatar
                      variant="square"
                      className="avatar"
                      src={Cleaning}
                      sx={{
                        width: "100%",
                        height: "40%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Box display={"flex"} justifyContent={"center"} gap={2}>
                    <Box className="container">
                      <Box className="overlay">
                        <HashLink
                          to={"/services#childcare"}
                          className="overlayButton"
                        >
                          Child Care
                        </HashLink>
                      </Box>
                      <Avatar
                        variant="square"
                        className="avatar"
                        src={Childcare}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <Box className="container">
                      <Box className="overlay">
                        <HashLink
                          to={"/services#seniorcare"}
                          className="overlayButton"
                        >
                          Senior Care
                        </HashLink>
                      </Box>
                      <Avatar
                        variant="square"
                        className="avatar"
                        src={Seniorcare}
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ul>
                    <li>
                      <Diversity2Icon color="secondary" />
                      &nbsp; Our <b>Housekeeping Service</b> offers meticulous
                      and dependable domestic assistance, ensuring that your
                      home remains a sanctuary of comfort and cleanliness. Our
                      team of professionally trained housekeepers are committed
                      to maintaining a pristine environment for you and your
                      family, allowing you more time to focus on what truly
                      matters — spending quality time with your loved ones.
                    </li>
                    <li>
                      <Diversity2Icon color="secondary" />
                      &nbsp; Our <b>Child Care Service</b> is designed to
                      provide a nurturing and safe environment for your
                      children. Our experienced caregivers are well-versed in
                      child development and education, providing not only
                      custodial care but also contributing to the intellectual
                      and emotional growth of your children. We understand the
                      importance of entrusting the care of your little ones to
                      someone else, and we take this responsibility very
                      seriously.
                    </li>
                    <li>
                      <Diversity2Icon color="secondary" />
                      &nbsp; Our <b>Senior Care Service</b> is a testament to
                      our commitment to take care of your elderly loved ones
                      with the utmost respect and compassion. We provide a range
                      of services, from companionship to medication management,
                      all tailored to meet the unique needs of each individual.
                      Our caregivers are trained to offer both physical and
                      emotional support, ensuring your loved ones are
                      comfortable, safe, and engaged.
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box p={5} id="mission-vision">
        <Container sx={{ backgroundColor: "#dccfdfa8", p: 5 }}>
          <Grid container spacing={7} marginBottom={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" textAlign={"center"} gutterBottom>
                <b>
                  <span>O</span>ur Mission
                </b>
              </Typography>
              <ul>
                <li>
                  <Diversity2Icon color="secondary" sx={{}} />
                  &nbsp; We provide compassionate and reliable care services to
                  families, empowering them to thrive amidst life's demands.
                </li>
                <li>
                  <Diversity2Icon color="secondary" />
                  &nbsp; We are dedicated to offering top-tier housekeeping,
                  childcare, and senior care solutions, ensuring peace of mind
                  and well-being for every member of the household.
                </li>
                <li>
                  <Diversity2Icon color="secondary" />
                  &nbsp; With integrity, professionalism, and genuine care at
                  the core of our approach, we strive to make a positive
                  difference in the lives of those we serve.
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" textAlign={"center"} gutterBottom>
                <b>
                  <span>O</span>ur Vision
                </b>
              </Typography>
              <ul>
                <li>
                  <Diversity2Icon color="secondary" />
                  &nbsp; To be the trusted partner and beacon of support for
                  families navigating the complexities of modern life.
                </li>
                <li>
                  <Diversity2Icon color="secondary" />
                  &nbsp; We envision a world where every parent can confidently
                  pursue their career while ensuring the well-being of their
                  loved ones, knowing they have reliable care services they can
                  depend on.
                </li>
                <li>
                  <Diversity2Icon color="secondary" />
                  &nbsp; By fostering strong relationships built on trust,
                  empathy, and excellence, we aspire to become the leading
                  provider of holistic care solutions, enriching the lives of
                  families across communities.
                </li>
              </ul>
            </Grid>
          </Grid>

          <Typography variant="body1" marginBottom={3} textAlign={"center"}>
            At{" "}
            <b>
              <span>Y</span>our<span>B</span>est Care
            </b>
            , we take great pride in our dedicated and compassionate team of
            professionals who provide housekeeping, child care, and senior care
            services. Our employees are carefully selected, extensively trained,
            and committed to delivering exceptional care to our clients. Here is
            an overview of the roles and responsibilities of our staff in each
            service:
          </Typography>
          <Box>
            <Grid container gap={2} justifyContent={"center"}>
              <Grid item xs={12} sm={4} md={3} border={1} p={2}>
                <Diversity3Icon color="secondary" />
                <Typography marginBottom={2}>
                  Our team of experienced professionals specializes in
                  housekeeping, child care, and senior caregiving.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} border={1} p={2}>
                <ThumbUpAltIcon color="secondary" />
                <Typography marginBottom={2}>
                  Our dedicated professionals are trained in various techniques,
                  from cleaning and sanitation to age-appropriate routines and
                  handling age-related conditions.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} border={1} p={2}>
                <VerifiedUserIcon color="secondary" />
                <Typography marginBottom={2}>
                  Our staffs respects your privacy and values the security of
                  your belongings. We ensure a high standard of care for every
                  member of your family.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} border={1} p={2}>
                <LocalPharmacyIcon color="secondary" />
                <Typography marginBottom={2}>
                  We prioritize safety, whether it's maintaining a clean and
                  organized living environment, creating a nurturing and
                  stimulating atmosphere for children, or offering compassionate
                  support to the elderly, our dedicated team has personal
                  attention in all our care services.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} border={1} p={2}>
                <SettingsAccessibilityIcon color="secondary" />
                <Typography marginBottom={2}>
                  From maintaining a clean and organized living environment to
                  creating a nurturing atmosphere for children, and offering
                  compassionate support to the elderly, we cater to diverse
                  needs
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box id="employee-recom" px={5} py={8}>
        <Container>
          <Box
            className="bottom-line"
            sx={{ textAlign: "center", marginBottom: 5 }}
          >
            <Typography variant="h4">
              <span>O</span>ur <span>B</span>est Outstanding Employees
            </Typography>
            <Typography variant="body1">
              Recommendations from our clients about the exceptional care and
              professionalism of our recommended employees.
            </Typography>
          </Box>
          <BestEmployee />
        </Container>
      </Box>
      <Box>
        <ScrollTop>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              borderRadius: "50%",
              textTransform: "capitalize",
            }}
          >
            <KeyboardArrowUpIcon />
            Top
          </Button>
        </ScrollTop>
      </Box>
    </>
  );
}
function setEmployees(employeeData: any) {
  throw new Error("Function not implemented.");
}
