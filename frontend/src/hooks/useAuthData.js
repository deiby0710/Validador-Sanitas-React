import { useEffect, useState } from "react";
import { consultaAuthorization } from "../services/authorizationService";

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
                result =  { ...result, consulta};
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