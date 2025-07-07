import { useEffect, useState } from "react";
import { consultaAuthorization } from "../services/authorizationService";
import { formateDate } from "../utils/formatters";

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
            console.log(result)
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
        cobro: data.authorization?.[0]?.costToBeneficiary?.copayPercentage ?? ''
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

        // Medicamentos
        medicamentos: medicamentos
    };
}