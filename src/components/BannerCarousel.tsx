import { Box, Button, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import "../pages/Services.css";
import React from "react";

const CarouselItem = styled(Paper)(({}) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  position: "relative",
  marginTop: "auto",
  opacity: 0,
  transition: "opacity 0.5s ease-in-out",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
  opacity: "75%",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    height: "auto",
  },
}));

export default function BannerCarousel() {
  const items = [
    {
      title: "Housekeeping",
      subtitle: "If a job not done right, We'll make it right",
      description:
        "Our housekeeping services guarantee a spotless and organized home. With our meticulous process, eco-friendly products, and attention to detail, we create a clean and inviting environment tailored to your needs.",
      image: "../../public/Images/housekeeping/Do-Good-Cleaning-banner.jpg",
      buttonLabel: "Book Now!",
      buttonLink: "/reservations",
    },
    {
      title: "Child Care",
      subtitle: "Choose the best for your Child",
      description:
        "Our dedicated team of Nannies/Baby Sitter prioritize your child's safety, development, and happiness. Through engaging activities, personalized attention, and a warm atmosphere, we ensure your child receives the best care possible.",
      image: "../../public/Images/ChildCare/nanny-banner.png",
      buttonLabel: "Book Now!",
      buttonLink: "/reservations",
    },
    {
      title: "Senior Care",
      subtitle: "The Care you need in the place you love.",
      description:
        "Dedicated to dignified care, we provide personalized senior care services. Our compassionate team focuses on comfort, safety, and promoting independence, ensuring your loved ones feel valued and respected.",
      image: "../../public/Images/SeniorCare/SeniorCare-banner.jpg",
      buttonLabel: "Book Now!",
      buttonLink: "/reservations",
    },
  ];

  return (
    <>
      <Box>
        <Carousel autoPlay animation="fade" interval={6000}>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              sx={{ height: { xs: 400, md: 900 }, opacity: 1 }}
            >
              <Image src={item.image} alt="Carousel Image" />
              <Box
                sx={{
                  zIndex: 2,
                  textAlign: "center",
                  p: 4,
                  backgroundColor: "#fcecf079",
                  borderTopRightRadius: 100,
                  maxWidth: 400,
                  marginTop: "auto",
                }}
              >
                <Typography variant="h3" className="banner-title">
                  {item.title}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  <b>{item.subtitle}</b>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    visibility: { xs: "hidden", sm: "visible" },
                    position: { xs: "absolute", sm: "relative" },
                  }}
                >
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  href={item.buttonLink}
                  sx={{ boxShadow: "5px 5px #4e4d66" }}
                >
                  {item.buttonLabel}
                </Button>
              </Box>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    </>
  );
}
