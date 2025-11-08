import { useEffect } from "react";
import { savePatientSanitas } from "../services/patientService";

export const useSavePatientSanitas = (data, { enabled = true } = {}) => {
  useEffect(() => {
    if (!enabled || !data) return;

    // Campos clave para identificar al paciente
    if (!data.tipoDocumento || !data.numeroDocumento) return;

    const enviar = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");

        const payload = {
          nombre_completo: data.nombre,
          compania: `${data.codigoProducto} ${data.nombreProducto}`,
          plan: `${data.codigoPlan} ${data.motivoEstado}`,
          contrato: data.contrato,
          familia: data.familia,
          numero_usuario: data.numUsuario,
          estado: data.estado,
          tipo_documento: data.tipoDocumento,
          numero_documento: data.numeroDocumento,
          telefono_principal: data.telefonoPrincipal,
          segundo_telefono: data.segundoTelefono,
          correo: data.correo,
          fecha_nacimiento: data.fechaNacimiento, // "2001-02-02"
          sexo: data.genero,
          consultado_por: user?.username || user?.email || undefined,
        };

        const { ok, error } = await savePatientSanitas(payload);
        if (!ok) {
          // solo log; nada en UI
          console.error("No se pudo guardar/actualizar el paciente:", error);
        }
      } catch (err) {
        console.error("Error inesperado guardando paciente Sanitas:", err);
      }
    };

    enviar();
  }, [data, enabled]);
};