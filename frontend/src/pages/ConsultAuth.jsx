import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loadingAlert, defaultAlert } from "../utils/alert";

export const ConsultAuth = () => {
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
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow" style={{ maxWidth: '900px' }}>
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
                <button className="btn btn-secondary" onClick={onSubmit}>
                    Consultar
                </button>
            </div>
        </div>
    );
}