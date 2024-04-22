import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import BannerCarousel from "../components/BannerCarousel";
import Housekeeping from "../../public/Images/housekeeping/cleaning-shape.png";
import Stepper from "../components/Stepper";
import {
  fetchChildCareTypes,
  fetchCleaningTypes,
  fetchSeniorCareTypes,
} from "../servicesApi";

interface CleaningType {
  title: string;
  description: string;
  image?: string;
  rate: any;
}
interface ChildCareType {
  title: string;
  description: string;
  image?: string;
  rate: any;
}
interface SeniorCareType {
  title: string;
  description: string;
  image?: string;
  rate: any;
}

export default function Services() {
  const [cleaningTypes, setCleaningTypes] = useState<CleaningType[]>([]);
  const [childCareTypes, setChildCareTypes] = useState<ChildCareType[]>([]);
  const [seniorCareTypes, setSeniorCareTypes] = useState<SeniorCareType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cleaningData = await fetchCleaningTypes();
        const childCareData = await fetchChildCareTypes();
        const seniorCareData = await fetchSeniorCareTypes();
        setCleaningTypes(cleaningData);
        setChildCareTypes(childCareData);
        setSeniorCareTypes(seniorCareData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BannerCarousel />
      <Box id="housekeeping" p={5}>
        <Container>
          <Box>
            <Typography
              variant="h4"
              className="bottom-line"
              textAlign={"center"}
              marginBottom={5}
            >
              <b>
                <span>H</span>ousekeeping <span>S</span>ervice
              </b>
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <Avatar
                  variant="square"
                  src={Housekeeping}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" marginBottom={2}>
                  Is cleaning the house getting lost on your endless to-do list?
                  We understand that your busy schedule often leaves little room
                  for regular cleaning. Housekeeping services from our dedicated
                  team of professionals ensure your living space is spotless and
                  refreshing, providing you with the comfort and peace you
                  desire. Your search for professional cleaning services near
                  you ends when you contact{" "}
                  <b>
                    <span>Y</span>our<span>B</span>est Care
                  </b>
                  .
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Since 2020, customers have welcomed the trusted cleaning
                  professionals from locally owned and operated businesses into
                  their homes. We’ve provided cleaning services to over a
                  million customers, and want you to know that you can continue
                  to rely on us to go above and beyond to provide you with a
                  worry-free, top-notch cleaning service every time.
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Taking care of homes and those in them is what we do best. We
                  firmly believe a healthy home is a clean home!
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box my={5}>
            <Typography variant="h4" textAlign={"center"} marginBottom={5}>
              <span>O</span>ur <span>A</span>pproach : Custome Cleaning
            </Typography>
            <Typography variant="body1" textAlign={"center"} marginBottom={5}>
              Are you tired of struggling to keep up with cleaning your home
              amidst a busy schedule? Look no further than{" "}
              <b>
                <span>Y</span>our<span>B</span>est Care
              </b>
              custom cleaning services. Our team understands that maintaining a
              well-cleaned home can be a challenge, especially when you have a
              packed calendar. That's why we offer custom cleaning services
              designed to meet your unique needs and preferences.
            </Typography>

            <Box className="grid-box" display="grid" sx={{ gridGap: 20 }}>
              {cleaningTypes.map((type, index) => (
                <Typography variant="body1" marginBottom={3} key={index}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>{type.title}</b>: {type.description}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box id="childcare" p={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <b>
              <span>C</span>hild <span>C</span>are Service
            </b>
          </Typography>
          <Typography variant="body1" marginBottom={5} textAlign={"center"}>
            Find a nanny your kids will love. Over 5,000 families trust{" "}
            <b>
              <span>Y</span>our<span>B</span>est Care
            </b>{" "}
            to find child care that fits their needs
          </Typography>
          <Box>
            <Grid container spacing={2}>
              {childCareTypes.map((type, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      height: "100%",
                      backgroundColor: "#dccfdf80",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="50%"
                      image={type.image}
                      alt={`image for ${type.title}`}
                    />
                    <CardContent>
                      <Typography
                        key={index}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {type.title}
                      </Typography>
                      <Typography variant="body2">
                        {type.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box id="seniorcare" p={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <b>
              <span>S</span>enior <span>C</span>are Service
            </b>
          </Typography>
          <Box sx={{ backgroundColor: "#dccfdf80", p: 5 }}>
            <Typography variant="body1" textAlign={"center"} marginBottom={5}>
              We’ve had the privilege of providing in-home care to thousands of
              clients nationwide since YBCare was founded more than 4 years ago.
              Each of those clients has had their own set of unique needs, and
              we’ve worked with each one to develop and deliver a personalized
              care plan based on their health goals. Because YBCare offers a
              wide variety of services, we are able to easily modify your care
              plan and services should your needs change.
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign={"center"} gutterBottom>
                  <b>Personal Care and Companionship Services</b>
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={7}
                  sx={{ textAlign: { xs: "left", md: "center" } }}
                >
                  We aim to support seniors in maintaining their independence,
                  safety, and overall well-being while providing them with
                  personalized care and companionship. It is important to note
                  that the specific services provided may vary depending on the
                  individual needs and preferences of the senior.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign={"center"} gutterBottom>
                  <b>Private Duty Nursing Care Services</b>
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={7}
                  sx={{ textAlign: { xs: "left", md: "center" } }}
                >
                  These private duty nursing services are tailored to meet the
                  unique healthcare needs of seniors. Private duty nurses work
                  closely with seniors and their families to develop a
                  personalized care plan that addresses their specific health
                  concerns and promotes their overall well-being.
                </Typography>
              </Grid>
            </Grid>

            <Box className="grid-box" display="grid" sx={{ gridGap: 20 }}>
              {seniorCareTypes.map((type, index) => (
                <>
                  <Typography variant="body1" marginBottom={5} key={index}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>{type.title}</b>: {type.description}
                  </Typography>
                  <HashLink to={"/FAQs"}>
                    <small>view rate</small>
                  </HashLink>
                </>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box p={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <b>
              <span>W</span>e're <span>H</span>ere For You at Every Step of The
              Process
            </b>
          </Typography>
          <Stepper />
        </Container>
      </Box>
    </>
  );
}
