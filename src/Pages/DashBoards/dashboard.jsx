import React, { useContext } from 'react'
import { userContext } from '../../Context/userContext';
import DoctorDashboard from './Doctor/doctorDashboard';
import CompanyProfile from './Company/companyProfile';
import PharmacyDashboard from './Company/Pharmacy/pharmacyDashboard';
import RegularCompanyDashboard from './Company/Regular Company/employees';
////main dashboard same route for every user ,this contains dashboards with switch will be selection of component not of an other route

export default function Dashboard() {
  const {activeProfile}=useContext(userContext);
  return (
   
    <>
      {activeProfile.role === "Doctor" && <DoctorDashboard />}
      {/* {(activeProfile.role==="Company"||activeProfile.role==="Assurance") */}
      {activeProfile.role==="Pharmacy"&&<PharmacyDashboard/>}
      {activeProfile.role==="Company"&&<RegularCompanyDashboard/>}
    </>
  );
}