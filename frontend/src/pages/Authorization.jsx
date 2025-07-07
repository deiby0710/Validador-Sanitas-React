import { useLocation } from "react-router-dom"
import { AuthorizationInfo } from "../components/Authorization/AuthorizationInfo"
import { MedicalOrderDetails } from "../components/Authorization/MedicalOrderDetails"
import { MedicationList } from "../components/Authorization/MedicationList"
import { useAuthData } from "../hooks/useAuthData"

export const Autorizacion = () => {
    const location = useLocation()
    const { numeroAutorizacion } = location.state || {};

    const { data, loading, error } = useAuthData(numeroAutorizacion);

    console.log('La data es')
    console.log(data)
    
    // Datos simulados que luego vendrán del back
    const mockAuthData = {
        numAuth: "297914350",
        codServicio: "37",
        codEstAuth: "8",
        desServicio: "MEDICAMENTOS",
        desEstAuth: "IMPRESA APROBADA",
        codTipoAtencion: "1",
        vigencia: "2025-04-09 hasta 2025-05-09",
        desTipoAtencion: "AMBULATORIA",
        categoria: "MEDICAMENTOS",
        authConsumida: "false",
        fechNotificacion: "2025-04-09",
        authRenovada: "false",
        fechSolicitud: "2025-04-09",
        authApta: "true",
    };

    const mockMedOrder = {
        numOrdenMed: "202504092879914350",
        numEntregaAuth: "1",
        fechOrdenMed: "2025-04-09",
        totalEntregas: "1",
        codOrigenAuth: "1",
        periodicidad: "",
        desOrigenAuth: "ENFERMEDAD GENERAL"
    };

    const mockMedicamentos = [
        {
        codLegMedicamento: "C0040A130C1",
        nomMed: "HIDROCLOROTIAZIDA+IRBESARTAN...",
        controlado: "false",
        cantDispensada: "30",
        desFormFarmaceutica: "TABLETA",
        tipoCopago: "CUOTA MODERADORA",
        sucursal: "204013",
        cobro: "0",
        codProducto: "30"
        },
        {
        codLegMedicamento: "NZ0A088C0C1",
        nomMed: "OLMESARTAN MEDOXOMILO...",
        controlado: "false",
        cantDispensada: "15",
        desFormFarmaceutica: "TABLETA",
        tipoCopago: "CUOTA MODERADORA",
        sucursal: "204013",
        cobro: "0",
        codProducto: "30"
        }
    ];
    return (
        <div className="container py-3">
            <AuthorizationInfo authData={mockAuthData}/>
            <MedicalOrderDetails medOrdData={mockMedOrder}/>
            <MedicationList listMed={mockMedicamentos}/>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <button className="btn btn-dark">Consumir</button>
            </div>
        </div>
    )
}