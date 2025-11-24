import { medicationDispenseByIdS, medicationDispenseByAuthorizationS } from "./medDispense.service.js";

export const medicationDispenseById = async (req, res) => {
  try {
    const { tipoDocumento, numeroIdentificacion, tecnologia } = req.body;
    const authHeader = req.headers["Authorization"];

    if (!tipoDocumento || !numeroIdentificacion || !tecnologia) {
      return res.status(400).json({
        message: "Falta el tipo de documento, el número de identificación o tecnologia."
      });
    }

    const data = await medicationDispenseByIdS(tipoDocumento, numeroIdentificacion, tecnologia, authHeader);

    if (!data) {
      return res.status(404).json({
        message: "No se encontraron datos en Authorization Medication Dispense."
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Error en medicationDispenseById:", error);
    res.status(500).json({
      message: "Error obteniendo datos del paciente (Authorization Medication Dispense).",
      error: error.message
    });
  }
};

export const medicationDispenseByAuthorization = async (req, res) => {
  try {
    const { autorizacion } = req.query;
    const authHeader = req.headers["Authorization"];

    if (!autorizacion) {
      return res.status(400).json({
        message: "Falta el numero de autorización."
      });
    }

    const data = await medicationDispenseByAuthorizationS(autorizacion, authHeader);

    if (!data) {
      return res.status(404).json({
        message: "No se encontraron datos en Authorization Medication Dispense."
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Error en medicationDispenseByAuthorization:", error);
    res.status(500).json({
      message: "Error obteniendo datos del paciente (Authorization Medication Dispense).",
      error: error.message
    });
  }
};