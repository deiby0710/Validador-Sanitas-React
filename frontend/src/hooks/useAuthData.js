import { useEffect, useState } from "react";
import { consultaAuthorization, copagoAuthorization } from "../services/authorizationService";
import { formateDate } from "../utils/formatters";
import { 
    serviceMedicationDispenseByAuthorization 
} from "../services/medicationDispense";
import { mapMedicationDispenseResponse } from "../utils/medDispenseMapper";

export const useAuthData = (numAutorizacion) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        if (!numAutorizacion) return;
        const fullData = async () => {
            setLoading(true)
            setError(null)
            let result = {};
            try {
                const consulta = await consultaAuthorization(numAutorizacion);
                result =  { ...result, ...parseConsultaData(consulta)};
            } catch (err) {
                console.error('Error en authData: ', err);
            }
            try {
                const consulta = await copagoAuthorization(numAutorizacion);
                result = { ...result, ...parseCopagoData(consulta, result.cobroValueMoney, result.cobroPercentage)}
            } catch (err) {
                console.log('Error en authData: ', err)
            }
            const esNPBS = result.desTipoAtencion === "MEDICAMENTOS NO POS";

            if (esNPBS) {
                try {
                    const medDisp = await serviceMedicationDispenseByAuthorization(numAutorizacion);
                    const sanitized = mapMedicationDispenseResponse(medDisp);
                    const parsedNPBS = parseMedicationDispense(sanitized);
                    
                    result.medicamentosNPBS = parsedNPBS;
                } catch (err) {
                    console.error("Error MedicationDispense:", err);
                    setError("Error al consultar información clínica NPBS");
                }
            }
            setData(result);
            setLoading(false);
        };

        fullData();
    }, [numAutorizacion]);

    return {data, loading, error}
};

const parseConsultaData = (data) => {
    const autorizacion = data.authorization?.[0] || {};
    const autorizacionFechaCorreccion = data.authorization?.[0] ?? {};

    const medicamentos = autorizacion.medicationRequest?.map((med, index) => {
        return {
            codLegMedicamento: med.identifier?.[0]?.value || '',
            nomMed: med.identifier?.[1]?.value || '',
            desFormFarmaceutica: med.medication?.form?.[1]?.name || '',
            sucursal: autorizacion.performer?.practitioner?.identifier?.[2]?.value || '',
            controlado: med.checked ?? false,
            cantDispensada: med.medicationDispense?.quantity ?? '',
            tipoCopago: autorizacion.costToBeneficiary?.type || '',
            codProducto: autorizacion.insurance?.coverage?.insurancePlan?.identifier?.[0]?.value || '',
        };
    }) || [];

    return {
        // Autorización
        numAuth: autorizacion.identifier?.[0]?.value || '',
        codEstAuth: autorizacion.status?.code || '',
        desEstAuth: autorizacion.status?.description || '',
        categoria: autorizacion.category?.description || '',
        vigencia: autorizacion.occurrence?.start && autorizacion.occurrence?.end
        ? `${formateDate(autorizacion.occurrence.start)} hasta ${formateDate(autorizacion.occurrence.end)}`
        : '',
        fechNotificacion: formateDate(autorizacionFechaCorreccion?.notificationOn) || '',
        fechSolicitud: formateDate(autorizacion.applicationDate) || '',
        codServicio: autorizacion.category?.code || '',
        desServicio: autorizacion.category?.description || '',
        codTipoAtencion: autorizacion.encounter?.class?.code || '',
        desTipoAtencion: autorizacion.encounter?.class?.value || '',
        authConsumida: autorizacion.isConsumed ?? null,
        authRenovada: autorizacion.isRenewed ?? null,
        authApta: autorizacion.isSuitableRenewal ?? null,

        // Orden Médica
        numOrdenMed: autorizacion.serviceRequest?.identifier?.code || '',
        fechOrdenMed: formateDate(autorizacion.serviceRequest?.authoredOn) || '',
        codOrigenAuth: autorizacion.serviceRequest?.reasonReference?.condition?.code || '',
        desOrigenAuth: autorizacion.serviceRequest?.reasonReference?.condition?.value || '',
        numEntregaAuth: autorizacion.serviceRequest?.basedOn?.MedicationRequest?.code || '',
        totalEntregas: autorizacion.serviceRequest?.basedOn?.MedicationRequest?.dispenseRequest?.numberOfRepeatsAllowed || '',
        periodicidad: autorizacion.serviceRequest?.basedOn?.MedicationRequest?.dispenseRequest?.dispenseInterval || '',
        tipoCopago: autorizacion.costToBeneficiary?.type || '',

        // Medicamentos
        medicamentos: medicamentos,
        cobroValueMoney: data.authorization?.[0]?.costToBeneficiary?.valueMoney ?? '',
        cobroPercentage: data.authorization?.[0]?.costToBeneficiary?.copayPercentage ?? '',
        pagoConsumo: autorizacion.medicationRequest?.[0]?.sharedPayment ?? '',

        // Consumir auth
        sucursal: autorizacion.performer?.practitioner?.identifier?.[2]?.value || '',
        codProducto: autorizacion.insurance?.coverage?.insurancePlan?.identifier?.[0]?.value || ''
    };
}

