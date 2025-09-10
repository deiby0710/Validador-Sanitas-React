import { useEffect } from "react"
import { AuthorizationMD } from "../components/MedicationDispense/AuthorizationMD"
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* <h2 className="mb-4">Consulta de Medicamentos</h2> */}
            <PatientSearchMD onSearch={handleSearch}/>
            {/* {searchResult && (
                <div className="row mt-4">
                <div className="col-md-6">
                    <PatientSummary data={searchResult.patient} />
                </div>
                <div className="col-md-6">
                    <Authorization data={searchResult.authorization} />
                </div>
                <div className="col-md-6 mt-3">
                    <LocationCard data={searchResult.location} />
                </div>
                </div>
            )} */}
            {/* <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow" style={{ maxWidth: '900px' }}>
            </div> */}
        </div>
    )
}