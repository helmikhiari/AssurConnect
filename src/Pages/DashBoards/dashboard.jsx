import React, { useContext } from 'react'
import { userContext } from '../../Context/userContext';
import DoctorDashboard from './Doctor/doctorDashboard';
////main dashboard same route for every user ,this contains dashboards with switch will be selection of component not of an other route

export default function Dashboard() {
  const {activeProfile}=useContext(userContext);
  return (
   
    <>
      {activeProfile.role === "Doctor" && <DoctorDashboard />}
      {(activeProfile.role==="Company"||activeProfile.role==="Pharmacy"||activeProfile.role==="Assurance")&&<CompanyProfile profile={activeProfile}/>}
    </>
  );
}

