import { api } from "../api/axiosConfig";

export const serviceMedicationDispenseByIdentificacion = async (tipoDocumento, numeroIdentificacion, tecnologia) => {
    const mockRequestBody = {
        "tipoDocumento": "CC",
        "numeroIdentificacion": "59820217"
    }
    const requestBody = {
        "tipoDocumento": tipoDocumento,
        "numeroIdentificacion": numeroIdentificacion,
        "tecnologia": tecnologia
    }
    try {
        const response = await api.post('/api/medicationDispense/identificacion', requestBody)
        return response.data
    } catch (error) {
        console.error("Error en el servicio de serviceMedicationDispenseByIdentificacion: ", error)
        throw error;
    }
}

export const serviceMedicationDispenseByAuthorization = async (authorization) => {
    try {
        const response = await api.post(
            `/api/medicationDispense/autorizacion?autorizacion=${authorization}`
        );
        return response.data
    } catch (error) {
        console.error("Error en el servicio de serviceMedicationDispenseByAuthorization: ", error)
        throw error;
    }
}