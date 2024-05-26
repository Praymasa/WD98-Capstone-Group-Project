import React, { useEffect } from "react";
import { Avatar, Box, Container, Typography } from "@mui/material";
import HomeCare from "../../public/Images/Loyal-Employment-Home.png";
import "../pages/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WhyUs() {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
  });

  const whyUsItems = [
    {
      title: "Quality Assurance of Service Providers",
      description:
        "We focus our efforts on bringing you the most capable and professional foreign domestic workers for you and your family. Your satisfaction is our top priority as we understand the need for someone that you can trust and rely on to take care of your family.",
    },
    {
      title: "Comprehensive Checks",
      description:
        "We have conducted comprehensive background checks and interviews to better understand the needs. It is particularly important so as to establish a better understanding and working relationship which would benefit both the employer and employee subsequently.",
    },
    {
      title: "True Care",
      description:
        "Our sole purpose as a family is to ensure quality service and genuine care to you as our extended family. Your expectations are important to us.",
    },
    {
      title: "Flexibility",
      description:
        "Understanding the norm that sometimes nothing goes as planned, we dedicate our service to ensure that we are able to cater to your needs especially during the last unexpected service requests.",
    },
    {
      title: "Affordability",
      description:
        "We do everything we can to make our services as affordable as possible. Our budget flexibility extends all the way to employing the right amount of help at the right times to make a positive difference in our customers’ lives.",
    },
  ];

  return (
    <>
      <Box
        id="why"
        sx={{
          px: 5,
          py: 8,
          overflow: "auto",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            sx={{
              textAlign: "center",
              m: 5,
            }}
          >
            Why Choose <span className="color">U</span>s?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 5,
              textAlign: { xs: "start", md: "center" },
            }}
          >
            Balancing work and family can be a daunting task for working
            parents. At{" "}
            <b>
              <span className="color">Y</span>
            </b>
            our
            <b>
              <span className="color">B</span>
            </b>
            est Care, we understand the challenges you face. Our mission is
            simple: to support your needs and help you achieve your goals. With
            our caring team by your side, together we can conquer challenges,
            accomplish each other's goals, and thrive.
          </Typography>
          <Avatar
            variant="square"
            src={HomeCare}
            className="why-img"
            sx={{
              height: { xs: "100%", sm: "50%", xl: "30%" },
              width: { xs: "100%", sm: "50%", xl: "30%" },
              objectFit: "cover",
              float: "right",
            }}
          />

          <Box
            className="why"
            sx={{
              marginLeft: { xs: "0", md: 3 },
              marginTop: { xs: 1, md: 3 },
            }}
          >
            {whyUsItems.map((item, index) => (
              <Box
                key={index}
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                <Typography variant="h6" gutterBottom>
                  <b>{item.title}</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
