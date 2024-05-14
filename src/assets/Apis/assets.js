import {API_BASE} from '../../../env.js'
import { Get, Post } from '../requests';
export async function signUp(data,accountType)
{
    let api=API_BASE;
    switch (accountType){
        case "Doctor": api+="/doctor/signup";break;
        case "Pharmacy": api+="/pharmacy/signup";break;
        case "Assurance": api+="/assurance/signup";break;
        case "Company": api+="/company/signup";break;
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
                "name":data.companyName,
                "address":data.address,
                "email":data.email,
                "password":data.password,
                "description":data.description
            }
            break;
    }
    
    const response=await Post(api,dataToSend);
    return response
}


export async function checkMail(email)
{
    const api=API_BASE+"/auth/checkMail";
    const response=await Post(api,{"email":email})
    return response;
}

export async function verifyOtp(email,code)
{
    const api=API_BASE+"/auth/verifyCodeSignUp";
    const data={email,"code":parseInt(code)}
    const response=await Post(api,data); 
    return response;
}

export async function sendOtp(email)
{
    const api=API_BASE+"/auth/sendOtp";
    const response=await Post(api,{"email":email})
    return response;
}

export async function verifyCIN(cin)
{
    const api=API_BASE+"/doctor/"+cin;
    const response=await Get(api)
    return response; 
}