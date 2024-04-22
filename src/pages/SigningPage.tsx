import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { AccountBox } from "../components/ClientAccountBox";

const AppContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function SigningPage() {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}

export default SigningPage;
