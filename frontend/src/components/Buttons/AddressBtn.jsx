import { useNavigate } from "react-router-dom";

export const AddressBtn = ({ruta, estilos, texto}) => {
    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate(ruta)
    }
    return (
        <button onClick={handleOnClick} className={`btn ${estilos || ''}`}>
            {texto || "Boton direccionamiento"}
        </button>
    )
}