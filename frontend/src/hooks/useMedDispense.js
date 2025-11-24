import { useState } from "react";
import { 
    serviceMedicationDispenseByIdentificacion,
    serviceMedicationDispenseByAuthorization 
} from "../services/medicationDispense";
import { mapMedicationDispenseResponse } from "../utils/medDispenseMapper";

export const useMedDispense = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchMedicationDispense = async ({tipoDocumento, numeroIdentificacion, tecnologia, numAutorizacion}) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            let result;
            if(numeroIdentificacion && tipoDocumento && tecnologia){
                result = await serviceMedicationDispenseByIdentificacion(tipoDocumento, numeroIdentificacion, tecnologia)
            } else if (numAutorizacion) {
                result = await serviceMedicationDispenseByAuthorization(numAutorizacion);
            } else {
                throw new Error("Debe enviar numAutorizacion o tipoDocumento + numeroIdentificacion + tecnologia");
            }
            result = mapMedicationDispenseResponse(result)
            console.log(result)
            setData(result)
        } catch (error) {
            const msg = error.response?.data?.message || error.message || "Error desconocido en el hook";
            setError(msg);
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, fetchMedicationDispense }
}