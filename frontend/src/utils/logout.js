import { defaultAlert } from "../utils/alert";

let isLoggingOut = false;

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = '/login'
}

export const logoutWithReason = async(reason) => {
    if (isLoggingOut) return;
    isLoggingOut = true;
    
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    if (reason === "expired") {
        await defaultAlert(
            "warning",
            "Sesión expirada",
            "Tu sesión ha expirado. Por favor inicia sesión nuevamente."
        );
    }

    window.location.replace("/login");
}