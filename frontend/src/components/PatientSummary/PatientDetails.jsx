 import React from "react";
import { safeValue } from "../../utils/formatters";

 export const PatientDetails = ({PatientDetailsData}) => {
    const {
        identificacionCotizante,
        sgsss,
        tipoAfilidado,
        categoria,
        desEstAuth,
        tipoDocumentoContratante,
        vigencia,
        motivoEstado
    } = PatientDetailsData || {};
    return (
        <div className="p-4 border rounded container bg-white">
            <div className="text-center mb-3">
                <h4>Información del Usuario</h4>
            </div>
            <div className="container">
                <div className="row my-2">
                    <div className="col-3 fw-bold">Documento del Cotizante Titular:</div>
                    <div className="col">{safeValue(identificacionCotizante)}</div>
                    <div className="col-3 fw-bold">Semanas cotizadas a la SGSSS:</div>
                    <div className="col">{safeValue(sgsss)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-3 fw-bold">Tipo de afiliado:</div>
                    <div className="col">{safeValue(tipoAfilidado)}</div>
                    <div className="col-3 fw-bold">Categoría:</div>
                    <div className="col">{safeValue(categoria)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-3  fw-bold"></div>
                    <div className="col">{safeValue(desEstAuth)}</div>
                    <div className="col-3 fw-bold">Tipo de documento:</div>
                    <div className="col">{safeValue(tipoDocumentoContratante)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-3 fw-bold"></div>
                    <div className="col">{safeValue(vigencia)}</div>
                    <div className="col-3 fw-bold">Motivo del estado del usuario:</div>
                    <div className="col">{safeValue(motivoEstado)}</div>
                </div>
            </div>
        </div>
    )
 }