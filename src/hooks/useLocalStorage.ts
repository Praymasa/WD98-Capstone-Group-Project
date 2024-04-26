import { useState } from "react";

const useLocalStorage = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<string | null>(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  function setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    return value !== null ? value : null; // Ensure TypeScript understands null possibility
  }

  function removeItem(key: string) {
    localStorage.removeItem(key);
  }

  return {
    token,
    user,
    setToken,
    setUser,
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
