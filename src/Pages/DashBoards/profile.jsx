import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/userContext'
import Loading from './../../components/loading';
import DoctorProfile from './Doctor/doctorProfile';
import CompanyProfile from './Company/companyProfile';
///here to chose depending on role
function Profile() {
  const {activeProfile}=useContext(userContext);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if (activeProfile != null) {
      //if active profile!=null then i've got a response from loadMe whether data=user or data=false
      if (activeProfile.data) {
        setLoading(false);
        console.log(activeProfile)
      }
    }
  },[activeProfile])

 

  return (
    !loading?
    <>
      {activeProfile.role === "Doctor" && <DoctorProfile profile={activeProfile.data}/>}
      {(activeProfile.role==="Company"||activeProfile.role==="Pharmacy"||activeProfile.role==="Assurance")&&<CompanyProfile profile={activeProfile}/>}
    </>:
    <Loading/>
  );
}

export default Profile