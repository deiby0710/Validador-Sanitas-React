import React from "react";
import { safeValue } from "../../utils/formatters";

export const MedicalOrderDetails = ({medOrdData}) => {
    const {
        numOrdenMed,
        numEntregaAuth,
        fechOrdenMed,
        totalEntregas,
        codOrigenAuth,
        periodicidad,
        desOrigenAuth
    } = medOrdData || {};
    return (
        <div className="p-4 mt-2 border rounded container bg-white">
            <div className="text-center mb-3">
                <h4>Datos de orden medica </h4>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col fw-bold">Número Orden Médica:</div>
                    <div className="col">{safeValue(numOrdenMed)}</div>
                    <div className="col fw-bold">Número Entrega Autorizada:</div>
                    <div className="col">{safeValue(numEntregaAuth)}</div>
                </div>
                <div className="row">
                    <div className="col fw-bold">Fecha Orden Médica:</div>
                    <div className="col">{safeValue(fechOrdenMed)}</div>
                    <div className="col fw-bold">Total Entregas:</div>
                    <div className="col">{safeValue(totalEntregas)}</div>
                </div>
                <div className="row">
                    <div className="col fw-bold">Código Origen Autorización:</div>
                    <div className="col">{safeValue(codOrigenAuth)}</div>
                    <div className="col fw-bold">Periodicidad:</div>
                    <div className="col">{safeValue(periodicidad)}</div>
                </div>
                <div className="row">
                    <div className="col fw-bold">Descripción Origen Autorización:</div>
                    <div className="col">{safeValue(desOrigenAuth)}</div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}