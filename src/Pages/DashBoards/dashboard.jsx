import React, { useContext } from "react";
import { userContext } from "../../Context/userContext";
import DoctorDashboard from "./Doctor/doctorDashboard";
import PharmacyDashboard from "./Company/Pharmacy/pharmacyDashboard";
import CompanyDashboard from "./Company/Regular Company/companyDashboard";
import AssuranceDashboard from "./Company/Assurance/dashboardAssurance";
import AdminDashboard from "../Admin/adminDashboard";
////main dashboard same route for every user ,this contains dashboards with switch will be selection of component not of an other route

export default function Dashboard() {
  const { activeProfile } = useContext(userContext);
  return (
    <>
      {activeProfile.role === "Doctor" && <DoctorDashboard />}
      {activeProfile.role === "Assurance" && <AssuranceDashboard />}
      {activeProfile.role === "Pharmacy" && <PharmacyDashboard />}
      {activeProfile.role==="Company"&&<CompanyDashboard/>}
      {activeProfile.role === "Admin" && <AdminDashboard />}
    </>
  );
}
