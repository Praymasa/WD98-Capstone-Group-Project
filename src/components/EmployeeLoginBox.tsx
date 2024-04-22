import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EmployeeLoginForm } from "../components/EmployeeLoginForm";
import { Box, Typography } from "@mui/material";

const BoxContainer = styled(Box)`
  margin: 50px;
  width: 280px;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;

  @media (min-width: 500px) {
    width: 500px;
  }

  @media (min-width: 800px) {
    width: 800px;
  }
`;

const TopContainer = styled(Box)`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  background: #4e4c67;
  background: linear-gradient(
    58deg,
    rgba(78, 76, 103, 1) 20%,
    rgba(155, 39, 176, 1) 100%
  );

  @media (max-width: 500px) {
    top: -320px;
    left: -140px;
  }

  @media (min-width: 500px) {
    top: -340px;
    left: -240px;
  }

  @media (min-width: 800px) {
    top: -360px;
    left: -210px;
  }
`;

const HeaderContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled(Typography)`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled(Typography)`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

export function EmployeeLoginBox() {
  return (
    <BoxContainer>
      <TopContainer>
        <BackDrop>
          <HeaderContainer>
            <HeaderText variant="h2">Welcome</HeaderText>
            <HeaderText variant="h2">Back</HeaderText>
            <SmallText variant="h5">Please sign-in to continue!</SmallText>
          </HeaderContainer>
        </BackDrop>
      </TopContainer>
      <InnerContainer>{<EmployeeLoginForm />}</InnerContainer>
    </BoxContainer>
  );
}
