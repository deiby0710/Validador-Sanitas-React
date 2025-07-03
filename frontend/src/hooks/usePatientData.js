import { useEffect, useState } from "react";
import { consultaAfiliado, basicData } from "../services/patientService";

export const usePatientData = ({ tipo, cedula, codigo }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [afiliadoData, setAfiliadoData] = useState(null);
  const [datosBasicos, setDatosBasicos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Llamamos a ambos servicios en paralelo
        const [afiliado, basicos] = await Promise.all([
          consultaAfiliado(tipo, cedula, codigo),
          basicData(tipo, cedula),
        ]);

        setAfiliadoData(afiliado);
        setDatosBasicos(basicos);
        setError(null);
      } catch (err) {
        console.error("Error al obtener datos del paciente:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (tipo && cedula && codigo) {
      fetchData();
    }
  }, [tipo, cedula, codigo]);

  return {
    loading,
    error,
    afiliadoData,
    datosBasicos,
  };
};
