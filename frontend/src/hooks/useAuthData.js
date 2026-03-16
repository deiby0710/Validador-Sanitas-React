import { useEffect, useState } from "react";
import { consultaAuthorization, copagoAuthorization } from "../services/authorizationService";
import { validarPaciente } from "../services/patientService";
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
                result = { ...result, ...parseCopagoData(consulta, result.cobroPercentage)}
            } catch (err) {
                console.log('Error en authData: ', err)
            }
            try {
                const contratoHabilitado = await validateContratoHabilitado(
                    result?.tipoDocPaciente,
                    result?.numDocPaciente,
                    result?.contrato
                );
                result = { ...result, contratoHabilitado };
            } catch (error) {
                console.error("Error validando contrato:", err);
                result = { ...result, contratoHabilitado: false };
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
        pagoConsumo: autorizacion.medicationRequest?.[0]?.sharedPayment ?? autorizacion.sharedCopayCOP ?? '',

        // Consumir auth
        sucursal: autorizacion.performer?.practitioner?.identifier?.[2]?.value || '',
        codProducto: autorizacion.insurance?.coverage?.insurancePlan?.identifier?.[0]?.value || '',

        // Nota
        notes: autorizacion.note || [],

        // User info
        contrato: autorizacion?.insurance?.coverage?.contract?.identifier?.find(i => i?.type === "CONTRATO")?.value || "",
        tipoDocPaciente: autorizacion?.subject?.patient?.identifier?.find(i => i?.type === "TIPO_IDENTIFICACION")?.value || "",
        numDocPaciente: autorizacion?.subject?.patient?.identifier?.find(i => i?.type === "NUMERO_IDENTIFICACION")?.value || "",
    };
}

const parseCopagoData = (data, copayPercentage) => {
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
        const tipoCopago = copayPercentage ? 'COPAGO' : 'CUOTA MODERADORA';
        return {
            cobro: (porcentaje === '' || porcentaje === null) ? "0" : `${porcentaje} %`,
            categoria,
            regimen,
            tipoCopago: tipoCopago
        };
    }
    return {cobro}
}

export function parseMedicationDispense(mapped) {
    if (!mapped || !Array.isArray(mapped.medications)) return [];

    const {
        medications,
        prescriptions,
        supportingInfoBySystem,
        prescriptorName,
        prescriptorId,
        locations
    } = mapped;

    return medications.map(med => {

        return {
            cum: med?.cum || med?.code || "",
            nombre: med?.name || "",
            cantidad: med?.prescriptionInfo?.quantity || "",
            formaFarmaceutica: med?.formaFarmaceutica || "",
            nroPrescripcion: med?.nroPrescripcion || "",
            direccionamiento: med?.direccionamiento || "",
            diagnostico: med?.diagnostico || "",
            codigoLegal: med?.codigoLegal || "",
            prescriptorNombre: prescriptorName || "",
            prescriptorId: prescriptorId || "",
            sede: med?.location || "",
            fechaRegistro: med?.recorded || ""
        };
    });
}

const validateContratoHabilitado = async (tipoDoc, numDoc, contrato) => {
    // Llamamos a coverHeader para validar si el contrato del usuario esta habilitado.
    // Comparamos el contrato que viene de consultAuthorization con contrato de coverHeader
    // Si esta habilitado la variable es true, de lo contrario es false.
    try {
        const coverageHeader = await validarPaciente(tipoDoc, numDoc);
        // Validaciones:
                // console.log('Contrato: ', result.contrato)
                // console.log('Tipo de documento: ',tipoDoc)
                // console.log('Numero de documento: ', numDoc)
                // console.log(
                //     'Contrato desde el coverageHeader: ',
                //     coverageHeader?.data?.find(item =>
                //         item?.contract?.identifier?.some(con =>
                //         con?.type === "CONTRATO" && con?.value === result?.contrato
                //         )
                //     )
                // );
        const contratoHabilitado = coverageHeader?.data?.some(item =>
            item?.contract?.identifier?.some(id =>
                id?.type === "CONTRATO" && id?.value === contrato
            ) &&
            item?.coverage?.some(cov =>
                cov?.status?.code === "HABILITADO"
            )
        ) || false;
        // console.log('El contrato es habilitado: ', contratoHabilitado)
        return contratoHabilitado

    } catch (error) {
        console.error("Error validando contrato:", error);
        return false;
    }
};