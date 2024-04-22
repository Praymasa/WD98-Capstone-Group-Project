import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { LoginForm } from "./ClientLoginForm";
import { AccountContext } from "./AccountContext";
import SignupForm from "./ClientSignUpForm";

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

const BackDrop = styled(motion.div)`
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

export function LoginBox() {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const [backdropVariants, setBackdropVariants] = useState({
    expanded: {
      width: "543%",
      height: "1500px",
      borderRadius: "20%",
      transform: "rotate(50deg)",
    },
    collapsed: {
      width: "160%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(60deg)",
    },
  });

  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 500) {
        setBackdropVariants((prevVariants) => ({
          ...prevVariants,
          expanded: {
            ...prevVariants.expanded,
            width: "233%",
            height: "2020px",
            borderRadius: "20%",
            transform: "rotate(150deg)",
          },
          collapsed: {
            ...prevVariants.collapsed,
            width: "177%",
            height: "550px",
            borderRadius: "50%",
            transform: "rotate(167deg)",
          },
        }));
      } else if (windowWidth >= 800) {
        setBackdropVariants((prevVariants) => ({
          ...prevVariants,
          expanded: {
            ...prevVariants.expanded,
            width: "233%",
            height: "2020px",
            borderRadius: "20%",
            transform: "rotate(150deg)",
          },
          collapsed: {
            ...prevVariants.collapsed,
            width: "177%",
            height: "550px",
            borderRadius: "50%",
            transform: "rotate(167deg)",
          },
        }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 600);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 600);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText variant="h2">Create</HeaderText>
              <HeaderText variant="h2">Account</HeaderText>
              <SmallText variant="h5">Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText variant="h2">Welcome</HeaderText>
              <HeaderText variant="h2">Back</HeaderText>
              <SmallText variant="h5">Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
