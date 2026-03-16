    import React, { useState } from "react";
    import { consumirAuthorization } from "../../services/authorizationService";
    import { loadingAlert, closeAlert, defaultAlert, confirmationQuestion } from "../../utils/alert";


    export const BtnConsumir = ({numeroAutorizacion, codProducto, sucursal, pagoConsumo}) => {
        const [isProcessing, setIsProcessing] = useState(false);
        let texto = ''
        // if(pagoConsumo === 0){
        //     texto = '';
        // } else {
        //     texto = `\nPago: ${pagoConsumo}`;
        // }
        if (pagoConsumo) {
            // Al usar (Number(pagoConsumo)) nos aseguramos de que sea un número real
            const pagoFormateado = Number(pagoConsumo).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            texto = `\nPago: ${pagoFormateado}`;
        } else {
            texto = '';
        }
        const handleConsumir = async() => {
            if(!numeroAutorizacion || !codProducto || !sucursal) {
                return defaultAlert("warning", "Faltan datos", "No se puede consumir la autorización.")
            };
            const confirm = await confirmationQuestion("question","Consumir",`¿Está Seguro de Consumir la Autorización? ${texto}`,"Sí, consumir","No, cancelar");
            if(!confirm) return;
            setIsProcessing(true)
            loadingAlert("Procesando...", "Consumiendo autorización...");
            try {
                const data = await consumirAuthorization(numeroAutorizacion, codProducto, sucursal)
                closeAlert();
                if (data?.resourceType === "Bundle") {
                    await defaultAlert("success", "Autorización consumida", "La autorización fue consumida exitosamente.");
                    window.location.reload();
                } 
                if (data?.resourceType === "OperationOutcome") {
                    const diagnostic = data?.issue?.[0]?.diagnostics || "No fue posible consumir la autorización.";
                    return defaultAlert("info", "Atención", diagnostic);
                }

                return defaultAlert("info", "Atención", "Se recibió una respuesta no controlada del servicio.");
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