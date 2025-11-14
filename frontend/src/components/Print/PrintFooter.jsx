export const PrintFooter = ({ fechaConsulta }) => {
    return (
        <div className="print-only d-none  print-footer">
            <div>
                Fuente: https://api.colsanitas.com/osi/api/assurance/affiliations/affiliationsAndNewsManagements/contract/v1.0.0/cover
            </div>

            <div>
                Consulta: {fechaConsulta}
            </div>
        </div>
    );
};