import { useNavigate } from "react-router-dom";
import { AddressBtn } from "../components/Buttons/AddressBtn";

export const Menu = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow d-flex flex-column ">
                <h3>Menu</h3>
                <AddressBtn ruta={"/validador"} estilos={"btn-dark"} texto={"Validador Sanitas"}/>
                <AddressBtn ruta={"/medicationDispense"} estilos={"btn-dark mt-3"} texto={"Dispensador de Medicamentos"}/>
            </div>
        </div>
    )
}