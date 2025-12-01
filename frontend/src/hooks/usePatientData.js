import { useEffect, useState } from "react";
import { basicData, consultaAfiliado, copago } from "../services/patientService";

export const usePatientData = (tipo, cedula, codigoProducto, numUser) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mockCopago = {
    "resourceType": "Bundle",
    "id": "488F3070F0B34C948E99194CF5A92C16",
    "meta": {
        "lastUpdated": "2025-06-24"
    },
    "type": "searchset",
    "total": 0,
    "entry": [
        {
            "resource": {
                "resourceType": "OperationOutcome",
                "id": "488F3070F0B34C948E99194CF5A92C16",
                "text": {
                    "status": "generated",
                    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">NO EXISTEN AUTORIZACION(ES) PARA EL PRESTADOR INGRESADO O PRESTADOR SEGUN CODIGO DE APLICACION</div"
                },
                "issue": [
                    {
                        "severity": "information",
                        "code": "204",
                        "details": {
                            "text": "Request no aceptado"
                        }
                    }
                ]
            },
            "search": {
                "mode": "outcome"
            }
        }
    ]
}



  useEffect(() => {
    if(!tipo || !cedula) return;

    const fullData = async () => {
      setLoading(true);
      setError(null);
      let result = {};
      try {
        const basic = await basicData(tipo, cedula);
        result = { ...result, ...parseBasicData(basic) };
      } catch (err) {
        console.error("Error en basicData", err);
      }

      try {
        const afiliado = await consultaAfiliado(tipo, cedula, codigoProducto);
        result = { ...result, ...parseConsultaAfiliadoData(afiliado, numUser) };
      } catch (err) {
        console.error("Error en consultaAfiliado", err);
      }

      try {
        const copagoResp = await copago(tipo, cedula);
        result = { ...result, ...parseCopagoData(copagoResp) };
      } catch (err) {
        console.error("Error en copago", err);
      }

      setData(result);
      setLoading(false);
    };

    fullData();
  }, [tipo,cedula]);

  return {data, loading, error}
}

// Dentro de usePatientData

const parseConsultaAfiliadoData = (data, numUser) => {
  const patientData = data.coverFamilyResponse?.[0] || {};

  const insuranceIdentifiers = patientData.insurancePlan?.identifier || [];
  const contractIdentifiers = patientData.contract?.identifier || [];
  const patient = patientData.contract?.subject?.patient?.[0] || {};
  const identifiers = patient?.identifier || [];
  const telecom = patientData.contract?.address?.[0]?.telecom || [];
  const patientRole = patient?.role || [];
  const contract = patientData.contract;

  return {
    nombre: patient.name || "",
    codigoProducto: insuranceIdentifiers.find(item => item.type === "CODIGO_PRODUCTO")?.value || "",
    nombreProducto: insuranceIdentifiers.find(item => item.type === "NOMBRE_PRODUCTO")?.value || "",
    codigoPlan: contractIdentifiers.find(item => item.type === "PLAN")?.value || "",
    nombrePlan: contractIdentifiers.find(item => item.type === "NOMBRE_PLAN")?.value || "",
    contrato: contractIdentifiers.find(item => item.type === "CONTRATO")?.value || "",
    familia: contractIdentifiers.find(item => item.type === "FAMILIA")?.value || "",
    numUsuario: numUser || identifiers.find(item => item.type === "NUM_USR")?.value || "",
    estado: patient.status || "",
    tipoDocumento: identifiers.find(item => item.type === "TIPO_IDENTIFICACION")?.value || "",
    numeroDocumento: identifiers.find(item => item.type === "NUMERO_IDENTIFICACION")?.value || "",
    telefonoPrincipal: telecom.find(item => item.system === "TELEFONO_CONTACTO_PRINCIPAL")?.value || "",
    segundoTelefono: telecom.find(item => item.system === "CELULAR")?.value || "",
    correo: telecom.find(item => item.system === "CORREO_ELECTRONICO")?.value || "",
    numCotizante: contractIdentifiers.find(item => item.type === "NUMERO_IDENT_CONTRATANTE")?.value || "",
    tipoAfiliado: patientRole.find(item => item.type === "DESC_TIPO_USUARIO")?.value || "",
    sgsss: patient?.supportingInfo?.generalSystemSocialSecurityHealth || null,
    tipoDocumentoContratante: contractIdentifiers.find(item => item.type === "TIPO_IDENT_CONTRATANTE")?.value || "",
    categoria: contract?.subType ?? null,
    motivoEstado: contract?.scope ?? null
  };
};

const parseBasicData = (response) => {
  const data = response?.data?.[0] || {};

  return {
    genero: data.gender || '',
    fechaNacimiento: data.birthDate?.split("T")[0] || '',
    edad: data.age || ''
  };
};

const parseCopagoData = (response) => {
  if(!response || response.total == 0) {
    return {autorizaciones: []};
  }

  const autorizaciones = response.entry.map(item => {
    const numero = item.resource.identifier.find(id => id.system === "BH/NUMERO_AUTORIZACION")?.value;
    return {numero}
  })

  const classes = response?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.class || [];
  return {
    categoria: classes[1]?.value ?? null,
    motivoEstado: classes[0]?.value ?? null,
    autorizaciones
  }
}