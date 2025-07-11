export const safeValue = (val, fallback = 'N/A') => {
    return val !== undefined && val !== null ? val : fallback;
}

export const formateDate = (dateString) => {
    if(!dateString) return; 
    return dateString.split("T")[0];
}