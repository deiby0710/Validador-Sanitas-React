import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { AuthorizationInfo } from "../components/Authorization/AuthorizationInfo"
import { MedicalOrderDetails } from "../components/Authorization/MedicalOrderDetails"
import { MedicationList } from "../components/Authorization/MedicationList"
import { MedicationListNPBS } from "../components/Authorization/MedicationListNPBS"
import { BtnConsumir } from "../components/Authorization/btnConsumir"
import { BtnRevertAuth } from "../components/Authorization/BtnRevertAuth"
import { useAuthData } from "../hooks/useAuthData"
import { loadingAlert, closeAlert, defaultAlert } from "../utils/alert"
import { NoteConsultAuth } from "../components/Authorization/NoteConsultAuth"

export const Autorizacion = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const handledError = useRef(false)
    const { numeroAutorizacion } = location.state || {};

    const { data, loading, error } = useAuthData(numeroAutorizacion);
    const esNPBS = data?.desTipoAtencion === "MEDICAMENTOS NO POS";

    useEffect(() => {
        if (!numeroAutorizacion && !handledError.current) {
            handledError.current = true
            navigate("/", { replace: true })
        }
    }, [numeroAutorizacion, navigate])

    useEffect(() => {
        if (loading) {
            loadingAlert()
        } else {
            closeAlert()
        }
    }, [loading])

    useEffect(() => {
        if (error && !handledError.current) {
            handledError.current = true

            defaultAlert("error", "Error", error)
                .then(() => {
                    navigate("/validador", { replace: true })
                })
        }
    }, [error, navigate])
    
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

    if (!numeroAutorizacion) {
        return null
    }

    return (
        <div className="container py-3">
            <AuthorizationInfo authData={promptAuthData}/>
            <MedicalOrderDetails medOrdData={promptMedOrder}/>
            {esNPBS ? (
                <MedicationListNPBS listMed={promptMedicamentosNPBS} tipoCopago={data?.tipoCopago} cobro={data?.cobro}/>
            ) : (
                <MedicationList listMed={promptMedicamentos} cobro={data?.cobro} />
            )}
            <NoteConsultAuth notas={data?.notes}/>
            {data?.authConsumida ? (
                <BtnRevertAuth numeroAutorizacion={data?.numAuth} codProducto={data?.codProducto} sucursal={data?.sucursal}/>
            ) : (
                <BtnConsumir numeroAutorizacion={data?.numAuth} codProducto={data?.codProducto} sucursal={data?.sucursal} pagoConsumo={data?.pagoConsumo}/>
            )}
        </div>
    )
}