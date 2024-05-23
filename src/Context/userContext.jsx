import { createContext, useContext, useEffect, useState } from "react";
import { Get } from "../assets/requests";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../../env";
import { loadCurrentUser } from "../assets/Apis/assets";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(null);
  // const navigate = useNavigate();
  const loadMe = async (token) => {
    const decodedJwt = jwtDecode(token);
    const r = decodedJwt.role;
    const response = await loadCurrentUser(token, r);
    return { data: response, role: r };
  };
  const logOut = () => {
    setActiveProfile({ data: false });
    window.location="/";
    localStorage.clear();
  };
  const value = {
    activeProfile,
    setActiveProfile,
    loadMe,
    logOut
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
