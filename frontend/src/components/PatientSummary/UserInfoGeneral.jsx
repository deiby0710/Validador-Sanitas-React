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
            <table className="tabla-info">
                <tbody>
                    <tr>
                        <td className="label">Nombre:</td>
                        <td className="value" colSpan={5}>{safeValue(nombre)}</td>
                    </tr>
                    <tr>
                        <td className="label">Compañía:</td>
                        <td className="value">{safeValue(producto)}</td>

                        <td className="label">Tipo Documento:</td>
                        <td className="value">{safeValue(tipoDocumento)}</td>

                        <td className="label">Fecha Nacimiento:</td>
                        <td className="value">{safeValue(fechaNacimiento)}</td>
                    </tr>

                    <tr>
                        <td className="label">Plan:</td>
                        <td className="value">{safeValue(plan)}</td>

                        <td className="label">Número Documento:</td>
                        <td className="value">{safeValue(numeroDocumento)}</td>

                        <td className="label">Edad:</td>
                        <td className="value">{safeValue(edad)}</td>
                    </tr>

                    <tr>
                        <td className="label">Contrato:</td>
                        <td className="value">{safeValue(contrato)}</td>

                        <td className="label">Teléfono Principal:</td>
                        <td className="value">{safeValue(telefono)}</td>

                        <td className="label">Sexo:</td>
                        <td className="value">{safeValue(sexo)}</td>
                    </tr>

                    <tr>
                        <td className="label">Familia:</td>
                        <td className="value">{safeValue(familia)}</td>

                        <td className="label">Segundo Teléfono:</td>
                        <td className="value">{safeValue(segundoTelefono)}</td>

                        <td className="label">Correo Electrónico:</td>
                        <td className="value">{safeValue(correo)}</td>
                    </tr>

                    <tr>
                        <td className="label">Número de Usuario:</td>
                        <td className="value" colSpan={3}>{safeValue(numeroUsuario)}</td>

                        <td className="label fs-5">Estado:</td>
                        <td className="value fw-bold fs-5">{safeValue(estado)}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}