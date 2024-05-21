import React from 'react'

export function stringToDate(date) {
    const birthDate=new Date(date);
    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(birthDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
    