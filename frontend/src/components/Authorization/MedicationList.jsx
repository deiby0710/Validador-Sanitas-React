import React from "react";
import { safeValue } from "../../utils/formatters";

export const MedicationList = ({listMed = [], cobro}) => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <h4 className="mt-4">Medicamentos</h4>
            </div>

            {listMed.length === 0 ? (
                <p className="text-center">No hay medicamentos disponibles.</p>
            ) : (
                listMed.map((med, index) => (
                    <div key={index} className="border rounded p-4 mt-2 bg-white"> 
                        <h5 className="text-center mb-3">Medicamento {index + 1}</h5>
                        <div className="row">
                            <div className="col fw-bold">Codigo legal medicamento OSI:</div>
                            <div className="col">{safeValue(med.codLegMedicamento)}</div>
                            <div className="col fw-bold">Controlado:</div>
                            <div className="col">{safeValue(String(med.controlado))}</div>
                        </div>
                        <div className="row">
                            <div className="col fw-bold">Nombre medicamento OSI:</div>
                            <div className="col">{safeValue(med.nomMed)}</div>
                            <div className="col fw-bold">Cantidad Dispensada:</div>
                            <div className="col">{safeValue(med.cantDispensada)}</div>
                        </div>
                        <div className="row">
                            <div className="col fw-bold">Descripción Forma Farmaceutica:</div>
                            <div className="col">{safeValue(med.desFormFarmaceutica)}</div>
                            <div className="col fw-bold">Tipo Copago: </div>
                            <div className="col">{safeValue(med.tipoCopago)}</div>
                        </div>
                        <div className="row">
                            <div className="col fw-bold">Sucursal:</div>
                            <div className="col">{safeValue(med.sucursal)}</div>
                            <div className="col fw-bold">Cobro:</div>
                            <div className="col">{safeValue(cobro)}</div>
                        </div>
                        <div className="row">
                            <div className="col fw-bold">Código Producto:</div>
                            <div className="col">{safeValue(med.codProducto)}</div>
                            <div className="col fw-bold"></div>
                            <div className="col"></div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}