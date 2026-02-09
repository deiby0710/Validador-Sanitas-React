import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    try {
        const { exp } = jwtDecode(token);
        if(!exp) return false;
        // exp = expiration time
        const now = Date.now() / 1000;
        return exp > now
    } catch {
        return false
    }
}