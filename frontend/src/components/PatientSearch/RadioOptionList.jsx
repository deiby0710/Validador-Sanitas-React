// PatientsSearch/RadioOptionList.jsx
import React from "react";

export const RadioOptionList = ({ options, optionsCA, onChange, onContinue }) => {
    console.log(optionsCA)
    // Buscamos el scope (Nombre del plan) del contrato con el codigo de producto
    const getScopeFromCA = (codigoProducto) => {
        const match = optionsCA?.datosCA?.find(caItem => {
            console.log("Items: ... ", caItem)
            const codigoCA = caItem.insurancePlan.identifier.find(i => i.type === "CODIGO_PRODUCTO")?.value;
            return codigoCA === codigoProducto;
        });
        return match?.contract?.scope || "N/A";
    }
    return (
        <div className="d-flex flex-column">
            <h3 className="mb-3">Resultados de la Consulta:</h3>
            {options.map((item, index) => {
                const producto = item.insurancePlan.identifier.find(i => i.type === "NOMBRE_PRODUCTO")?.value || "N/A";
                const familia = item.contract.identifier.find(i => i.type === "FAMILIA")?.value || "N/A";
                const contrato = item.contract.identifier.find(i => i.type === "CONTRATO")?.value || "N/A";
                const estadoCodigo = item.coverage[0]?.status?.code || "N/A";
                const codigoProducto = item.insurancePlan.identifier.find(i => i.type === "CODIGO_PRODUCTO")?.value || "30";
                const numUser = item.coverage[0]?.beneficiary?.identifier?.find(i => i.type ==="NUM_USR")?.value || "";

                const nombrePlan = getScopeFromCA(codigoProducto)
                console.log("El codigo del producto es: ", codigoProducto, "|| El nombre del plan es: ", nombrePlan)

                const valueRadio = `${producto} - Plan ${nombrePlan} - Contrato ${contrato} - Familia ${familia} - ${estadoCodigo}`;

                const isDisabled = estadoCodigo === "NO HABILITADO"

                return (
                    <div className="d-inline-flex radio-item mb-2" key={index}>
                        <input
                        type="radio"
                        name="opcionPlan"
                        value={valueRadio}
                        id={`opcion${index}`}
                        onChange={() => onChange(codigoProducto, numUser)}
                        disabled={isDisabled}
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