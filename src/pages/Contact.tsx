import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import "./Contact.css";

const contactLocations = [
  {
    location: "Laguna",
    contact: "0912345678",
    email: "laguna@ybcare.com",
  },
  {
    location: "Batangas",
    contact: "0912345678",
    email: "batangas@ybcare.com",
  },
  {
    location: "Cebu",
    contact: "0912345678",
    email: "cebu@ybcare.com",
  },
  {
    location: "Iloilo",
    contact: "0912345678",
    email: "iloilo@ybcare.com",
  },
  {
    location: "Manila",
    contact: "0912345678",
    email: "manila@ybcare.com",
  },
  {
    location: "Quezon City",
    contact: "0912345678",
    email: "quezoncity@ybcare.com",
  },
  {
    location: "Davao",
    contact: "0912345678",
    email: "davao@ybcare.com",
  },
  {
    location: "General Santos",
    contact: "0912345678",
    email: "gensan@ybcare.com",
  },
  {
    location: "Cagayan de Oro",
    contact: "0912345678",
    email: "cdo@ybcare.com",
  },
];

export default function Contact() {
  return (
    <>
      <Box id="contact" py={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <span>C</span>ontact <span>U</span>s
          </Typography>
          <Grid
            container
            display={"flex"}
            alignItems={"center"}
            sx={{ backgroundColor: "#dccfdfd0" }}
          >
            <Grid item xs={12} sm={8} marginRight={"auto"} p={5}>
              <Typography variant="h5" textAlign={"center"}>
                We are a mobile service and do not have a physical location.
                Instead, we bring our services directly to your home. Please
                feel free to reach out to us through the contact information
                provided, and we will be more than happy to schedule an
                appointment at your convenience.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="contact-info" p={5}>
              <Typography>
                <b>General Inquiries:</b>
              </Typography>
              <Typography>0912345678</Typography>
              <Typography marginBottom={3}>info@emailcom</Typography>

              <Typography>
                <b>Service Inquiry:</b>
              </Typography>
              <Typography>0912345678</Typography>
              <Typography marginBottom={3}>services@emailcom</Typography>

              <Typography>
                <b>Careers:</b>
              </Typography>
              <Typography>0912345678</Typography>
              <Typography>careers@emailcom</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        py={5}
      >
        <Container>
          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "left", sm: "center" }, marginBottom: 5 }}
          >
            We are thrilled to offer our services at multiple locations. Feel
            free to choose the location that is most convenient for you. If you
            have any questions or would like to schedule an appointment, please
            don't hesitate to contact us using the information provided below.
            We look forward to serving you!
          </Typography>
          <Grid container spacing={3} marginBottom={5}>
            {contactLocations.map((location, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box key={index}>
                  <Typography>
                    <b>{location.location}</b>
                  </Typography>
                  <Typography>{location.contact}</Typography>
                  <Typography>{location.email}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            Write Us Today!
          </Typography>
          <Typography variant="h6" textAlign={"center"} marginBottom={5}>
            Drop us a line! Send us an email today and let us bring our
            exceptional services directly to your doorstep, no-obligation care
            consultation for you or your loved one. Please fill out the form
            below. Our caring, capable, knowledgeable team are ready and willing
            to answer any questions or concerns you may have and will get back
            to you shortly.
          </Typography>
          <Container
            maxWidth="sm"
            sx={{
              boxShadow: "1px 1px 10px #4E4C67",
              borderRadius: 3,
              p: 5,
            }}
          >
            <TextField
              type="text"
              label="Full Name"
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              label="Contact Number"
              fullWidth
              margin="normal"
            />
            <TextField type="email" label="Email" fullWidth margin="normal" />
            <TextField
              type="text"
              label="Message"
              multiline
              fullWidth
              rows={8}
              margin="normal"
            />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{
                display: "flex",
                justifySelf: "center",
                m: "auto",
                marginTop: 5,
              }}
            >
              Submit
            </Button>
          </Container>
        </Container>
      </Box>
    </>
  );
}
