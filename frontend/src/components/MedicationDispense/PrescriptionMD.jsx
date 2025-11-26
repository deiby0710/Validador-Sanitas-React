import { safeValue } from "../../utils/formatters"

export const PrescriptionMD = ({ prescriptions }) => {
  if (!prescriptions) return null;
    return (
        <div className="container mt-4 p-4 border rounded shadow w-75 bg-white">
            <h5>Prescripción</h5>
            {prescriptions?.map((prescription, index) => (
                <div key={index} className="row mb-3 border-bottom pb-2">
                    <div className="col-md-4 col-12">
                        <label><strong>Número de Autorización:</strong> {safeValue(prescription?.id, "")}</label>
                    </div>
                    <div className="col-md-4 col-12">
                        <label><strong>Fecha de Prescripción:</strong> {safeValue(prescription?.date, "")}</label>
                    </div>
                    <div className="col-md-4 col-12">
                        <label><strong>Cantidad formulada:</strong> {safeValue(prescription?.quantity, "")}</label>
                    </div>
                    <div className="col-md-4 col-12">
                        <label><strong>Repeticiones permitidas:</strong> {safeValue(prescription?.repeats, "")}</label>
                    </div>
                    {/* <div className="col-md-4 col-12">
                        <label><strong>Duración esperada:</strong> {safeValue(prescription?.duration, "")}</label>
                    </div> */}
                </div>
            ))}
        </div>
    )
}