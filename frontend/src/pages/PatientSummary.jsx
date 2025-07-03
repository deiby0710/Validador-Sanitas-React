import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { UserInfoGeneral } from "../components/PatientSummary/UserInfoGeneral";
import { PatientDetails } from "../components/PatientSummary/PatientDetails";
import { AuthorizationTable } from "../components/PatientSummary/AuthorizationTable";
import { basicData } from "../services/patientService";

export const PatientSummary = () => {
    const location = useLocation();
    const { codigo, tipo, cedula } = location.state || {};

    const [respuesta, setRespuesta] = useState(null);

    const mockDetails = {
        identificacionCotizante: "123456789",
        sgsss: "25",
        tipoAfilidado: "Cotizante",
        categoria: "A",
        desEstAuth: "Autorizado",
        tipoDocumentoContratante: "CC",
        vigencia: "2025-01-01 hasta 2025-12-31",
        motivoEstado: "Afiliación activa",
        };

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
    const mockAutorizaciones = [
        {
            numero: "297914350",
        },
        {
            numero: "297914357",
        },
        {
            numero: "297914361",
        }
    ];

    console.log(cedula)
    console.log(tipo)

    // useEffect(() => {
    //     const fetchAfiliado = async () => {
    //         try {
    //             const data = await basicData(tipo, cedula);
    //             console.log("✅ Respuesta del servicio:", data); // Imprimir en consola
    //             setRespuesta(data)
    //         } catch (error) {
    //             console.log("Error al consultar afiliado:", error);
    //         }
    //     };
    //     fetchAfiliado()
    // })

    const handleConsultar = async (auth) => {
        const numero = auth.numero
        console.log(numero)
    }
    
    return (
        <div className="container py-3">
            <UserInfoGeneral userGeneralData={mockGeneralData}/>
            <PatientDetails PatientDetailsData={mockDetails}/>
            <AuthorizationTable autorizaciones={mockAutorizaciones} onConsultar={handleConsultar}/>
        </div>
    )
}