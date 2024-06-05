
import {API_BASE} from '../../../env.js'
import { Delete, Get, Patch, Post } from '../requests';
import { correctDate, stringToDateBar } from '../functions.js';


export async function health()
{
    const response=await Get(API_BASE+'/health');
    if (response?.status===200)
        {
            return response.data;
        }
    else
    {
        return {status:"DOWN"};
    }
}

export async function signUp(data,accountType)
{
    let path=API_BASE;
    switch (accountType){
        case "Doctor": path+="/doctor/signup";break;
        case "Pharmacy": path+="/pharmacy/signup";break;
        case "Assurance": path+="/assurance/signup";break;
        case "Company": path+="/company/signup";break;
    }
    let dataToSend;
    switch(accountType)
    {
        case "Doctor":
            dataToSend=
            {
                "cin":data.cin,
                "firstName":data.firstName,
                "lastName":data.lastName,
                "email":data.email,
                "password":data.password,
                "gender":data.gender,
                "address":data.address
            }
            break;
        case "Company":
        case "Assurance":
        case "Pharmacy":
            dataToSend={
                "name":data.name,
                "address":data.address,
                "email":data.email,
                "password":data.password,
                "description":data.description
            }
            break;
    }
    
    const response=await Post(path,dataToSend);
    if (response.status===201)
    return response.data
else
{
    console.log(response.error);
}
}


export async function checkMail(email)
{
    const path=API_BASE+"/auth/checkMail";
    const response=await Post(path,{"email":email})
    console.log(response)
    return response.data;
    
}

export async function verifyOtp(email,code)
{
    const path=API_BASE+"/auth/verifyCodeSignUp";
    const data={email,"code":parseInt(code)}
    const response=await Post(path,data); 
    return response;
}

export async function sendOtp(email)
{
    const path=API_BASE+"/auth/sendOtp";    
    const response=await Post(path,{"email":email})
    return response;
}

export async function verifyCIN(cin)
{
    const path=API_BASE+"/doctor/verifyCin/"+cin;
    const response=await Get(path)
    return response.data; 
}

export async function login(email,password)

{   
    const path=API_BASE+"/auth/login";
    const response=await Post(path,{email,password});
    if (response.status===201)
    {   
        
        return {"access":response.data}
    }
    else if(response.status===404)
    {
            return {"email":"Account with that email doesn't exist. Try again"}
    }
    else if (response.status===401)
     {
        return {"password":"Invalid Password"}
    }
    

}

export async function loadCurrentUser(token,role) {
    const response = await Get(API_BASE + "/" + role + "/loadme", token);
    if (response.status===200)
        {   
            return response.data
        }
    else
    {
        return false
    }

}

export async function changePassword(oldPassword,newPassword)
{   const token=localStorage.getItem('token')
    if (!token)
    {
        return null;
    }
    else{
    const response=await Patch(API_BASE+"/auth/changePassword",{oldPassword,newPassword},token);
    if (response.status===200)
        return response.data
    else if (response.status===403)
        return {"oldPassword":"Invalid Current Password"};
    else if (response.status===400)
        return {"newPassword":"New Password must be different from Current Password"};
    else
        return {"error":"Error occured,Try refreshing the page"};
    }
}

export async function sendOtpForgetPassword(email)
{
    const response=await Post(API_BASE+"/auth/forgetPasswordotp",{email});
    if (response.status===201)
        return response.data
    else if (response.status===404)
        return {"email":"User not found"};
    else 
    return null;
}


export async function verifyOtpResetPassword(otp,token)
{
    const response=await Post(API_BASE+"/auth/verifyCode",{code:otp},token);
    if (response.status===201)
        {
            return response.data;
        }
    else
    {
        return {error:"Error Occured"};
    }
}

export async function resetPassword(newPassword,token)
{
    const response=await Patch(API_BASE+'/auth/resetPasswordOtp',{newPassword},token);
    if (response.status===200 && response.data===true)
        {
            return true;
        }
    else if (response.status===409)
        {
            return {newPassword:"Your new password cannot be the same as your old password. Please choose a different password."};
        }
    else
        {
            return {confirmNewPassword:"Error Occured"};
        }
}

