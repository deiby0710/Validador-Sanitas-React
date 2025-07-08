import { api } from "../api/axiosConfig";

export const validarPaciente = async (tipo, cedula) => {
  const requestBody = {
    patient: {
      identifier: [
        { type: 'TIPO_IDENTIFICACION', value: tipo },
        { type: 'NUMERO_IDENTIFICACION', value: cedula }
      ],
      minAge: null,
      maxAge: null,
      relationship: null
    },
    coverage: {
      insurancePlan: { type: 'CODIGO_PRODUCTO', value: '' },
      contract: [
        { type: 'PLAN', value: '' },
        { type: 'CONTRATO', value: '' },
        { type: 'FAMILIA', value: '' }
      ]
    },
    swFamily: false,
    lastValid: false,
    date: ''
  };
  try {
    const response = await api.post('/api/pacientes/validar', requestBody);
    return response.data;
  } catch (error) {
    console.error('Error en la validación del paciente:', error);
    throw error;
  }
}

export const copago = async (tipo, cedula) => {
  try {
    const response = await api.post('/api/pacientes/copago', {
      numIden: cedula,
      tipoIden: tipo
    });
    return response.data
  } catch (error) {
    console.error('Error en la validación del paciente (copago):', error);
    throw error;
  }
}

export const consultaAfiliado = async (tipo, cedula, codigoProducto) => {
  const requestBody = {
      subject: {
          identifier: [
              { type: tipo.toUpperCase(), value: cedula },
              { type: "NUMERO_IDENTIFICACION", value: cedula }
          ]
      },
      coverage: {
          insurancePlan: { type: "CODIGO_PRODUCTO", value: codigoProducto },
          contract: [
              { type: "PLAN", value: "" },
              { type: "CONTRATO", value: "" },
              { type: "FAMILIA", value: "" }
          ]
      },
      swFamily: false,
      lastValid: true,
      date: ""
  };

  try {
    const response = await api.post('/api/pacientes/consultaAfiliado', requestBody)
    return response.data;
  } catch (error) {
    console.error('Error en la validación del paciente (consultaAfiliado):', error);
    throw error;
  }
};

export const basicData = async (tipo, cedula) => {
  try {
    const response = await api.get('/api/pacientes/basicData', {
      params:{
        identificationNumber: cedula,
        identificationType: tipo.toUpperCase()
      }
    })
    return response.data;
  } catch (error) {
    console.error('Error en la validación del paciente (basicData):', error);
    throw error;
  }
}