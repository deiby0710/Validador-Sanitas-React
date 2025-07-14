import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users.json";
import { defaultAlert, timedAlert } from "../utils/alert";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) return defaultAlert('warning','Campos incompletos','Digite Usuario y Contraseña.');

        const user = users.find(u => u.username === username && u.password === password)
        if (user) {
            timedAlert('success', `¡Bienvenido ${username}!`)
            navigate('/validador')
        } else {
            defaultAlert('error', 'Error al inciar sesión', 'Contraseña o usuario incorrecto')
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column" >
            <div>
                <h1 className="m-4">Validador Sanitas</h1>
            </div>
            <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow" style={{ minWidth: '350px' }}>
                <h2>Inicio de Sesión</h2>
                <form className="p-3" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column">
                        <label htmlFor="username" className="form-label">Usuario:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Username" 
                            autoComplete="username"
                            onChange={(e) => { setUsername(e.target.value)}}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Contraseña"  
                            autoComplete="current-password"
                            onChange={(e)=>{ setPassword(e.target.value)}}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary mt-3">Consultar</button>
                </form>
            </div>
        </div>
    )
}