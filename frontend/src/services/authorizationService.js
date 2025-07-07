import { api } from "../api/axiosConfig";

export const consultaAuthorization = async (numAutorizacion) => {
    const requestBody = {
        "identifier": [
          {
            "type": "AUTORIZACION",
            "value": numAutorizacion
          }
        ]
    }
    try {
        const response = await api.post("api/autorizacion/consultar", requestBody);
        return response.data
    } catch (error) {
        console.error('Error en el servicio de consultaAuthorization:', error);
        throw error;
    }
}