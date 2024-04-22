import React from "react";

export const AccountContext = React.createContext<{
  switchToSignup: () => void;
  switchToSignin: () => void;
}>({
  switchToSignup: () => {},
  switchToSignin: () => {},
});
