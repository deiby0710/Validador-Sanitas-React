import React from "react";

export const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column" >
            <div>
                <h1 className="m-4">Validador Sanitas</h1>
            </div>
            <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow" style={{ minWidth: '350px' }}>
                <h2>Inicio de Sesión</h2>
                <form className="p-3">
                    <div className="d-flex flex-column">
                        <label htmlFor="username" className="form-label">Usuario:</label>
                        <input type="text" className="form-control" placeholder="Username" autoComplete="username"/>
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" className="form-control" placeholder="Contraseña" required autoComplete="current-password"/>
                    </div>
                    <button type="submit" className="btn btn-secondary mt-3">Consultar</button>
                </form>
            </div>
        </div>
    )
}