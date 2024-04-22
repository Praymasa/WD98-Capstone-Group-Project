import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { EmployeeLoginBox } from "../components/EmployeeLoginBox";

const AppContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function EmployeesPortal() {
  return (
    <AppContainer>
      <EmployeeLoginBox />
    </AppContainer>
  );
}
