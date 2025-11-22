import pool from '../../../config/db.js';

export const validatePatient = async (requestBody, authHeader) => {
    try {
        const response = await fetch(
            process.env.VALIDATE_PATIENT_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authHeader, 
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json(); // Devuelve los datos al controlador
    } catch (error) {
        console.error("Error en validatePatient:", error);
        throw error; // Lanza el error para que el controlador lo maneje
    }
};

export const validatorPatient = async (requestBody, authHeader) => {
    try {
        const response = await fetch(
            process.env.VALIDATOR_PATIENT_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authHeader, 
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json(); // Devuelve los datos al controlador
    } catch (error) {
        console.error("Error en validatorPatient:", error);
        throw error; // Lanza el error para que el controlador lo maneje
    }
};

export const getPatientBasicData = async (identificationNumber, identificationType, authHeader) => {
    try {
        const url = `${process.env.BASIC_DATA_URL}identificationNumber=${identificationNumber}&identificationType=${identificationType}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": authHeader,
                "IdPeticion": "UREAF19ISAFG987",
                "IdTerminal": "10.251.107.195",
                "Usuario": process.env.USERNAME_API,
                "FechaPeticion": "2024-09-20T15:00:00",
                "funcionNegocio": "Dispensacion",
                "codAplicacion": "PSA000199903",
                "tipoConsulta": "1",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json(); // Devuelve los datos al controlador
    } catch (error) {
        console.error("Error en getPatientBasicData:", error);
        throw error; // Lanza el error para que el controlador lo maneje
    }
};


// Consumimos la couta moderadora.

// export const copayAmount2 = async (numIden, tipoIden,authHeader) => {
//     const currentDay = new Date().toISOString().split("T")[0]
//     const requestBody = {
//       "resourceType": "Bundle",
//       "id": "bundle-request-copayAmount",
//       "type": "transaction",
//       "entry": [
//         {
//           "request": {
//             "method": "GET",
//             "url": "Patient"
//           },
//           "resource": {
//             "resourceType": "Patient",
//             "id": "GUID",
//             "meta": {
//               "lastUpdated": currentDay
//             },
//             "identifier": [
//               {
//                 "type": {
//                   "coding": [
//                     {
//                       "code": tipoIden
//                     }
//                   ]
//                 },
//                 "system": "BH/NUMERO_IDENTIFICACION",
//                 "value": numIden
//               }
//             ]
//           }
//         }
//       ]
//     }
//     try {
//       const response = await fetch(
//         "https://papi.colsanitas.com/osi/api/financialResourcesManagement/payment/coverage/v1.0.0/copayAmount",
//         {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//               "Authorization": authHeader,
//               "user": process.env.USERNAME_API,
//               "dateRequest": '2024-01-22',
//               "businessFunction": "Dispensacion Medicamentos",
//               "aplicationCod": "PSA000199903",
//               "typeQuery": 2
//           },
//           body: JSON.stringify(requestBody)
//         }
//       );

//       if (!response.ok){
//         throw new Error(`Error en la solicitud: ${response.status}`)
//       }

//       return await response.json()
//     } catch (error) {
//       console.log("Error en copayAmount:", error)
//       throw error
//     }
// }

export const savePatientSanitas = async (data) => {
    try {
        const sql = `
            INSERT INTO pacientes_sanitas (
                nombre_completo,
                compania,
                plan,
                contrato,
                familia,
                numero_usuario,
                estado,
                tipo_documento,
                numero_documento,
                telefono_principal,
                segundo_telefono,
                correo,
                fecha_nacimiento,
                sexo,
                consultado_por
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                nombre_completo    = VALUES(nombre_completo),
                compania           = VALUES(compania),
                plan               = VALUES(plan),
                contrato           = VALUES(contrato),
                familia            = VALUES(familia),
                numero_usuario     = VALUES(numero_usuario),
                estado             = VALUES(estado),
                telefono_principal = VALUES(telefono_principal),
                segundo_telefono   = VALUES(segundo_telefono),
                correo             = VALUES(correo),
                fecha_nacimiento   = VALUES(fecha_nacimiento),
                sexo               = VALUES(sexo),
                consultado_por     = VALUES(consultado_por)
        `;
        const result = await pool.execute(sql, data);
        return result
    } catch (error) {
        console.error('Error en saveOrUpdatePatientSanitas: ', error);
        throw error;
    }
}