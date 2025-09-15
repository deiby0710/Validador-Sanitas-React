import { api } from "../api/axiosConfig";

export const login = async({username, password}) => {
    try {
        const response = await api.post('api/login/auth', {username, password});
        // Guardamos el token en el local storage
        const { token, user } = response.data;
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user));

        return {
            ok: true,
            data: {token, user},
            error: null
        }
    } catch(error) {
        console.error("Error en el servicio de login: ", error)
        if (error.response) {
            return {
                ok: false,
                data: null,
                error: error.response.data.error || "Error en el servidor"
            };
        } else if (error.code === "ERR_NETWORK") {
            return {
                ok: false,
                data: null,
                error: "No hay conexión a internet. Intente más tarde."
            };
        } else {
            return {
                ok: false,
                data: null,
                error: "Error inesperado. Intente más tarde."
            };
        }}
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};