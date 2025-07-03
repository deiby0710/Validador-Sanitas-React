import React from "react";
import { safeValue } from "../../utils/formatters";

export const UserInfoGeneral = ({userGeneralData}) => {
    const {
        nombre,
        estado,
        correo,
        producto,
        tipoDocumento,
        fechaNacimiento,
        plan,
        numeroDocumento,
        edad,
        contrato,
        telefono,
        sexo,
        familia,
        segundoTelefono,
        numeroUsuario
    } = userGeneralData || {};
    return (
        <div className="p-4 border rounded container bg-white">
            <div className="text-center mb-3">
                <h4>Información del Usuario</h4>
            </div>
            <div className="container">
                <div className="row my-2">
                    <div className="col-2 fw-bold">{safeValue(nombre)}</div>
                    <div className="col">{/* código estado? */}</div>
                    <div className="col-2 fw-bold">Estado:</div>
                    <div className="col">{safeValue(estado)}</div>
                    <div className="col-2 fw-bold">Correo Electrónico:</div>
                    <div className="col">{safeValue(correo)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Compañía:</div>
                    <div className="col">{safeValue(producto)}</div>
                    <div className="col-2 fw-bold">Tipo Documento:</div>
                    <div className="col">{safeValue(tipoDocumento)}</div>
                    <div className="col-2 fw-bold">Fecha Nacimiento:</div>
                    <div className="col">{safeValue(fechaNacimiento)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Plan:</div>
                    <div className="col">{safeValue(plan)}</div>
                    <div className="col-2 fw-bold">Número Documento:</div>
                    <div className="col">{safeValue(numeroDocumento)}</div>
                    <div className="col-2 fw-bold">Edad:</div>
                    <div className="col">{safeValue(edad)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Contrato:</div>
                    <div className="col">{safeValue(contrato)}</div>
                    <div className="col-2 fw-bold">Teléfono Principal:</div>
                    <div className="col">{safeValue(telefono)}</div>
                    <div className="col-2 fw-bold">Sexo:</div>
                    <div className="col">{safeValue(sexo)}</div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Familia:</div>
                    <div className="col">{safeValue(familia)}</div>
                    <div className="col-2 fw-bold">Segundo Teléfono:</div>
                    <div className="col">{safeValue(segundoTelefono)}</div>
                    <div className="col-2 fw-bold"></div>
                    <div className="col"></div>
                </div>
                <div className="row my-2">
                    <div className="col-2 fw-bold">Número de Usuario:</div>
                    <div className="col">{safeValue(numeroUsuario)}</div>
                </div>
            </div>
        </div>
    )
}