export async function updateDoctor(data,token)
{
    const response=await Patch(API_BASE+'/doctor/edit',data,token)
    if (response.status===200 && response.data===true)
        return true;
    else
    return response;
}

export async function updateCompany(data,token,role)
{
    const response=await Patch(API_BASE+'/'+role+'/edit',data,token)
    if (response.status===200 && response.data===true)
        return true;
    else
    return response;
}


export async function getNextApppointment(token)
{
    const response=await Get(API_BASE+'/doctor/getNextApp',token)
    if (response.status===200)
    {   
        if (response.data!=false)
        {
        response.data.nextApp.date=correctDate(response.data.nextApp.date);
        response.data.prevApp.date=stringToDateBar(response.data.prevApp.date);
        }
        return response.data;
    }
    else
    {
        return null;
    }

}


export async function getTodayAppointments(token)
{
    const response=await Get(API_BASE+"/doctor/todayAppointment",token);
    if (response.status===200)
    {
        return response.data;
    }
    else
    {
        return null
    }

}

export async function getNumberOfAppsNextWeek(token)
{
    const response=await Get(API_BASE+'/doctor/getStatsApps',token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response.error);
    }
}


export async function getCountAppsByStatus(token,status)
{
    if (status==="All")
    {
        const response=await Get(API_BASE+'/doctor/allAppointmentsCount',token)
        if (response.status===200)
            {
                return response.data
            }
        else
        {
            console.log(response.error);
        }
    }
    else
    {
        const response=await Get(API_BASE+'/doctor/allAppointmentsCount/'+status,token)
       
        if (response.status===200)
            {
                return response.data
            }
        else
        {
            console.log(response.error);
        }
    }
    
}

export async function getAppsByStatus_Page(token,page,status)
{
    const response=await Get(API_BASE+'/doctor/appsbystatus_page?page='+page+'&status='+status,token);
    if (response.status===200)
        {
            return response.data
        }
    else
    {
        console.log(response.error);
    }

}


export async function changeAppointmentStatus(token,appId,status)

 {   
    status=status.toLowerCase()
    
    const response =await Patch(API_BASE+"/doctor/"+status+"App?appId="+appId,null,token);
    if (response.status===200)
    {
        return true
    }
    else
    {
        console.log(response.error);
    }
}

export async function sendPatientOtp(token,appId)
{
    const response=await Post(API_BASE+'/doctor/sendPatientOtp',{appId:appId},token)
}

export async function makeApp(token,appId,otp,notes,medicines)
{
    const dataToSend={
        appId:appId,
        otp:otp,
        details:notes,
        medicines:medicines
    }
    const response=await Post(API_BASE+'/doctor/makeApp',dataToSend,token);
    if (response.status===201)
        {
            return true;
        }
    else if (response.status===400)
        {
            return false;
        }
    else
    {
        console.log(response.error);
    }
}


export async function getPrescription(presID,token)
{   presID=presID.slice(1);
    
    const response=await Get(API_BASE+"/pharmacy/getPrescription/"+presID,token);
    
    if (response.status===200)
    {   if (response.data.prescription.status==="Not Served")

       return {data:response.data};
        else
        {
            return {error:"Prescription is Fully Served"};
        }
    }
    else if (response.status===404)
        return {error:"Please provide a valid prescription Identifier"};
    else if (response.status===400)
        return {error:"Prescription Has Been Served Already"};
    else 
    {
        return {error:"Error Occured"};
    }
}

export async function serve(token,presID,price,medicinesServed)
{
    const dataToSend=
    {
        presID,
        price,
        medicinesServed
    }
    
  
    const response=await Post(API_BASE+'/pharmacy/serve',dataToSend,token)
    if (response.status===201)
        {
            return response.data
        }
    else if (response.status===400)
        {
            return {error:"Prescription is Fully Served"}
        }
    else
    {
        console.log(response.error);
        return false;
    }
}

