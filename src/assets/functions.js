

export function stringToDate(date) {///used in editProfile doctor
    const birthDate=new Date(date);
    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(birthDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
    
export function formatDateTime(input,type) {
    const date = new Date(input);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
   
    if (type===0)
        return `${month} ${day}, ${year} at ${hours}:${minutes}`;
    if (type===1)
        return `${month} ${day}, ${year}`
    if (type=2)
        return `${hours}:${minutes}`
}



export function stringToDateBar(date) {
    const birthDate=new Date(date);
    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(birthDate.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}



export function correctDate(date) {
   
    const appDate = new Date(date);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);  

    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);  

    
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    dayAfterTomorrow.setHours(0, 0, 0, 0);  
    const hours = appDate.getHours().toString().padStart(2, '0');
    const minutes = appDate.getMinutes().toString().padStart(2, '0');
    if (appDate >= today && appDate < tomorrow) {
        return `Today at ${hours}:${minutes}`;
    } else if (appDate >= tomorrow && appDate < dayAfterTomorrow) {
        return `Tomorrow at ${hours}:${minutes}`;
    } else {
        return formatDateTime(date,0);
    }
}


export function areDatesWithinXMinutes(date1, date2,minutes) {
    const convertedMins = minutes * 60 * 1000; 
    const time1 = new Date(date1).getTime();
    const time2 = new Date(date2).getTime();
    const difference = Math.abs(time1 - time2);
    return difference <= convertedMins;
  }

  export function chooseColorForApp(status)
  {
    
    switch(status)
    {
        case "Approved":return "green";
        case "Waiting":return "yellow";
        case "Completed":return "teal";
        case "Reported":return "orange";
        case "Rejected":return "red";
        case "Cancelled":return "red";
    }
  }



 export  function isPositiveInteger(str) {
    return /^[1-9]\d*$/.test(str);
  }

  export const isValidPrice = (price) => {
    // Regular expression to match non-negative floats
    const regex = /^(?!0)\d+(\.\d*)?$/;
    return regex.test(price);
};  


export function formatDateToYYYYMMDD(isoDateString) {
    return isoDateString.split('T')[0];
}