// const parseCopagoData = (data, valueMoney, copayPercentage) => {
//     let cobro = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.valueMoney?.value ?? '';
//     let texto = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.exception?.[0]?.type?.text ?? '';
//     if (cobro === 0 && texto === 'Sin cobro de cuota moderadora') return {cobro: `${copayPercentage} %`};
//     // sanitas: texto = 'Primera vez'
//     return {cobro: valueMoney}
// }

const parseCopagoData = (data, valueMoney, copayPercentage) => {
    let cobro = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.valueMoney?.value ?? '';
    let texto = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.exception?.[0]?.type?.text ?? '';

    // 🔥 1. Extraer categoría y régimen (del mismo copayAmount)
    const clases = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.class ?? [];
    const categoria = clases.find(c => c.type?.coding?.[0]?.system === "BH/CATEGORIA")?.value || "";
    const regimen = clases.find(c => c.type?.coding?.[0]?.system === "BH/REGIMEN")?.value || "";
    // 🔥 2. Tabla de porcentajes normativos (Sanitas 2025)
    const porcentajesPorCategoria = {
        "A": 11.5,
        "B": 17.3,
        "C": 23
    };
    const porcentaje = porcentajesPorCategoria[categoria] ?? copayPercentage;

    if (cobro === 0 && texto === 'Sin cobro de cuota moderadora') {
        return {
            cobro: `${porcentaje} %`,
            categoria,
            regimen,
            tipoCopago: "COPAGO"
        };
    }
    // sanitas: texto = 'Primera vez'
    return {cobro: valueMoney}
}

export function parseMedicationDispense(mapped) {
    if (!mapped || !mapped.medications) return [];

    const {
        medications,
        prescriptions,
        supportingInfoBySystem,
        prescriptorName,
        prescriptorId,
        locations
    } = mapped;

    const cantidad = prescriptions?.[0]?.quantity || "";
    const sede = locations?.[0]?.city || "";

    return medications.map(med => ({
        // Datos del medicamento
        cum: med.cum || med.code || "",
        nombre: med.name || "",
        cantidad: cantidad,

        // Información farmacéutica
        formaFarmaceutica: med.formaFarmaceutica || "",
        
        // MIPRES
        nroPrescripcion: supportingInfoBySystem["MIPRES/NRO_PRESCRIPCION"] || "",
        direccionamiento: supportingInfoBySystem["MIPRES/ID_DIRECCIONAMIENTO"] || "",

        // Diagnóstico y legalidad
        diagnostico: med.diagnostico || "",
        codigoLegal: med.codigoLegal || "",

        // Prescriptor
        prescriptorNombre: prescriptorName || "",
        prescriptorId: prescriptorId || "",

        // Sede y fecha
        sede: sede,
        fechaRegistro: med.recorded || ""
    }));
}