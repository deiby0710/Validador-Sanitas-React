import React from "react";

export const RadioOptionList = ({ options, optionsCA, onChange, onContinue }) => {
    // Buscamos el scope (Nombre del plan) del contrato con el código de producto
    const getScopeFromCA = (codigoProducto) => {
        const match = optionsCA?.datosCA?.find(caItem => {
            const codigoCA = caItem.insurancePlan.identifier.find(i => i.type === "CODIGO_PRODUCTO")?.value;
            return codigoCA === codigoProducto;
        });
        return match?.contract?.scope || "N/A";
    }
    return (
        <div className="d-flex flex-column">
            <h3 className="mb-3">Resultados de la Consulta:</h3>
            {options
                // 🔹 Primero filtramos: solo dejamos los habilitados
                .filter(item => {
                    const estadoCodigo = item.coverage[0]?.status?.code || "N/A";
                    return estadoCodigo !== "NO HABILITADO";
                })
                .map((item, index) => {
                    const producto = item.insurancePlan.identifier.find(i => i.type === "NOMBRE_PRODUCTO")?.value || "N/A";
                    const familia = item.contract.identifier.find(i => i.type === "FAMILIA")?.value || "N/A";
                    const contrato = item.contract.identifier.find(i => i.type === "CONTRATO")?.value || "N/A";
                    const estadoCodigo = item.coverage[0]?.status?.code || "N/A";
                    const codigoProducto = item.insurancePlan.identifier.find(i => i.type === "CODIGO_PRODUCTO")?.value || "30";
                    const numUser = item.coverage[0]?.beneficiary?.identifier?.find(i => i.type === "NUM_USR")?.value || "";

                    const nombrePlan = getScopeFromCA(codigoProducto);
                    const valueRadio = `${producto} - Plan ${nombrePlan} - Contrato ${contrato} - Familia ${familia} - ${estadoCodigo}`;

                    return (
                        <div className="d-inline-flex radio-item mb-2" key={index}>
                            <input
                                type="radio"
                                name="opcionPlan"
                                value={valueRadio}
                                id={`opcion${index}`}
                                onChange={() => onChange(codigoProducto, numUser)}
                            />
                            <label htmlFor={`opcion${index}`} className="LabelRadioButton ms-2">
                                {valueRadio}
                            </label>
                        </div>
                    );
                })
            }

            <div className="my-3">
                <button className="btn btn-secondary" onClick={onContinue}>Continuar</button>
            </div>
        </div>
    );
};