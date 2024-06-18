import { API_BASE } from "../../../env";
import { Delete, Get, Patch, Post } from "../requests";

export async function login(data)
{
    const response=await Post(API_BASE+'/auth/adminLogin',data)
    if (response.status===201)
        {
            return response.data
        }
    else if (response.status===404)
        {
            return {email:"Account Not Found"}
        }
    else if (response.status===401)
        {
            return {password:"Invalid Password"}
        }
    else
    {
        console.log(response)
        return false
    }
}



export async function getAssurancesCount(token)
{
    const response=await Get(API_BASE+'/admin/getAssurancesCount',token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}


export async function getAssurances(token,page,search)
{
    const response=await Get(API_BASE+'/admin/getAssurances/'+page+"?search="+search,token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}

export async function getAssurancesSearchCount(token,page,search)
{
    const response=await Get(API_BASE+'/admin/getAssurancesSearchCount/'+page+"?search="+search,token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}

export async function addAssuranceAdmin(token,data)
{   const errors={}
    delete data.confirmPassword
    const response=await Post(API_BASE+'/admin/addAssurance',data,token);
    
    if (response.status===201)
        return response.data
    else if(response.status===409)
         errors.name="An assurance with same name already exist"
    else if (response.status===400)
        errors.email="Email Already Used"
    {
      
        return false;
    }
}


export async function deleteAssuranceAdmin(token,assuranceID)
{
    const response=await Delete(API_BASE+"/admin/deleteAssurance/"+assuranceID,token)
   
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}

export async function getAssuranceAdmin(token,assuranceID)
{
    const response=await Get(API_BASE+"/admin/getAssurance?assuranceID="+assuranceID,token)
    if (response.status===200)
        return response.data;
    else
    {
        console.log(response);
        return false;
    }
}

export async function updateAssuranceAdmin(token,assuranceID,data)
{
    if (data.confirmPassword) delete data.confirmPassword
    const response=await Patch(API_BASE+"/admin/updateAssurance?assuranceID="+assuranceID,data,token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response);
        return false;
    }
}


export async function getCompaniesCount(token)
{
    const response=await Get(API_BASE+'/admin/getCompaniesCount',token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}


export async function getCompanyAdmin(token,companyID)
{
    const response=await Get(API_BASE+'/admin/getCompany?companyID='+companyID,token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}


export async function getCompaniesSearchCount(token,page,search)
{
    const response=await Get(API_BASE+'/admin/getCompaniesSearchCount/'+page+"?search="+search,token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}

export async function deleteCompanyAdmin(token,companyID)
{
    const response=await Delete(API_BASE+"/admin/deleteCompany/"+companyID,token)
   
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}

export async function getCompanies(token,page,search)
{
    const response=await Get(API_BASE+'/admin/getCompanies/'+page+"?search="+search,token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}

export async function addCompanyAdmin(token,data)
{   const errors={}
    delete data.confirmPassword
    const response=await Post(API_BASE+'/admin/addCompany',data,token);
    if (response.status===201)
        return response.data
    else if(response.status===409)
         errors.name="A company with same name already exist"
    else if (response.status===400)
        errors.email="Email Already Used"
    {
        return false;
    }
}

export async function updateCompanyAdmin(token,companyID,data)
{   console.log(data)
    if (data.confirmPassword) delete data.confirmPassword
    const response=await Patch(API_BASE+"/admin/updateCompany?companyID="+companyID,data,token)
    console.log(response)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response);
        return false;
    }
}



























export async function getDoctorsCount(token)
{
    const response=await Get(API_BASE+'/admin/getDoctorsCount',token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}


export async function getDoctorAdmin(token,doctorID)
{
    const response=await Get(API_BASE+'/admin/getDoctor?doctorID='+doctorID,token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}


export async function getDoctorssSearchCount(token,page,search)
{
    const response=await Get(API_BASE+'/admin/getDoctorsSearchCount/'+page+"?search="+search,token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}

export async function deleteDoctorAdmin(token,doctorID)
{
    const response=await Delete(API_BASE+"/admin/deleteDoctor/"+doctorID,token)
   
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}

export async function getDoctors(token,page,search)
{
    const response=await Get(API_BASE+'/admin/getDoctors/'+page+"?search="+search,token);
    if (response.status===200)
    {
        return response.data
    }
    else
    {
        console.log(response);
        return false;
    }
}

export async function addDoctorAdmin(token,data)
{   const errors={}
    delete data.confirmPassword
    const response=await Post(API_BASE+'/admin/addDoctor',data,token);
    if (response.status===201)
        return response.data
    else if(response.status===400)
         errors.cin="CIN already exist"
    else if (response.status===409)
        errors.email="Email Already Used"
    return errors;
}

export async function updateDoctorAdmin(token,doctorID,data)
{    console.log(data)
    if (data.confirmPassword) delete data.confirmPassword
    const response=await Patch(API_BASE+"/admin/updateDoctor?doctorID="+doctorID,data,token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response);
        return false;
    }
}
















export async function getPharmaciesCount(token) {
    const response = await Get(API_BASE + '/admin/getPharmaciesCount', token);
    if (response.status === 200)
        return response.data;
    else {
        console.log(response);
        return false;
    }
}

export async function getPharmacyAdmin(token, pharmacyID) {
    const response = await Get(API_BASE + '/admin/getPharmacy?pharmacyID=' + pharmacyID, token);
    if (response.status === 200)
        return response.data;
    else {
        console.log(response);
        return false;
    }
}

export async function getPharmaciesSearchCount(token, page, search) {
    const response = await Get(API_BASE + '/admin/getPharmaciesSearchCount/' + page + "?search=" + search, token);
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response);
        return false;
    }
}

export async function deletePharmacyAdmin(token, pharmacyID) {
    const response = await Delete(API_BASE + "/admin/deletePharmacy/" + pharmacyID, token);
    if (response.status === 200)
        return response.data;
    else {
        console.log(response);
        return false;
    }
}

export async function getPharmacies(token, page, search) {
    const response = await Get(API_BASE + '/admin/getPharmacies/' + page + "?search=" + search, token);
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response);
        return false;
    }
}

export async function addPharmacyAdmin(token, data) {
    const errors = {};
    delete data.confirmPassword;
    const response = await Post(API_BASE + '/admin/addPharmacy', data, token);
    
    if (response.status === 201)
        return response.data;
    else if (response.status === 409)   
        errors.name = "A pharmacy with the same name already exists";
    else if (response.status === 400)
        errors.email = "Email already used";
    else {
        return false;
    }
    return errors
}

export async function updatePharmacyAdmin(token, pharmacyID, data) {
    console.log(data);
    if (data.confirmPassword) delete data.confirmPassword;
    const response = await Patch(API_BASE + "/admin/updatePharmacy?pharmacyID=" + pharmacyID, data, token);
    console.log(response);
    if (response.status === 200)
        return response.data;
    else {
        console.log(response);
        return false;
    }
}























export async function getPlansCount(token) {
    const response = await Get(API_BASE + '/admin/getPlansCount', token);
    if (response.status === 200)
        return response.data;
    else {
        console.log(response);
        return false;
    }
}

export async function getPlanAdmin(token, planID) {
    const response = await Get(API_BASE + '/admin/getPlan?planID=' + planID, token);
    if (response.status === 200)
        return response.data;
    else {
        console.log(response);
        return false;
    }
}



// export async function deletePlanAdmin(token, planID) {
//     const response = await Delete(API_BASE + "/admin/deletePlan/" + planID, token);
//     if (response.status === 200)
//         return response.data;
//     else {
//         console.log(response);
//         return false;
//     }
// }

export async function getPlans(token, page, search) {
    const response = await Get(API_BASE + '/admin/getPlans/' + page + "?search=" + search, token);
    if (response.status === 200) {
        return response.data;
    } else {
        console.log(response);
        return false;
    }
}

export async function addPlanAdmin(token, data,assuranceID) {
    const errors = {};
    data.price=parseFloat(data.price);
    data.numberOfUsers=parseInt(data.numberOfUsers)
    data.duration=parseInt(data.duration)
    data.cover=parseInt(data.cover)
    const response = await Post(API_BASE + '/admin/addPlan?assuranceID='+assuranceID, data, token);
    if (response.status === 201)
        return response.data;
    else if (response.status === 409)
        errors.name = "A plan with the same name already exists";
    else {
        return false;
    }
    return errors;
}

// export async function updatePlanAdmin(token, planID, data) {
//     console.log(data);
//     if (data.confirmPassword) delete data.confirmPassword;
//     const response = await Patch(API_BASE + "/admin/updatePlan?planID=" + planID, data, token);
//     console.log(response);
//     if (response.status === 200)
//         return response.data;
//     else {
//         console.log(response);
//         return false;
//     }
// }

export async function getAllAssurances(token)
{
    const response=await Get(API_BASE+"/admin/getAll",token)
    if (response.status===200)
        return response.data
    else
    {
        console.log(response)
        return false;
    }
}