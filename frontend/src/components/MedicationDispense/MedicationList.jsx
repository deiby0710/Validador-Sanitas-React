import { safeValue } from "../../utils/formatters"

export const MedicationsList = ({ medications }) => {
    if (!medications || medications.length === 0) {
        return (
        <div className="container mt-4 p-4 border rounded shadow w-75 bg-white">
            <h5>Medicamentos</h5>
            <p>No hay medicamentos registrados.</p>
        </div>
        )
    }

    return (
        <div className="container mt-4 p-4 border rounded shadow w-75 bg-white">
        <h5>Medicamentos</h5>
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
            <thead className="table-light">
                <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>Cantidad</th>
                <th>Autorización</th>
                <th>Ubicación</th>
                </tr>
            </thead>
            <tbody>
                {medications.map((med, i) => (
                <tr key={i}>
                    <td>{safeValue(med?.name, "")}</td>
                    <td>{safeValue(med?.code, "")}</td>
                    <td>{safeValue(med?.quantity, "")}</td>
                    <td>{safeValue(med?.prescription, "")}</td>
                    <td>{safeValue(med?.location, "")}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    )
}
