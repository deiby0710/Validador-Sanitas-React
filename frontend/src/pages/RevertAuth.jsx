import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loadingAlert, defaultAlert } from "../utils/alert";

export const RevertAuth = () => {
    const [numeroBusqueda, setNumeroBusqueda] = useState("");
    const navigate = useNavigate();

    const handleConsultar = async (auth) => {
        const numero = auth.numero
        navigate("/autorizacion", {
            state: { numeroAutorizacion: numero }
        });
    }

    const onSubmit = async () => {
        // Validación
        if (!numeroBusqueda.trim()) {
            defaultAlert("info", "Campo vacío", "Debes ingresar un número de autorización");
            return;
        }

        const auth = { numero: numeroBusqueda };
        handleConsultar(auth); // navegar
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <h3 className="mb-4">Consulta de autorización</h3>

            {/* Barra de búsqueda */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Número de autorización"
                value={numeroBusqueda}
                onChange={(e) => setNumeroBusqueda(e.target.value)}
                style={{ width: "300px" }}
            />

            {/* Botón */}
            <button className="btn btn-primary" onClick={onSubmit}>
                Consultar
            </button>
        </div>
    );
}