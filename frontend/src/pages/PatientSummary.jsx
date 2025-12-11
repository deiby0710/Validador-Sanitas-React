import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserInfoGeneral } from "../components/PatientSummary/UserInfoGeneral";
import { PatientDetails } from "../components/PatientSummary/PatientDetails";
import { AuthorizationTable } from "../components/PatientSummary/AuthorizationTable";
import { TittleValidator } from "../components/PatientSummary/TittleValidator";
import { usePatientData } from "../hooks/usePatientData";
import { loadingAlert, closeAlert, defaultAlert } from "../utils/alert";
import { useSavePatientSanitas } from "../hooks/useSavePatientSanitas";
import { PrintFooter } from "../components/Print/PrintFooter";
import { BtnRevert } from "../components/PatientSummary/BtnRevert";

export const PatientSummary = () => {
    const location = useLocation();
    const { codigo, tipo, cedula, numUser } = location.state || {};
    const [fechaConsulta, setFechaConsulta] = useState("");

    const {data, loading, error} = usePatientData(tipo, cedula, codigo, numUser);
    useSavePatientSanitas(data, { enabled: !loading && !error });
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
        plan: `${data?.codigoPlan} ${data?.motivoEstado}`,
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

    const promptAutorizaciones = data?.autorizaciones; 

    const mockAutorizaciones = [
        {
            // CP: 1 CC: 14701450
            numero: "297914337", 
        },
        {
            // CP: 2 CC: 3108856
            numero: "297914334"
        },
        {
            numero: "297914351",
        },
        {
            numero: "297928504",
        },
        {
            numero: "297946372"
        },
        {
            numero: "297946371"
        }
    ];

    const handleConsultar = async (auth) => {
        const numero = auth.numero
        navigate("/autorizacion", {
            state: { numeroAutorizacion: numero }
        });
    }

    useEffect(() => {
        // Este efecto se ejecuta cada vez que cambia la ruta:
        return () => {
            // Si quieres hacer algo solo cuando sale de una ruta específica:
            closeAlert();
        }
    }, [location.pathname]);

    useEffect(() => {
        const ahora = new Date();
        const fecha = ahora.toLocaleString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        setFechaConsulta(fecha);
    }, []);
    
    return (
        <>
            <div className="container py-3">
                <TittleValidator/>
                <BtnRevert/>
                <UserInfoGeneral userGeneralData={promptGeneralData}/>
                <PatientDetails PatientDetailsData={promptDetails}/>
                <AuthorizationTable autorizaciones={promptAutorizaciones} onConsultar={handleConsultar}/>
            </div>
            <PrintFooter fechaConsulta={fechaConsulta}/>
        </>
    )
}