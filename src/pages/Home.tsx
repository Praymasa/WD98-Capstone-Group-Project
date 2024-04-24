import React, { useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import FamilyPhone from "../../public/Images/family-phone.webp";
import BookingForm from "../components/BookingForm";
import WhyUs from "../components/WhyUs";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

export default function Home() {
  const [openBookingModal, setOpenBookingModal] = React.useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
  });

  const handleBookingModalOpen = () => {
    setOpenBookingModal(true);
  };

  const handleBookingModalClose = () => {
    setOpenBookingModal(false);
  };

  return (
    <>
      <Box id="welcome-pg">
        <Grid
          container
          spacing={2}
          sx={{
            py: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "auto", md: "95vh" },
            // backgroundColor: "#dccfdf44",
          }}
        >
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 5,
                backgroundColor: "#dccfdfa9",
              }}
            >
              <Typography
                variant="h2"
                className="balance"
                sx={{
                  p: 2,
                  boxShadow: "-5px -5px #A53860",
                }}
              >
                <span>B</span>alanc<span>E</span> <span>S</span>tar
                <span>T</span>
                's at Home
                <Diversity2Icon color="secondary" />
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  display: "inline",
                  mb: 5,
                  pb: 2,
                  boxShadow: "5px 5px #A53860",
                }}
              >
                <span>Your</span> Home, Our <span>Care</span>.
              </Typography>

              <Button
                onClick={handleBookingModalOpen}
                variant="contained"
                color="secondary"
                sx={{
                  alignSelf: "flex-end",
                  marginRight: 6,
                  mb: 5,
                  boxShadow: "5px 5px #4e4d66",
                }}
              >
                Book a Service Now!
              </Button>

              <Grid container spacing={2} sx={{ mt: "auto" }}>
                <Grid item>
                  <Button
                    component={HashLink}
                    to="/services#housekeeping"
                    variant="contained"
                    className="btn-links"
                  >
                    Housekeeping
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={HashLink}
                    to="/services#seniorcare"
                    variant="contained"
                    className="btn-links"
                  >
                    Senior Care
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={HashLink}
                    to="/services#childcare"
                    variant="contained"
                    className="btn-links"
                  >
                    Child Care
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Box>

      <Divider />

      <Box
        id="hth"
        sx={{
          p: 5,
          overflow: "auto",
        }}
      >
        <Typography
          variant="h4"
          className="bottom-line"
          sx={{
            visibility: { xs: "visible", md: "hidden" },
            my: 2,
          }}
        >
          Here To Help to be at <span>Y</span>our<span>B</span>est.
        </Typography>

        <Grid container p={5}>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                marginTop: { xs: 2, xl: 10 },
                marginLeft: { xs: 0, lg: 5 },
                marginBottom: 5,
                maxWidth: 500,
              }}
            >
              <span className="family-word">Family Life</span> is challenging,
              and so, too, is the role mothers and fathers play at work and at
              home. Juggling to the roles as a parent, partner, employee, and
              household manager is a delicate balancing act. From prioritizing
              tasks to maintaining communication and finding time for self-care,
              navigating these responsibilities requires finesse.
            </Typography>
            <br />
            <Typography
              variant="h4"
              className="bottom-line"
              data-aos="zoom-in-up"
              data-aos-offset="100"
              sx={{
                display: "inline",
                visibility: { xs: "hidden", md: "visible" },
                position: { xs: "absolute", md: "relative" },
                marginLeft: { xs: 0, lg: 20 },
              }}
            >
              Here To Help to be at <span>Y</span>our<span>B</span>est.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginLeft: { xs: 0, lg: 30 },
                marginTop: 5,
                maxWidth: 700,
              }}
            >
              We offer{" "}
              <HashLink to={"/services#housekeeping"} className="hashlink">
                Housekeeping
              </HashLink>{" "}
              ,{" "}
              <HashLink to={"/services#childcare"} className="hashlink">
                Child Care
              </HashLink>
              , and{" "}
              <HashLink to={"/services#seniorcare"} className="hashlink">
                Senior Care
              </HashLink>{" "}
              services to ease the burden of managing multiple responsibilities.
              By outsourcing these tasks to our professionals, you can reclaim
              valuable time to focus on work, family, and personal well-being.
              Our services not only ensure a clean and organized living
              environment but also provide expert care for children and seniors,
              offering peace of mind and support for busy individuals balancing
              numerous roles.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <WhyUs />

      <Box
        id="difference"
        sx={{
          py: 10,
          textAlign: "center",
          maxHeight: 1500,
        }}
      >
        <Container data-aos="fade-down">
          <Typography variant="h4" className="bottom-line">
            What Makes <span className="color">U</span>s Different?
          </Typography>
        </Container>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              py: 5,
              marginX: { xs: 2, sm: 0 },
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                variant="square"
                src={FamilyPhone}
                alt="Layered Image"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                sx={{
                  display: "block",
                  width: "auto",
                  height: "auto",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  position: "relative",
                  zIndex: 2,
                  borderRadius: 2,
                }}
              />
              <Paper
                elevation={12}
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                style={{
                  position: "absolute",
                  top: 25,
                  left: 25,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  background: "#9C27B0",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              marginLeft: { xs: 0, sm: 5 },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                marginBottom: { xs: 0, md: 2, lg: 3 },
                textAlign: "center",
              }}
            >
              See Why Homeowners Nationwide Prefer Our Company.{" "}
              <small>
                <Link to={"/"}>visit blog post</Link>
              </small>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "left", md: "center" },
                mb: { xs: 3, lg: 10 },
              }}
            >
              We stand out and devoted in making exceptional customer care, and
              innovative solutions. Our commitment to quality, reliability, and
              transparent pricing ensures peace of mind for our clients. Through
              community engagement and values alignment, we build trust and
              loyalty. With positive testimonials and reviews, we prove our
              dedication to customer satisfaction. Choose us for a unique and
              personalized experience that exceeds expectations
            </Typography>
            <Button
              onClick={handleBookingModalOpen}
              variant="contained"
              color="secondary"
              sx={{
                display: "flex",
                justifySelf: "center",
                m: "auto",
                boxShadow: "5px 5px #4e4d66",
              }}
            >
              Book a Service Now!
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <BookingForm
          open={openBookingModal}
          onClose={handleBookingModalClose}
          services={[]}
          terms={[]}
        />
      </Box>
    </>
  );
}
