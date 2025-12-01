import React from "react";
import { safeValue } from "../../utils/formatters";

export const MedicationListNPBS = ({ listMed = [] , tipoCopago, cobro}) => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <h4 className="mt-4">Medicamentos (NPBS)</h4>
            </div>

            {listMed.length === 0 ? (
                <p className="text-center">No hay medicamentos NPBS disponibles.</p>
            ) : (
                listMed.map((med, index) => (
                    <div key={index} className="border rounded p-4 mt-2 bg-white">
                        <h5 className="text-center mb-3">Medicamento {index + 1}</h5>

                        <div className="row">
                            <div className="col fw-bold">CUM:</div>
                            <div className="col">{safeValue(med.cum)}</div>

                            <div className="col fw-bold">Nombre medicamento:</div>
                            <div className="col">{safeValue(med.nombre)}</div>
                        </div>

                        <div className="row">
                            <div className="col fw-bold">Diagnóstico clínico:</div>
                            <div className="col">{safeValue(med.diagnostico)}</div>

                            <div className="col fw-bold">Número prescripción MIPRES:</div>
                            <div className="col">{safeValue(med.nroPrescripcion)}</div>
                        </div>

                        <div className="row">
                            <div className="col fw-bold">Código direccionamiento:</div>
                            <div className="col">{safeValue(med.direccionamiento)}</div>

                            {/* <div className="col fw-bold">Código legal (BH):</div> */}
                            {/* <div className="col">{safeValue(med.codigoLegal)}</div> */}
                            <div className="col fw-bold">Fecha registrada:</div>
                            <div className="col">{safeValue(med.fechaRegistro)}</div>
                        </div>

                        <div className="row">
                            <div className="col fw-bold">Médico prescriptor:</div>
                            <div className="col">{safeValue(med.prescriptorNombre)}</div>

                            {/* <div className="col fw-bold">ID Prescriptor:</div>
                            <div className="col">{safeValue(med.prescriptorId)}</div> */}

                            <div className="col fw-bold">Tipo: </div>
                            <div className="col">{safeValue(tipoCopago)}</div>
                        </div>

                        <div className="row">
                            <div className="col fw-bold">Cantidad dispensada:</div>
                            <div className="col">{safeValue(med.cantidad)}</div>

                            {/* <div className="col fw-bold">Forma farmacéutica:</div>
                            <div className="col">{safeValue(med.formaFarmaceutica)}</div> */}

                            <div className="col fw-bold">Cobro:</div>
                            <div className="col">{safeValue(cobro)}</div>
                        </div>

                        <div className="row">
                            <div className="col fw-bold">Sede de entrega:</div>
                            <div className="col">{safeValue(med.sede)}</div>
                            
                            <div className="col fw-bold"></div>
                            <div className="col"></div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};