import React from "react";
import { safeValue } from "../../utils/formatters";

export const AuthorizationInfo = ( {authData} ) => {
    const {
        numAuth,
        codServicio,
        codEstAuth,
        desServicio,
        desEstAuth,
        codTipoAtencion,
        vigencia,
        desTipoAtencion,
        categoria,
        authConsumida,
        fechNotificacion,
        authRenovada,
        fechSolicitud,
        authApta
    } = authData || {};
    return (
        <div className="p-4 border rounded container bg-white">
            <div className="text-center mb-3">
                <h4>Informacion sobre la autorizacion</h4>
            </div>
            <div className="container">
                <div className="row my-2">
                    <div className="col-2 fw-bold">Número Autorización:</div>
                    <div className="col">{safeValue(numAuth)}</div>
                    <div className="col-2 fw-bold">Código Servicio:</div>
                    <div className="col">{safeValue(codServicio)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Código estado autorización:</div>
                    <div className="col">{safeValue(codEstAuth)}</div>
                    <div className="col-2 fw-bold">Descripción Servicio:</div>
                    <div className="col">{safeValue(desServicio)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2  fw-bold">Descripción estado autorización:</div>
                    <div className="col">{safeValue(desEstAuth)}</div>
                    <div className="col-2 fw-bold">Código Tipo Atención:</div>
                    <div className="col">{safeValue(codTipoAtencion)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Vigencia:</div>
                    <div className="col">{safeValue(vigencia)}</div>
                    <div className="col-2 fw-bold">Descripción Tipo Atención:</div>
                    <div className="col">{safeValue(desTipoAtencion)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Categoria:</div>
                    <div className="col">{safeValue(categoria)}</div>
                    <div className="col-2 fw-bold">Consumida:</div>
                    <div className="col">{safeValue(authConsumida)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Fecha Notificacion:</div>
                    <div className="col">{safeValue(fechNotificacion)}</div>
                    <div className="col-2 fw-bold">Renovada:</div>
                    <div className="col">{safeValue(authRenovada)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Fecha Solicitud:</div>
                    <div className="col">{safeValue(fechSolicitud)}</div>
                    <div className="col-2 fw-bold">Apta:</div>
                    <div className="col">{safeValue(authApta)}</div>
                </div>
            </div>
        </div>
    )
}