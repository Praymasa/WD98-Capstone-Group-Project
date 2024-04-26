import * as React from "react";
import { Link, useNavigate } from "react-router-dom"; // Update the import statement
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Logo from "../../public/Images/YB_Care_logo.png";
import BookingForm from "./BookingForm";
import useLocalStorage from "../hooks/useLocalStorage";
import { api } from "../servicesApi";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const DrawerPaper = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

const NavIconHide = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export default function Navigation(props: { window: any }) {
  const { window } = props;
  const { token, removeItem } = useLocalStorage();
  const [user, setUser] = useState<{
    fullname: string;
    id_proof: string | undefined;
    user_role: string;
  } | null>(null);
  const navigate = useNavigate(); // Update the hook here
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openBookingModal, setOpenBookingModal] = React.useState(false);
  const isMediumDevice = useMediaQuery("(max-width:900px)");

  async function handleLogout() {
    try {
      await api.post("/signingpage");
      removeItem("token");
      removeItem("user");
      navigate("/");
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleBookingModalOpen = () => {
    setOpenBookingModal(true);
  };

  const handleBookingModalClose = () => {
    setOpenBookingModal(false);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", width: 240 }}>
      <Typography id="drawer-brand-name" variant="h6" sx={{ my: 2 }}>
        <span>Y</span>our<span>B</span>est Care
      </Typography>
      <Divider />
      <List onClick={handleDrawerClose}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleBookingModalOpen}>
          Book Now
        </ListItemButton>
        {!token ? (
          <>
            <ListItemButton component={Link} to="/signingpage">
              Sign Up
            </ListItemButton>
            <ListItemButton component={Link} to="/loginpage">
              <AccountCircleIcon /> &nbsp;Log In
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton onClick={handleLogout}>Sign Out</ListItemButton>
            <ListItemButton component={Link} to="/employeedashboard">
              <Avatar src={user?.id_proof} /> &nbsp;Dashboard {user?.fullname}
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar id="navigationBar" component="nav" position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <NavIconHide
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </NavIconHide>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              id="brand-name"
              variant="h4"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 5,
              }}
            >
              <Avatar variant="square" src={Logo} />
              &nbsp;
              <span className="span">
                <span>Y</span>our<span>B</span>est Care
              </span>
            </Typography>
            {!isMediumDevice && (
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    sx={{ color: "#fff" }}
                    component={Link}
                    to={item.path}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBookingModalOpen}
              sx={{ color: "#fff" }}
            >
              Book Now!
            </Button>
            <Button component={Link} to="/signingpage" sx={{ color: "#fff" }}>
              Sign Up
            </Button>
            <Button component={Link} to="/loginpage" sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <DrawerPaper
        container={container}
        variant="temporary"
        open={mobileOpen && isMediumDevice}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawer}
      </DrawerPaper>
      <Box component="main" sx={{ p: 3 }}>
        <BookingForm
          open={openBookingModal}
          onClose={handleBookingModalClose}
          services={[]}
          terms={[]}
        />
      </Box>
    </Box>
  );
}
