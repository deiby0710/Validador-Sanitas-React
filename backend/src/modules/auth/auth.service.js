const obtenerToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("username", process.env.USERNAME_API);
        params.append("password", process.env.PASSWORD_API);
        const response = await fetch(process.env.SANITAS_TOKEN_URL, {
            method: "POST",
            headers: {
                'Authorization': process.env.SANITAS_AUTH_BASIC,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params.toString()
        });

        if (!response.ok) {
            throw new Error(`Error obteniendo el token: ${response.status}`);
        }
        const data = await response.json(); // Extraer el JSON de la respuesta
        return { access_token: data.access_token, expires_in: data.expires_in }
    } catch (error) {
        console.error(" ❌ Error al obtener el token:", error);
        return null;
    }
};

export default obtenerToken;