export function validateDataCompany(data,type) {
    const errors = {};
    const messages = {
        companyName: "Please provide a valid "+type+" name",
        address: "Please provide a valid address",
        email: "Please provide a valid email address",
        confirmPassword: "Passwords do not match",
        bio: "Please provide a bio with at least 20 characters",
        cin:"Please provide a valid CIN"
      };
    if (type!="Doctor")
   {
    if (!data.companyName || data.companyName.length < 5) {
      errors.companyName =messages.companyName;
    }
   }
   else
   {
    if (!data.cin || !isValidCin(cin))
      {
        errors.cin=messages.cin;
      }
   }
   
  
    if (!data.address || data.address.length < 5) {
      errors.address = messages.address;
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
  
    if (!data.bio || data.bio.length < 20) {
      errors.bio = messages.bio;
    }
  
    return Object.keys(errors).length === 0 ? null : errors;
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

  function isValidCin(cin)
  {
    const cinRegex=/^\d{8}$/
    return cinRegex.test(cin);
  }