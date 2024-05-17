import { createContext, useContext, useEffect, useState } from "react";
import { Get } from "../assets/requests";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../../env";
import { loadCurrentUser } from "../assets/Apis/assets";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(null);

  const loadMe = async (token) => {
    const decodedJwt = jwtDecode(token);
    const r = decodedJwt.role;
    const response = await loadCurrentUser(token,r)
    return {data:response,role:r};
  };

  const value = {
    activeProfile,
    setActiveProfile,
    loadMe,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
