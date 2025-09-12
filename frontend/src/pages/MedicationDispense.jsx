import { useEffect } from "react"
import { MedicationsList } from "../components/MedicationDispense/MedicationList"
import { LocationCardMD } from "../components/MedicationDispense/LocationCardMD"
import { PatientSearchMD } from "../components/MedicationDispense/PatientSearchMD"
import { PatientSummaryMD } from "../components/MedicationDispense/PatientSummaryMD"
import { useMedDispense } from "../hooks/useMedDispense"
import { loadingAlert, closeAlert, defaultAlert } from "../utils/alert"


export const MedicationDispense = () => {
    const { data, loading, error, fetchMedicationDispense } = useMedDispense()

    const handleSearch = (params) => {
        fetchMedicationDispense(params)
    }

    useEffect(()=> {
        if(loading){
            loadingAlert("Procesando...", "Consumiendo autorización...");
        } else {
            closeAlert()
        }
    }, [loading]);

    useEffect(() => {
        if (error) {
            defaultAlert('error', "Error", error)
        }
    }, [error]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <PatientSearchMD onSearch={handleSearch}/>
            <PatientSummaryMD patient={data?.patient}/>
            <MedicationsList medications={data?.medications}/>
        </div>
    )
}