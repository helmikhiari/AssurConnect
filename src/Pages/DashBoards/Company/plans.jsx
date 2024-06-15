import React, { useContext } from 'react'
import { userContext } from '../../../Context/userContext';
import CompanyPlans from './Regular Company/plans';
import AssurancePlans from './Assurance/plans';
import AdminPlans from '../../Admin/plans';

function Plans() {
    const {activeProfile}=useContext(userContext);
    return (
     
      <>
        {activeProfile.role === "Assurance" && <AssurancePlans />}
        {activeProfile.role==="Company"&&<CompanyPlans/>}      
        {activeProfile.role==="Admin"&&<AdminPlans/>} 
      </>
    );
}

export default Plans
