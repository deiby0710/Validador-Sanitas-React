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

export const copagoAuthorization = async (numAutorizacion) => {
  const requestBody = {
    numeroAutorizacion: numAutorizacion
  }
  try {
    const response = await api.post("api/autorizacion/copago", requestBody)
    return response.data
  } catch (error) {
    console.error('Error en el servicio de copagoAuthorization:', error)
    throw error;
  }
}

export const consumirAuthorization = async (numeroAutorizacion, codProducto, sucursal) => {
  const requestBody = {
    numeroAutorizacion: numeroAutorizacion, 
    codigo: codProducto, 
    sucursal: sucursal
  }
  try {
    const response = await api.post("api/autorizacion/consumir", requestBody)
    return response.data
  } catch(err) {
    console.error('Error en el servicio de consumirAuthorization:', err)
    throw err;
  }
}

export const revertirAuthorization = async (numeroAutorizacion, codProducto, sucursal) => {
  const requestBody = {
    numeroAutorizacion: numeroAutorizacion, 
    codigo: codProducto, 
    sucursal: sucursal
  }
  try {
    const response = await api.post("api/autorizacion/revertir", requestBody)
    return response.data
  } catch(err) {
    console.error('Error en el servicio de revertirAuthorization:', err)
    throw err;
  }
}