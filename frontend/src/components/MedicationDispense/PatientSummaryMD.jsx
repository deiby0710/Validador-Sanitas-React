import { safeValue } from "../../utils/formatters"
export const PatientSummaryMD = ({ patient }) => {
    if (!patient) return null;
    return (
        <div className="container mt-4 p-4 border rounded shadow w-75 bg-white">
            <h5>Paciente</h5>
            <div className="row">
                <div className="col-md-4 col-12">
                    <label>Nombre: {safeValue(patient?.name, "")}</label>
                </div>
                <div className="col-md-4 col-12">
                    <label>Identificación: {safeValue(patient?.identifiers?.[0]?.value, "")}</label>
                </div>
                <div className="col-md-4 col-12">
                    <label>Tipo: {safeValue(patient?.identifiers?.[0]?.type, "")} </label>
                </div>
            </div>
        </div>
    )
}