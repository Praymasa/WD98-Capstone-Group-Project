import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  TextField,
  Link,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Marginer } from "./Marginer";
import { AccountContext } from "./AccountContext";
import { api } from "../servicesApi";
import useLocalStorage from "../hooks/useLocalStorage";

const FormContainer = styled(Box)`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MutedLink = styled(Link)`
  font-size: 11px;
  color: rgb(0, 25, 253);
  font-weight: 500;
`;
const MutedText = styled(Typography)`
  font-size: 11px;
  color: rgba(160, 160, 160);
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

const SubmitButton = styled(Button)`
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
  text-decoration: none;
  color: #9c27b0;
  font-size: 11px;
  font-weight: 500;
`;

export function LoginForm() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { setItem } = useLocalStorage();
  const { switchToSignup } = useContext(AccountContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = {
        email: clientEmail,
        password: clientPassword,
      };
      const { data } = await api.post("/login", body);
      setItem("token", data.token);
      setItem("user", JSON.stringify(data.user));
      navigate("/clientdashboard");
      navigate(0);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <>
      <>
        <FormContainer>
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
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <MutedLink href="#">Forget your password?</MutedLink>
          <Marginer direction="vertical" $margin="1.6em" />
          <SubmitButton type="submit" onClick={handleSubmit}>
            Signin
          </SubmitButton>
          <Marginer direction="vertical" $margin="1em" />
          <MutedText>
            Don't have an account?{" "}
            <BoldLink onClick={switchToSignup}>Sign-up now!</BoldLink>
          </MutedText>
        </FormContainer>
      </>
    </>
  );
}
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
