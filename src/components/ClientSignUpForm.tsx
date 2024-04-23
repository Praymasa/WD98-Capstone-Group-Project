import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Marginer } from "./Marginer";
import { AccountContext } from "./AccountContext";
import { api } from "../servicesApi";

const FormContainer = styled(Box)`
  padding-top: 5px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9c27b0;
    border-radius: 4px;
  }
`;

const MutedLink = styled(Typography)`
  font-size: 11px;
  color: rgb(160, 160, 160);
  font-weight: 500;
`;

const BoldLink = styled(Link)`
  font-size: 11px;
  color: #9c27b0;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
  cursor: pointer;
`;

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

const SubmitButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: #4e4c67;
  background: linear-gradient(
    38deg,
    rgba(78, 76, 103, 1) 20%,
    rgba(155, 39, 176, 1) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

const LogoutButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: #4e4c67;
  background: linear-gradient(
    38deg,
    rgba(78, 76, 103, 1) 20%,
    rgba(155, 39, 176, 1) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

const ProfileLink = styled(Link)`
  margin-top: 10px;
`;

const VisuallyHiddenInput = styled("input")({
  marginTop: 5,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function SignupForm({}) {
  const navigate = useNavigate();
  const { token } = useParams();
  const { switchToSignin } = useContext(AccountContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientGender, setClientGender] = useState("");
  const [clientBirthDate, setClientBirthDate] = useState("");
  const [clientStatus, setClientStatus] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientIdImage, setClientIdImage] = useState("");
  const [clientDetailedAdd, setClientDetailedAdd] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientProvince, setClientProvince] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientConfirmPassword, setClientConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [toastOpen, setToastOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      if (
        !clientFirstName ||
        !clientLastName ||
        !clientBirthDate ||
        !clientGender ||
        !clientStatus ||
        !clientDetailedAdd ||
        !clientCity ||
        !clientProvince ||
        !clientNumber ||
        !clientIdImage ||
        !clientEmail ||
        !clientPassword ||
        !clientConfirmPassword
      ) {
        setErrorMessage("Please fill out all fields.");
        alert(setErrorMessage);
      }

      if (clientPassword !== clientConfirmPassword) {
        setPasswordMatch(false);
        return;
      }
      //endpoint
      const response = await api.post("/register", {
        first_name: clientFirstName,
        last_name: clientLastName,
        date_of_birth: clientBirthDate,
        deatiled_address: clientDetailedAdd,
        city_municipality: clientCity,
        province: clientProvince,
        client_number: clientNumber,
        gender: clientGender,
        matiral_status: clientStatus,
        id_proof: clientIdImage,
        email: clientEmail,
        password: clientPassword,
        confirmpassword: clientConfirmPassword,
      });
      setToastOpen(true);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);

        const accountUrl = `/users/${token}`;

        navigate(accountUrl);
        setToastOpen(true);
      } else {
        setErrorMessage("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^\d{4}[-\s]?\d{3}[-\s]?\d{4}$/;
    return regex.test(phoneNumber);
  };

  function setErrorMessage(arg0: string) {
    throw new Error("Function not implemented.");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.href = "/loginpage";
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          <ProfileLink href={`/users${token}`}>View Profile</ProfileLink>
        </>
      ) : (
        <>
          <FormContainer>
            <Input
              label="First Name"
              type="text"
              variant="outlined"
              value={clientFirstName}
              onChange={(e) => setClientFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              type="text"
              variant="outlined"
              value={clientLastName}
              onChange={(e) => setClientLastName(e.target.value)}
            />
            <SelectInput variant="outlined">
              <InputLabel id="status-label">Gender</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={clientGender}
                onChange={(e) => setClientGender(e.target.value)}
              >
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
              </Select>
            </SelectInput>
            <Input
              label="Date of Birth"
              type="text"
              variant="outlined"
              value={clientBirthDate}
              onChange={(e) => setClientBirthDate(e.target.value)}
            />
            <SelectInput variant="outlined">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={clientStatus}
                onChange={(e) => setClientStatus(e.target.value)}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="widow">Widow</MenuItem>
              </Select>
            </SelectInput>
            <Input
              error={!isValidPhoneNumber}
              helperText={
                !isValidPhoneNumber &&
                "Invalid phone number format (e.g 0912-345-6789)"
              }
              value={clientNumber}
              onChange={(e) => {
                setClientNumber(e.target.value);
                setIsValidPhoneNumber(validatePhoneNumber(e.target.value));
              }}
              label="Contact Number"
              type="text"
              variant="outlined"
            />
            <Input
              label="Detailed Address"
              type="text"
              variant="outlined"
              value={clientDetailedAdd}
              onChange={(e) => setClientDetailedAdd(e.target.value)}
            />
            <Input
              label="City"
              type="text"
              variant="outlined"
              value={clientCity}
              onChange={(e) => setClientCity(e.target.value)}
            />
            <Input
              label="Province"
              type="text"
              variant="outlined"
              value={clientProvince}
              onChange={(e) => setClientProvince(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              variant="outlined"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={clientPassword}
              onChange={(e) => setClientPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              error={!passwordMatch}
              helperText={!passwordMatch && "Passwords do not match"}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              value={clientConfirmPassword}
              onChange={(e) => {
                setClientConfirmPassword(e.target.value);
                setPasswordMatch(e.target.value === clientPassword);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={toggleConfirmPasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="secondary"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ marginY: 3 }}
            >
              Upload Id Proof
              <VisuallyHiddenInput
                type="file"
                value={clientIdImage}
                onChange={(e) => setClientIdImage(e.target.value)}
              />
            </Button>
          </FormContainer>
          <SubmitButton type="submit" onClick={handleSubmit}>
            Signup
          </SubmitButton>
          <Marginer direction="vertical" $margin="1em" />
          <MutedLink marginBottom={2}>
            Already have an account?{" "}
            <BoldLink onClick={switchToSignin}>Sign-in</BoldLink>
          </MutedLink>
        </>
      )}
    </>
  );
}
