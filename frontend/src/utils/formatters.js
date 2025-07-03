export const safeValue = (val, fallback = 'N/A') => {
    return val || fallback;
}