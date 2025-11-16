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
            <h4 className="text-center mb-4">Consulta Afiliado</h4>
            <table className="tabla-info w-100 text-break">
                <tbody>
                    <tr>
                        <td className="fw-bold p-1">Nombre:</td>
                        <td colSpan={5}>{safeValue(nombre)}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold p-1">Compañía:</td>
                        <td>{safeValue(producto)}</td>

                        <td className="fw-bold p-1">Tipo Documento:</td>
                        <td>{safeValue(tipoDocumento)}</td>

                        <td className="fw-bold p-1">Fecha Nacimiento:</td>
                        <td>{safeValue(fechaNacimiento)}</td>
                    </tr>

                    <tr>
                        <td className="fw-bold p-1">Plan:</td>
                        <td>{safeValue(plan)}</td>

                        <td className="fw-bold p-1">Número Documento:</td>
                        <td>{safeValue(numeroDocumento)}</td>

                        <td className="fw-bold p-1">Edad:</td>
                        <td>{safeValue(edad)}</td>
                    </tr>

                    <tr>
                        <td className="fw-bold p-1">Contrato:</td>
                        <td>{safeValue(contrato)}</td>

                        <td className="fw-bold p-1">Teléfono Principal:</td>
                        <td>{safeValue(telefono)}</td>

                        <td className="fw-bold p-1">Sexo:</td>
                        <td>{safeValue(sexo)}</td>
                    </tr>

                    <tr>
                        <td className="fw-bold p-1">Familia:</td>
                        <td>{safeValue(familia)}</td>

                        <td className="fw-bold p-1">Segundo Teléfono:</td>
                        <td>{safeValue(segundoTelefono)}</td>

                        <td className="fw-bold p-1">Correo Electrónico:</td>
                        <td>{safeValue(correo)}</td>
                    </tr>

                    <tr>
                        <td className="fw-bold p-1">Número de Usuario:</td>
                        <td colSpan={3}>{safeValue(numeroUsuario)}</td>

                        <td className="fw-bold p-1">Estado:</td>
                        <td className="fw-bold p-1 fs-5">{safeValue(estado)}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}