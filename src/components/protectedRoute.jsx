import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./loading";

export default function ProtectedRoute({ role, allowedRole, children }) {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    console.log("role"+role)
    
      if (role !== allowedRole&&role&&allowedRole) {
        navigate("dashboard/unauthorized");
        // window.location.reload()
      } 
      else if (role)
      setLoading(false);
    
  }, [role]);
  
  
return(
  loading?<Loading/>:<>{children}</>
)}
