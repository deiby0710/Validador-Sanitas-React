export const safeValue = (val, fallback = 'N/A') => {
    return val || fallback;
}

export const formateDate = (dateString) => {
    if(!dateString) return; 
    return dateString.split("T")[0];
}