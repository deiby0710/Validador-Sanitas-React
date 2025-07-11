import { useEffect, useState } from "react";
import { consultaAuthorization, copagoAuthorization } from "../services/authorizationService";
import { formateDate } from "../utils/formatters";

const mockCopagoAuth = {
    "resourceType": "Bundle",
    "id": "20E4A82392B64E2D81FF69DF114E7076",
    "type": "searchset",
    "total": 1,
    "entry": [
        {
            "resource": {
                "resourceType": "Coverage",
                "id": "20E4A82392B64E2D81FF69DF114E7076",
                "status": "active",
                "identifier": [
                    {
                        "system": "BH/NUMERO_AUTORIZACION",
                        "value": "297946371"
                    }
                ],
                "costToBeneficiary": [
                    {
                        "valueQuantity": {
                            "value": 0
                        },
                        "valueMoney": {
                            "value": 0
                        },
                        "exception": [
                            {
                                "type": {
                                    "coding": [
                                        {
                                            "system": "BH/MOTIVO_NO_PAGO",
                                            "code": "3"
                                        }
                                    ],
                                    "text": "Sin cobro de cuota moderadora"
                                }
                            }
                        ],
                        "class": [
                            {
                                "type": {
                                    "coding": [
                                        {
                                            "system": "BH/REGIMEN"
                                        }
                                    ]
                                },
                                "value": "CONTRIBUTIVO"
                            },
                            {
                                "type": {
                                    "coding": [
                                        {
                                            "system": "BH/CATEGORIA"
                                        }
                                    ]
                                },
                                "value": "GRUPO C"
                            }
                        ]
                    }
                ]
            },
            "response": {
                "status": "200 OK"
            }
        }
    ]
}
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
                // const consulta = await copagoAuthorization(numAutorizacion);
                result = { ...result, ...parseCopagoData(consulta, result.cobroValueMoney, result.cobroPercentage)}
            } catch (err) {
                console.log('Error en authData: ', err)
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

        // Medicamentos
        medicamentos: medicamentos,
        cobroValueMoney: data.authorization?.[0]?.costToBeneficiary?.valueMoney ?? '',
        cobroPercentage: data.authorization?.[0]?.costToBeneficiary?.copayPercentage ?? '',

        // Consumir auth
        sucursal: autorizacion.performer?.practitioner?.identifier?.[2]?.value || '',
        codProducto: autorizacion.insurance?.coverage?.insurancePlan?.identifier?.[0]?.value || ''
    };
}

const parseCopagoData = (data, valueMoney, copayPercentage) => {
    let cobro = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.valueMoney?.value ?? '';
    let texto = data?.entry?.[0]?.resource?.costToBeneficiary?.[0]?.exception?.[0]?.type?.text ?? '';
    if (cobro === 0 && texto === 'Sin cobro de cuota moderadora') return {cobro: `${copayPercentage} %`};
    // sanitas: texto = 'Primera vez'
    return {cobro: valueMoney}
}