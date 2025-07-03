// PatientsSearch/RadioOptionList.jsx
import React from "react";

export const RadioOptionList = ({ options, selected, onChange, onContinue }) => {   
    return (
        <div className="d-flex flex-column">
            <h3 className="mb-3">Resultados de la Consulta:</h3>
            {options.map((item, index) => {
                const producto = item.insurancePlan.identifier.find(i => i.type === "NOMBRE_PRODUCTO")?.value || "N/A";
                const nombrePlan = item.contract.identifier.find(i => i.type === "NOMBRE_PLAN")?.value || "N/A";
                const familia = item.contract.identifier.find(i => i.type === "FAMILIA")?.value || "N/A";
                const contrato = item.contract.identifier.find(i => i.type === "CONTRATO")?.value || "N/A";
                const estadoCodigo = item.coverage[0]?.status?.code || "N/A";
                const codigoProducto = item.insurancePlan.identifier.find(i => i.type === "CODIGO_PRODUCTO")?.value || "30";

                const valueRadio = `${producto} - Plan ${nombrePlan} - Contrato ${contrato} - Familia ${familia} - ${estadoCodigo}`;

                return (
                    <div className="d-inline-flex radio-item mb-2" key={index}>
                        <input
                        type="radio"
                        name="opcionPlan"
                        value={valueRadio}
                        id={`opcion${index}`}
                        // checked={selected === codigoProducto}
                        onChange={() => onChange(codigoProducto)}
                        />
                        <label htmlFor={`opcion${index}`} className="LabelRadioButton ms-2">
                            {valueRadio}
                        </label>
                    </div>
                );
            })}
            <div className="my-3">
                <button className="btn btn-secondary" onClick={onContinue}>Continuar</button>
            </div>
        </div>
    );
};