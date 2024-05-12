export function validateForm1(data,type) {
  
  function isValidCin(cin)
  {
    const cinRegex=/^\d{8}$/
    return cinRegex.test(cin);
  }

    const errors = {};
    const messages = {
        companyName: "Please provide a valid "+type+" name",
        email: "Please provide a valid email address",
        confirmPassword: "Passwords do not match",
        cin:"Please provide a valid CIN"
      };
    if (type!="Doctor")
   {
    if (!data.companyName || data.companyName.length < 5) {
      console.log(data.companyName)
      errors.companyName =messages.companyName;
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
    return Object.keys(errors).length === 0 ? {} : errors;
  }
  
  
  function isValidEmail(email) {
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
    else if (!isValid(data.lastName,2))
      {
        errors.lastName=messages.lastName
      }
    else if (!isValid(data.address,6))
      {
        errors.address=messages.address
      }
    else if (!data.gender)
      {
        errors.gender=messages.gender;
      }
    else if (!isValid(data.speciality,4))
      {
        errors.speciality=messages.speciality
      }
    else if (!data.experience || isNaN(data.experience) || parseInt(data.experience) < 0)
      {
        errors.experience=messages.experience
      }
    else if (!data.price || isNaN(data.price) || parseFloat(data.price) < 0)
      {
        errors.price=messages.price;
      }
      return Object.keys(errors).length === 0 ? {} : errors;
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
    else if (!isValid(data.description,20))
    {
      errors.description=messages.description
    }
    return Object.keys(errors).length === 0 ? {} : errors;

  }