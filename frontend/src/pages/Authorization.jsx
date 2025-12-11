import { useLocation } from "react-router-dom"
import { AuthorizationInfo } from "../components/Authorization/AuthorizationInfo"
import { MedicalOrderDetails } from "../components/Authorization/MedicalOrderDetails"
import { MedicationList } from "../components/Authorization/MedicationList"
import { MedicationListNPBS } from "../components/Authorization/MedicationListNPBS"
import { BtnConsumir } from "../components/Authorization/btnConsumir"
import { BtnRevertAuth } from "../components/Authorization/BtnRevertAuth"
import { useAuthData } from "../hooks/useAuthData"
import { loadingAlert, closeAlert } from "../utils/alert"

export const Autorizacion = () => {
    const location = useLocation()
    const { numeroAutorizacion } = location.state || {};

    const { data, loading, error } = useAuthData(numeroAutorizacion);
    const esNPBS = data?.desTipoAtencion === "MEDICAMENTOS NO POS";

    if (loading){
        loadingAlert();
    } else {
        closeAlert();
    }
    
    if (error) {
        defaultAlert('error', "Error", error)
    }
    
    // Datos simulados que luego vendrán del back
    const promptAuthData = {
        numAuth: data?.numAuth,
        codServicio: data?.codServicio,
        codEstAuth: data?.codEstAuth,
        desServicio: data?.desServicio,
        desEstAuth: data?.desEstAuth,
        codTipoAtencion: data?.codTipoAtencion,
        vigencia: data?.vigencia,
        desTipoAtencion: data?.desTipoAtencion,
        categoria: data?.categoria,
        authConsumida: data?.authConsumida,
        fechNotificacion: data?.fechNotificacion,
        authRenovada: data?.authRenovada,
        fechSolicitud: data?.fechSolicitud,
        authApta: data?.authApta,
    };

    const promptMedOrder = {
        numOrdenMed: data?.numOrdenMed,
        numEntregaAuth: data?.numEntregaAuth,
        fechOrdenMed: data?.fechOrdenMed,
        totalEntregas: data?.totalEntregas,
        codOrigenAuth: data?.codOrigenAuth,
        periodicidad: data?.periodicidad,
        desOrigenAuth: data?.desOrigenAuth
    };

    const promptMedicamentos = data?.medicamentos;

    const promptMedicamentosNPBS = data?.medicamentosNPBS;

    return (
        <div className="container py-3">
            <AuthorizationInfo authData={promptAuthData}/>
            <MedicalOrderDetails medOrdData={promptMedOrder}/>
            {esNPBS ? (
                <MedicationListNPBS listMed={promptMedicamentosNPBS} tipoCopago={data?.tipoCopago} cobro={data?.cobro}/>
            ) : (
                <MedicationList listMed={promptMedicamentos} cobro={data?.cobro} />
            )}
            {data?.authConsumida ? (
                <BtnRevertAuth numeroAutorizacion={data?.numAuth} codProducto={data?.codProducto} sucursal={data?.sucursal}/>
            ) : (
                <BtnConsumir numeroAutorizacion={data?.numAuth} codProducto={data?.codProducto} sucursal={data?.sucursal} pagoConsumo={data?.pagoConsumo}/>
            )}
        </div>
    )
}