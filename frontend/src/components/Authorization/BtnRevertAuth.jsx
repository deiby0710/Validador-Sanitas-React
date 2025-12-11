import React, { useState } from "react";
import { consumirAuthorization, revertirAuthorization } from "../../services/authorizationService";
import { loadingAlert, closeAlert, defaultAlert, confirmationQuestion } from "../../utils/alert";


export const BtnRevertAuth = ({numeroAutorizacion, codProducto, sucursal}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const handleConsumir = async() => {
        if(!numeroAutorizacion || !codProducto || !sucursal) {
            return defaultAlert("warning", "Faltan datos", "No se puede consumir la autorización.")
        };
        const confirm = await confirmationQuestion("question","Revertir Consumo",`¿Está Seguro de Revertir el Consumo de la Autorización?`,"Sí, revertir","No, cancelar");
        if(!confirm) return;
        setIsProcessing(true)
        loadingAlert("Procesando...", "Revirtiendo autorización...");
        try {
            const data = await revertirAuthorization(numeroAutorizacion, codProducto, sucursal)
            closeAlert();
            if (data?.resourceType === "Bundle") {
                return defaultAlert("success", "Consumo revertido", "La autorización ha sido revertida exitosamente.");
            } else {
                return defaultAlert("info", "Atención", "La autorización no pudo revertirse o ya estaba activa.");
            }
        } catch (err) {
            closeAlert();
            defaultAlert("error", "Error al revertir", "Ocurrió un error al revertir la autorización.");
        } finally {
            setIsProcessing(false)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="btn btn-dark" onClick={handleConsumir} disabled={isProcessing}>
                Revertir Consumo
            </button>
        </div>
    )
}