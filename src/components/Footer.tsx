import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Himap from "../../public/Images/logo/himap.png";
import Ohnap from "../../public/Images/logo/OHNAP.jpg";
import Redcross from "../../public/Images/logo/Red_Cross.png";
import Pasei from "../../public/Images/logo/PASEI.png";
import Pps from "../../public/Images/logo/pps-logo.png";
import Whop from "../../public/Images/logo/whop.png";
import Paascu from "../../public/Images/logo/Paascu.png";
import Logo from "../../public/Images/YBCare Logo.png";
import styled from "styled-components";

const Input = styled(TextField)`
  width: 100%;

  & input {
    font-size: 12px;
  }

  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  & label {
    color: rgba(200, 200, 200, 1);
  }

  & .Mui-focused {
    & label {
      color: #9c27b0;
    }

    & .MuiOutlinedInput-notchedOutline {
      border-color: #9c27b0;
    }
  }
`;
const SelectInput = styled(FormControl)`
  width: 100%;

  & input {
    font-size: 12px;
  }

  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  & label {
    color: rgba(200, 200, 200, 1);
  }

  & .Mui-focused {
    & label {
      color: #9c27b0;
    }

    & .MuiOutlinedInput-notchedOutline {
      border-color: #9c27b0;
    }
  }
`;

const quickLinks = [
  { label: "About", path: "/about" },
  { label: "Member of the Workforce", path: "/about#employees" },
  { label: "Pricing and Policies", path: "/contact" },
  { label: "Testimonials and Reviews", path: "" },
  { label: "Locations", path: "/locations" },
  { label: "Contact Us", path: "/contact" },
  { label: "For Our Employee", path: "/employeesportal" },
];

const services = [
  { label: "Housekeeping", path: "/services#housekeeping" },
  { label: "Child Care", path: "/services#childcare" },
  { label: "Senior Care", path: "/services#seniorcare" },
];

const frequentlyVisited = [
  { label: "Careers", path: "careers" },
  { label: "FAQs", path: "/faq" },
  { label: "Blogs", path: "/blogs" },
];

const footerStyle = {
  marginTop: "auto",
};

export default function Footer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");

  const ybcEmail = "ybc@gmail.com";
  const tel = "0987654321";

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      position: position,
      experience: experience,
    };

    try {
      const response = await fetch("ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setFullName("");
    setEmail("");
    setContactNumber("");
    setPosition("");
    setExperience("");
    setIsDialogOpen(false);
  };

  return (
    <Box sx={footerStyle}>
      <Box
        sx={{
          p: 1,
          height: "auto",
          backgroundColor: "#4E4C67",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" marginY={2}>
          Let's connect. You can{" "}
          <Link href={`tel:${tel}`} color={"#fff"}>
            call us
          </Link>
          . Or{" "}
          <Link href={`mailto:${email}`} color={"#fff"}>
            we'll call you
          </Link>
        </Typography>
      </Box>
      <Box>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", m: "auto", py: 3 }}
        >
          <Grid item xs={12} sm={3} marginLeft={2}>
            <Typography>
              <b>Quick Links</b>
            </Typography>
            <Box sx={{ display: "block", my: 1 }}>
              {quickLinks.map((item) => (
                <Typography key={item.label}>
                  <Link
                    sx={{ color: "#000", textDecoration: "none" }}
                    href={item.path}
                  >
                    {item.label}
                  </Link>
                </Typography>
              ))}
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={3} marginLeft={2}>
            <Typography>
              <b>Services</b>
            </Typography>
            <Box
              sx={{
                display: "block",
                my: 1,
              }}
            >
              {services.map((item) => (
                <Typography key={item.label}>
                  <Link
                    sx={{ color: "#000", textDecoration: "none" }}
                    href={item.path}
                  >
                    {item.label}
                  </Link>
                </Typography>
              ))}
            </Box>
            <Typography>
              <b>Frequently Visited</b>
            </Typography>
            <Box sx={{ display: "block", my: 1 }}>
              {frequentlyVisited.map((item) => (
                <Typography key={item.label}>
                  {item.label === "Careers" ? (
                    <Link
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onClick={handleDialogOpen}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      sx={{ color: "#000", textDecoration: "none" }}
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  )}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md={3} marginLeft={2}>
            <Typography>
              <b>
                <span>We</span> Are:
              </b>
            </Typography>
            <Box>
              <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ marginTop: { xs: 1, md: 5 } }}
              >
                <Grid item>
                  <Avatar variant="square" src={Himap} sx={{ width: "100%" }} />
                </Grid>
                <Grid item>
                  <Avatar variant="square" src={Ohnap} sx={{ width: "100%" }} />
                </Grid>
                <Grid item>
                  <Avatar
                    variant="square"
                    src={Redcross}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item>
                  <Avatar variant="square" src={Pasei} sx={{ width: "100%" }} />
                </Grid>
                <Grid item>
                  <Avatar variant="square" src={Pps} sx={{ width: "100%" }} />
                </Grid>
                <Grid item>
                  <Avatar variant="square" src={Whop} sx={{ width: "100%" }} />
                </Grid>
                <Grid item>
                  <Avatar
                    variant="square"
                    src={Paascu}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item>
              <Avatar variant="square" src={Logo} />
            </Grid>
            <Grid item xs={12} md={8} marginLeft={2}>
              <small>
                YourBest Care 2024&nbsp;&nbsp;|&nbsp;&nbsp;Terms and
                Conditions&nbsp;&nbsp;|&nbsp;&nbsp;Privacy&nbsp;&nbsp;Site Map
              </small>
              <br />
              <small>
                WD98 KodeGo&nbsp;&nbsp;|&nbsp;&nbsp;Princess
                Ymasa&nbsp;&nbsp;|&nbsp;&nbsp;Cris Canon
              </small>
            </Grid>
            <Grid display="flex">
              <Grid item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#A53860"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </Grid>
              <Grid item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#A53860"
                  viewBox="0 0 256 256"
                >
                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                </svg>
              </Grid>
              <Grid item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#A53860"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
              </Grid>
              <Grid item>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#A53860"
                  viewBox="0 0 256 256"
                >
                  <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                </svg>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Looking for a career opportunity?</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                margin="normal"
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />
              <Input
                label="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                margin="normal"
              />
              <SelectInput margin="normal">
                <InputLabel>Position Applying For</InputLabel>
                <Select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <MenuItem value="housekeeper">Housekeeper</MenuItem>
                  <MenuItem value="nanny">Nanny/Babysitter</MenuItem>
                  <MenuItem value="caregiver">Caregiver</MenuItem>
                </Select>
              </SelectInput>
              <Input
                label="Experience and Skills"
                multiline
                rows={4}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                margin="normal"
              />
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