export async function confimServe(sessionToken,code)
{
    const response=await Patch(API_BASE+'/pharmacy/confirmServe',{code},sessionToken);
    console.log(response)
    if (response.status===200)
    {
        return true;
    }
    else if (response.status===401)
    {
        return {error:"Please Check the verification code"};
    }
    else
    {
        console.log(response.error);
    }
}


export async function countEmployees(token)
{
    const response=await Get(API_BASE+'/company/countAllEmployees',token);
    if (response.status===200)
        return response.data;
    else
        console.log(response.error);
}


export async function getEmployeesByPage(token,page)
{
    const response=await Get(API_BASE+"/company/allEmployees/"+page,token)
    if (response.status===200)
    {console.log(response)
        if (response.data.length>0)
            {   
                return response.data}
        else return false;
    }
    else
        console.log(response.error);
}


export async function addEmployee(token,data)
{
    const response=await Post(API_BASE+'/company/addEmploye',data,token);
    if (response.status===201)
        {
            return response.data
        }
    else if (response.status===409)
        {
            return {cin:"Employe already exist with that CIN"};
        }
    else
        {
            console.log(response.error);
        }
}


export async function deleteEmployee(token,empID)
{
    const response=await Delete(API_BASE+'/company/deleteEmp?empId='+empID,token)
    if (response.status===200)
        {
            return true;
        }
    else
    {
        console.log(response.error);
        return false;
    }
}

export async function updateEmployee(token,data,empID)
{
    const response=await Patch(API_BASE+'/company/updateEmp?empID='+empID,data,token);
    if (response.status===200)
        {
            return true
        }
    else
    {
        console.log(response);
        return false;
    }
}


export async function searchEmp(token,search,page)
{
    const response=await Get(API_BASE+'/company/searchEmployees/'+page+"/"+search,token)
    console.log(response)
    if (response.status===200)
        {
            return response.data;
        }
    else
    {
        console.log(response);
        return false;
    }
}


export async function CountEmpBySearch(token,search)
{
    const response=await Get(API_BASE+"/company/countSearchEmployees/"+search,token);
    if (response.status===200)
        {
            return response.data;
        }
    else
    {   
        console.log(response);
        return false;
    }
}


export async function getPlansByPageandSearch(page,search)
{  
    const response=await Get(API_BASE+'/company/plans/'+page+"?search="+search);
    if (response.status===200)
        {
            return response.data
        }
    else
    {
        console.error(response)
        
    }
}

export async function getAssuranceDetails(token,planID,assuranceID)
{   
    const response=await Get(API_BASE+"/company/assuranceDetails/"+planID+"?assuranceID="+assuranceID,token)
    if (response.status===200)
        {
            return response.data
        }
    else
    {
        console.error(response);
        return false;
    }
}


export async function buyPlanCompany(token,planID)
{   
    const response=await Post(API_BASE+"/company/buyPlan?planId="+planID,null,token);
    if (response.status===201)
        {
            return response.data
        }
    else
    {
        console.error(response);
        return false;
    }
}

export async function getOwnedPlansCompany(token)
{
    const response=await Get(API_BASE+'/company/myPlans',token)
    if (response.status===200)
        {
            return response.data
        }
    else
    {
        console.error(response)
        return false;
    }
}


export async function getOwnedPlanDetails(token,planID,assuranceID)
{
    const response=await Get(API_BASE+'/company/employeesPlan/'+planID,token);
    if (response.status===200)
        {
            return response.data
        }
    else
    {
        console.error(response);
        return false;
    }
}


export async function addEmpPlan(token,empId,planUsersId)
{   const dataToSend={empId,planUsersId}
    console.log(dataToSend)
    const response=await Post(API_BASE+'/company/addEmpToPlan',dataToSend,token)
    if (response.status===201)
        {
            return true
        }
    else
    {
        console.error(response);
        return false;
    }
}