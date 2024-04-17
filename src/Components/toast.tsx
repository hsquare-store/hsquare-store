import React from 'react'


export const showError = (error: string) => {
    console.error(error);
    alert(error);
}

export const showSuccess = (success: string) => {
    console.log(success);
    alert(success)
}