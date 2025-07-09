import React, { useState } from "react";
import { consumirAuthorization } from "../../services/authorizationService";
import { loadingAlert, closeAlert, defaultAlert, confirmationQuestion } from "../../utils/alert";


export const BtnConsumir = ({numeroAutorizacion, codProducto, sucursal}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const handleConsumir = async() => {
        if(!numeroAutorizacion || !codProducto || !sucursal) {
            return defaultAlert("warning", "Faltan datos", "No se puede consumir la autorización.")
        };
        const confirm = await confirmationQuestion("question","Consumir","¿Está Seguro de Consumir la Autorización?","Sí, consumir","No, cancelar");
        if(!confirm) return;
        setIsProcessing(true)
        loadingAlert("Procesando...", "Consumiendo autorización...");
        try {
            const data = await consumirAuthorization(numeroAutorizacion, codProducto, sucursal)
            console.log("La respuesta del consuma de la auth es: ")
            console.log(data)
            closeAlert();
            if (data?.resourceType === "Bundle") {
                return defaultAlert("success", "Autorización consumida", "La autorización fue consumida exitosamente.");
            } else {
                return defaultAlert("info", "Atención", "La autorización ya ha sido consumida anteriormente.");
            }
        } catch (err) {
            closeAlert();
            defaultAlert("error", "Error al consumir", "Ocurrió un error al consumir la autorización.");
        } finally {
            setIsProcessing(false)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="btn btn-dark" onClick={handleConsumir} disabled={isProcessing}>
                Consumir
            </button>
        </div>
    )
}