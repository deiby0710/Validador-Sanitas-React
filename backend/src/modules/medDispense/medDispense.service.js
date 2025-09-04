import { sanitizeSanitasResponse } from "../../utils/sanitize.js";

export const medicationDispenseByIdS = async (tipoDocumento,numeroIdentificacion,authHeader) => {
  const requestBody = {
    resourceType: "Bundle",
    id: "bundle-request-medicationDispense",
    type: "transaction",
    entry: [
      {
        request: {
          method: "GET",
          url: `MedicationDispense?subject.identifier:of-type=BH|${tipoDocumento}|${numeroIdentificacion}&authorizingPrescription.category-code=M&_include=MedicationDispense:authorizingPrescription&_include=MedicationDispense:location&_include=MedicationDispense:subject`
        }
      }
    ]
  };

  try {
    const response = await fetch(
      "https://papi.colsanitas.com/osi/api/articulation/articulationOfHealthCare/V1.0.0/authorizationMedicationDispense",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader, 
          "petitionId": "petitionId",
          "aplicationCod": "PSA000296913",
          "terminalId": "terminalId",
          "dateRequest": new Date().toISOString(),
          "businessFunction": "businessFunction",
          "userData": "userData",
          "Usuario": "genhospi"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const rawResponse = await response.text();

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} - ${rawResponse}`
      );
    }
    
    const cleanedJsonString = sanitizeSanitasResponse(rawResponse);

    try {
      const parsedData = JSON.parse(cleanedJsonString);
      return parsedData;
    } catch (parseError) {
      console.error("Error al parsear el JSON limpio:", parseError);
      return cleanedJsonString;
    }
  } catch (error) {
    console.log("Error en medicationDispenseByIdS:", error);
    throw error;
  }
};


export const medicationDispenseByAuthorizationS = async (authorization,authHeader) => {
  const requestBody = {
      "resourceType": "Bundle",
      "id": "bundle-request-medicationDispense",
      "type": "transaction",
      "entry": [
          {
              "request": {
                  "method": "GET",
                  "url": `MedicationDispense?identifier=${authorization}&_include=MedicationDispense:authorizingPrescriptiont&_include=MedicationDispense:location&_include=MedicationDispense:subject`
              }
          }
      ]
  };

  try {
    const response = await fetch(
      "https://papi.colsanitas.com/osi/api/articulation/articulationOfHealthCare/V1.0.0/authorizationMedicationDispense",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader, 
          "petitionId": "petitionId",
          "aplicationCod": "PSA000296913",
          "terminalId": "terminalId",
          "dateRequest": new Date().toISOString(),
          "businessFunction": "businessFunction",
          "userData": "userData",
          "Usuario": "genhospi"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const rawResponse = await response.text();

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} - ${rawResponse}`
      );
    }
    
    const cleanedJsonString = sanitizeSanitasResponse(rawResponse);

    try {
      const parsedData = JSON.parse(cleanedJsonString);
      return parsedData;
    } catch (parseError) {
      console.error("Error al parsear el JSON limpio:", parseError);
      return cleanedJsonString;
    }
  } catch (error) {
    console.log("Error en medicationDispenseByAuthorizationS:", error);
    throw error;
  }
};