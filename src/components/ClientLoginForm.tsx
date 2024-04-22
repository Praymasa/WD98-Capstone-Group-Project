import React, { useContext, useState } from "react";
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

export function LoginForm() {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(data));
        //auth page
        window.location.href = "/clientdashboard";
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <FormContainer>
      <Input
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
  );
}
function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}
