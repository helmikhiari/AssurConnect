import { useContext } from 'react';
import {API_BASE} from '../../../env.js'
import { Get, Patch, Post } from '../requests';
import { correctDate, formatDateTime, stringToDateBar } from '../functions.js';
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
    return response
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
    {   console.log(response)
        response.data.nextApp.date=correctDate(response.data.nextApp.date);
        response.data.prevApp.date=stringToDateBar(response.data.prevApp.date);
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