import React from "react";

export const AuthorizationTable = ({autorizaciones = [], onConsultar}) => {
    return (
        <div className="container bg-white border rounded">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Numero Autorizacion</th>
                        <th>Consumir</th>
                    </tr>
                </thead>
                <tbody>
                    {autorizaciones.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay autorizaciones disponibles.
                            </td>
                        </tr>
                    ) : (
                        autorizaciones.map((auth, index) => (
                            <tr key={auth.numero}>
                                <td>{index + 1}</td>
                                <td>{auth.numero}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => onConsultar?.(auth)}>Consultar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}