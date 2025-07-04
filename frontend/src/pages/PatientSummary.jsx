import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { UserInfoGeneral } from "../components/PatientSummary/UserInfoGeneral";
import { PatientDetails } from "../components/PatientSummary/PatientDetails";
import { AuthorizationTable } from "../components/PatientSummary/AuthorizationTable";
import { basicData } from "../services/patientService";
import { usePatientData } from "../hooks/usePatientData";
import { loadingAlert, closeAlert, defaultAlert } from "../utils/alert";

export const PatientSummary = () => {
    const location = useLocation();
    const { codigo, tipo, cedula } = location.state || {};

    const {data, loading, error} = usePatientData('CC', '1193473974', '');

    if (loading){
        loadingAlert();
    } else {
        closeAlert();
    }

    if (error) {
        defaultAlert('error', "Error", error)
    }

    if (!data) {
        defaultAlert('info','Alerta!', 'No se encontró información del usuario.')
    }

    const detailsProps = {
        identificacionCotizante: data.numCotizante,
        sgsss: data.sgsss,
        tipoAfilidado: data.tipoAfilidado,
        categoria: data.categoria,
        desEstAuth: data.estado,
        tipoDocumentoContratante: data.tipoDocumentoContratante,
        motivoEstado: data.motivoEstado
    };

    const generalDataProps = {
        nombre: data.nombre,
        estado: data.estado,
        correo: data.correo,
        producto: data.nombreProducto,
        tipoDocumento: data.tipoDocumento,
        fechaNacimiento: data.fechaNacimiento,
        plan: data.nombrePlan,
        numeroDocumento: data.numeroDocumento,
        edad: data.edad,
        contrato: data.contrato,
        telefono: data.telefonoPrincipal,
        sexo: data.sexo,
        familia: data.familia,
        segundoTelefono: data.segundoTelefono,
        numeroUsuario: data.numUsuario
    };

    const autorizaciones = data.autorizaciones || [];


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