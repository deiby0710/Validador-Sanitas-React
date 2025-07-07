import { useLocation, useNavigate } from "react-router-dom";
import { UserInfoGeneral } from "../components/PatientSummary/UserInfoGeneral";
import { PatientDetails } from "../components/PatientSummary/PatientDetails";
import { AuthorizationTable } from "../components/PatientSummary/AuthorizationTable";
import { usePatientData } from "../hooks/usePatientData";
import { loadingAlert, closeAlert, defaultAlert } from "../utils/alert";

export const PatientSummary = () => {
    const location = useLocation();
    const { codigo, tipo, cedula } = location.state || {};

    const {data, loading, error} = usePatientData(tipo, cedula, codigo);
    const navigate = useNavigate();

    if (loading){
        loadingAlert();
    } else {
        closeAlert();
    }

    if (error) {
        defaultAlert('error', "Error", error)
    }


    const mockGeneralData = {
        nombre: "Carlos Pérez",
        estado: "ACTIVO",
        correo: "carlos.perez@example.com",
        producto: "Plan Salud Total",
        tipoDocumento: "CC",
        fechaNacimiento: "1990-08-15",
        plan: "Especial Plus",
        numeroDocumento: "123456789",
        edad: "34",
        contrato: "CTO-102934",
        telefono: "3001234567",
        sexo: "M",
        familia: "Pérez-Gómez",
        segundoTelefono: "3017654321",
        numeroUsuario: "USU-987654"
        };
    const promptGeneralData = {
        nombre: data?.nombre,
        estado: data?.estado,
        correo: data?.correo,
        producto: `${data?.codigoProducto} ${data?.nombreProducto}`,
        tipoDocumento: data?.tipoDocumento,
        fechaNacimiento: data?.fechaNacimiento,
        plan: `${data?.codigoPlan} ${data?.nombrePlan}`,
        numeroDocumento: data?.numeroDocumento,
        edad: data?.edad,
        contrato: data?.contrato,
        telefono: data?.telefonoPrincipal,
        sexo: data?.genero,
        familia: data?.familia,
        segundoTelefono: data?.segundoTelefono,
        numeroUsuario: data?.numUsuario
        };

    const promptDetails = {
        identificacionCotizante: data?.numCotizante,
        sgsss: data?.sgsss,
        tipoAfiliado: data?.tipoAfiliado,
        categoria: data?.categoria,
        tipoDocumentoContratante: data?.tipoDocumentoContratante,
        motivoEstado: data?.motivoEstado
        };
    const mockDetails = {
        identificacionCotizante: "123456789",
        sgsss: "25",
        tipoAfiliado: "Cotizante",
        categoria: "A",
        tipoDocumentoContratante: "CC",
        motivoEstado: "Afiliación activa"
        };

    const mockAutorizaciones = [
        {
            numero: "297914338",
        },
        {
            numero: "297914351",
        },
        {
            numero: "297928504",
        }
    ];

    const handleConsultar = async (auth) => {
        const numero = auth.numero
        navigate("/autorizacion", {
            state: { numeroAutorizacion: numero }
        });
        console.log(auth)
    }
    
    return (
        <div className="container py-3">
            <UserInfoGeneral userGeneralData={promptGeneralData}/>
            <PatientDetails PatientDetailsData={promptDetails}/>
            <AuthorizationTable autorizaciones={mockAutorizaciones} onConsultar={handleConsultar}/>
        </div>
    )
}