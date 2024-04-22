import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { LoginBox } from "../components/ClientLoginBox";

const AppContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function LoginPage() {
  return (
    <AppContainer>
      <LoginBox />
    </AppContainer>
  );
}
