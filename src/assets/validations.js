
function isValidCin(cin)
  {
    const cinRegex=/^\d{8}$/
    return cinRegex.test(cin);
  }


export function validateForm1(data,type) {
  
  
    const errors = {};
    const messages = {
        name: "Please provide a valid "+type+" name",
        email: "Please provide a valid email address",
        confirmPassword: "Passwords do not match",
        cin:"Please provide a valid CIN"
      };
    if (type!="Doctor")
   {
    if (!data.name || data.name.length < 5) {
      console.log(data.name)
      errors.name =messages.name;
    }
   }
   else
   {
    if (!data.cin || !isValidCin(data.cin))
      {
        errors.cin=messages.cin;
      }
   }
    if (!data.email || !isValidEmail(data.email)) {
      errors.email = messages.email;
    }
    const passwordMessages=isStrongPassword(data.password)
    if (passwordMessages!="") {
      errors.password = passwordMessages;
    }
  
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = messages.confirmPassword;
    }
    return errors;
  }
  
  
  export function isValidEmail(email) {
    const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }


  function isStrongPassword(password) {
      const messages={
        lowerCase:"Password must contain at least one lowercase letter",
        upperCase:"Password must contain at least one uppercase letter",
        digit:"Password must contain at least one digit",
        special:"Password must contain at least one special character",
        length:"Password must be at least 8 characters long"
      }
      if (!/.{8,}/.test(password)) {
        return messages.length
    }
      if (!/(?=.*[a-z])/.test(password)) {
          return messages.lowerCase;
      }
      if (!/(?=.*[A-Z])/.test(password)) {
          return messages.upperCase
      }
      if (!/(?=.*\d)/.test(password)) {
          return messages.digit
      }
      if (!/(?=.*[!@#$%?^&*])/.test(password)) {
          return messages.special
      }
      
  
      return "";
  }



  function isValid(value,length)
  { if (!value)
    {
      return false;
    }
    else{
    value=value.trim();
    if (value.length>length)
      {
        return true
      }
    else
    {
      return false
    }
    }
  }

  export function validateFormDoctor(data)
  {
    
    const errors={}
    const messages=
    {
      address: "Please provide a valid Address",
      bio: "Please provide a bio with at least 20 characters",
      firstName:"Please provide a valid FirstName",
      lastName:"Please provide a valid LastName",
      gender:"Gender is required",
      experience:"Please provide a valid Experience",
      speciality:"Please provide a valid Speciality",
      price:"Please provide a valid Price"
    }
    if (!isValid(data.firstName,2))
      {
        errors.firstName=messages.firstName
      }
     if (!isValid(data.lastName,2))
      {
        errors.lastName=messages.lastName
      }
     if (!isValid(data.address,6))
      {
        errors.address=messages.address
      }
     if (!data.gender)
      {
        errors.gender=messages.gender;
      }
     if (!isValid(data.speciality,4))
      {
        errors.speciality=messages.speciality
      }
     if (!data.experience || isNaN(data.experience) || parseInt(data.experience) < 0)
      {
        errors.experience=messages.experience
      }
     if (!data.price || isNaN(data.price) || parseFloat(data.price) < 0)
      {
        errors.price=messages.price;
      }
      return errors;
  }

  export function validateFormCompany(data)
  {
    const errors={}
    const messages=
    {
      description: "Please provide a Description with at least 20 characters",
      address: "Please provide a valid Address",
    }
    if (!isValid(data.address,6))
      {
        errors.address=messages.address
      }
     if (!isValid(data.description,20))
    {
      errors.description=messages.description
    }
    return errors;

  }


  export function validateLogin(email,password)
{   const errors={}
    const messages=
    {
        email: "Please provide a Valid Email Address",
        password:"Please provide a Valid Password"
    }
    if (!email || !isValidEmail(email))
    {
        errors.email=messages.email;
    }
    if (!password || password.length<3)
    {
        errors.password=messages.password;
    }

    return errors;
}

export function validateChangePassword(oldPassword,newPassword,confirmNewPassword)
{ const errors={}
  const messages={
    passwordsMatch:"New Password must be different from Old Password",
    confirmation:"Passwords do not match",
    required:"Required"
  }

  let passwordMessages;

  if (!oldPassword)
    {
      errors.oldPassword=messages.required;
    }
   if (!newPassword)
    {
      errors.newPassword=messages.required;
    }
   if (!confirmNewPassword)
    {
      errors.confirmNewPassword=messages.required;
    }
   if (oldPassword===newPassword&&oldPassword&&newPassword)
    {
       errors.newPassword=messages.passwordsMatch;
    }
     
    else if (newPassword&&(passwordMessages=isStrongPassword(newPassword))!=="")
    {
      errors.newPassword=passwordMessages;
    }
    else if (newPassword&&confirmNewPassword&&newPassword!==confirmNewPassword)
    {
      errors.confirmNewPassword=messages.confirmation;
    }

    return errors;
}


export function validateMail(email)
{ 
  if (!email)
    {
      return {email:"Required"}
    }
  else if (!isValidEmail(email))
    {
      return { email: "Please provide a valid email address"};
    }
  else
  {
    return {};
  }
}


export function validationResetPassword(newPassword,confirmNewPassword)
{
  const errors={}
  if (!newPassword)
    {
      errors.newPassword="Required";
    }
  if (!confirmNewPassword)
    {
      errors.confirmNewPassword="Required";
    }
  if (newPassword&&confirmNewPassword)
    {
      const errorMessages=isStrongPassword(newPassword);
      if (errorMessages!="")
        {
          errors.newPassword=errorMessages;
        }
      else if (newPassword!=confirmNewPassword)
        {
          errors.confirmNewPassword="Passwords should match";
        }
      
    }
    return errors;
}


export function validateEditProfileDoctor(data)
{
  const errors={}
  const messages=
  {
    address: "Please provide a valid Address",
    bio: "Please provide a bio with at least 20 characters",
    firstName:"Please provide a valid FirstName",
    lastName:"Please provide a valid LastName",
    gender:"Gender is required",
    experience:"Please provide a valid Experience",
    speciality:"Please provide a valid Speciality",
    price:"Please provide a valid Price"
  }
  console.log("data",data)
   if (data.hasOwnProperty("firstName")&& !isValid(data.firstName,2))
    {
      errors.firstName=messages.firstName
    }
   if (data.hasOwnProperty("lastName")&&!isValid(data.lastName,2))
    {
      errors.lastName=messages.lastName
    }
   if (data.hasOwnProperty("address")&&!isValid(data.address,6))
    {
      errors.address=messages.address
    }
   if (!data.hasOwnProperty("gender"))
    {
      errors.gender=messages.gender;
    }
   if (data.hasOwnProperty("speciality")&&!isValid(data.speciality,4))
    {
      errors.speciality=messages.speciality
    }
   if (data.hasOwnProperty("experience")&&(!data.experience || isNaN(data.experience) || parseInt(data.experience) < 0))
    {
      errors.experience=messages.experience
    }
   if (data.hasOwnProperty("price")&&(!data.price || isNaN(data.price) || parseFloat(data.price) < 0))
    {
      errors.price=messages.price;
    }
    return errors;
}


export function validateEditProfileCompany(data)
{
  const errors={};
  const messages={
    name: "Please provide a valid  name",
    address: "Please provide a valid Address",
    description: "Please provide a bio with at least 20 characters",
  }
  if (data.name && data.name.length < 5) 
    {
      errors.name=messages.name
    }
    if (data.hasOwnProperty("address")&&!isValid(data.address,6))
    {
        errors.address=messages.address
    }
    if (data.description && data.description.length<20)
    {
      errors.description=messages.description;
    }
    return errors;
} 

export function validateAddEmp(data)
{
  const errors={};
  const messages={
    firstName:"Please provide a valid FirstName",
    lastName:"Please provide a valid LastName",
    gender:"Gender is required",
    cin:"Please provide a valid CIN",
    birthDate:"Required",
    jobTitle:"Please provide a valid Job Title",
    req:"Required"
  }

  if (data.hasOwnProperty("firstName")&& !isValid(data.firstName,2))
    {
      errors.firstName=messages.firstName
    }
  else if (!data.hasOwnProperty("firstName"))
    {
      errors.firstName=messages.req
    }

   if (data.hasOwnProperty("lastName")&&!isValid(data.lastName,2))
    {
      errors.lastName=messages.lastName
    }
    else if (!data.lastName)
      {
        errors.lastName=messages.req
      }

  if (data.cin&&!isValidCin(data.cin))
    {
      errors.cin=messages.cin;
    }
  else if (!data.cin)
    {
      errors.cin=messages.req;
    }

    if (!data.birthDate)
      {
        errors.birthDate=messages.req;
      }

    if (!data.gender)
      {
        errors.gender=messages.req
      }
    
    if (data.jobTitle&&!isValid(data.jobTitle,5))
      {
        errors.jobTitle=messages.jobTitle;
      }
    else if (!data.jobTitle)
      {
        errors.jobTitle=messages.req;
      }

    return errors;
}


export function validateUpdateEmp(data)
{
  const errors={}
  const messages={
    
      firstName:"Please provide a valid FirstName",
      lastName:"Please provide a valid LastName",
      birthDate:"Required",
      jobTitle:"Please provide a valid Job Title",
    
  } 
  if (data.hasOwnProperty("firstName")&& !isValid(data.firstName,2))
    {
      errors.firstName=messages.firstName
    }
 

   if (data.hasOwnProperty("lastName")&&!isValid(data.lastName,2))
    {
      errors.lastName=messages.lastName
    }
   

   if (data.jobTitle&&!isValid(data.jobTitle,5))
        {
          errors.jobTitle=messages.jobTitle;
        }


    return errors;
}


export function validateSearch(search)
{ console.log(search)
  if (search.trim().length === 0) {
    return false;
}
if (search.length > 100) {
    return false;
}
const regex = /^[a-zA-Z\s]+$/;
if (!regex.test(search)) {
    return false;
}

return true;
}