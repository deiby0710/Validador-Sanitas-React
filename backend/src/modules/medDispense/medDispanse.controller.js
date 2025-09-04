import { medicationDispenseByIdS } from "./medDispense.service.js";

export const medicationDispenseById = async (req, res) => {
  try {
    const { tipoDocumento, numeroIdentificacion } = req.body;
    const authHeader = req.headers["Authorization"];

    if (!tipoDocumento || !numeroIdentificacion) {
      return res.status(400).json({
        message: "Falta el tipo de documento o el número de identificación."
      });
    }

    const data = await medicationDispenseByIdS(tipoDocumento, numeroIdentificacion, authHeader);

    if (!data) {
      return res.status(404).json({
        message: "No se encontraron datos en Authorization Medication Dispense."
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Error en authorizationMedicationDispenseController:", error);
    res.status(500).json({
      message: "Error obteniendo datos del paciente (Authorization Medication Dispense).",
      error: error.message
    });
  }
};