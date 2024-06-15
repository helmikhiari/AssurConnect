import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Loading from "./loading";

export default function ProtectedRoute({ role, allowedRole, children }) {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    console.log("role: " + role);

    if (role && allowedRole) {
      if (!allowedRole.includes(role)) {
        navigate("/dashboard/unauthorized");
      } else {
        setLoading(false);
      }
    } else if (role) {
      setLoading(false);
    }
  }, [role, allowedRole, navigate]);
  
  
return(
  loading?<Loading/>:<>{children}</>
)}
