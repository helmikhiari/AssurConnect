import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { loadCurrentUser } from "../assets/Apis/assets";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(null);
  const loadMe = async (token) => {
    const decodedJwt = jwtDecode(token);
    const r = decodedJwt.role;
    const response = await loadCurrentUser(token, r);
    return { data: response, role: r };
  };
  const logOut = () => {
    setActiveProfile({ data: false });
    window.location = "/";
    localStorage.clear();
  };
  const value = {
    activeProfile,
    setActiveProfile,
    loadMe,
    logOut,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
