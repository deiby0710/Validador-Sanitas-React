import { useState } from "react";
import { SearchToggle } from "./SearchToggle";
import { defaultAlert } from "../../utils/alert.js";

export const PatientSearchMD = ({onSearch}) => {
  const [searchMode, setSearchMode] = useState("authorization");
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [technology, setTechnology] = useState("");
  const [numAuthorization,setNumAuthorization] = useState("")

  const documentTypes = [
    { value: "CC", label: "Cédula de ciudadanía (CC)" },
    { value: "TI", label: "Tarjeta de identidad (TI)" },
    { value: "CE", label: "Cédula de extranjería (CE)" },
    { value: "MS", label: "Menor sin identificar (MS)" },
    { value: "NI", label: "N.I.T. (NI)" },
    { value: "NU", label: "Número único de identificación personal (NU)" },
    { value: "PA", label: "Pasaporte (PA)" },
    { value: "RC", label: "Registro civil (RC)" },
    { value: "CD", label: "Carné diplomático (CD)" },
    { value: "CN", label: "Certificado de nacido vivo (CN)" },
    { value: "SC", label: "Salvo conducto de permanencia (SC)" },
    { value: "PD", label: "Pasaporte de la ONU (PD)" },
    { value: "PE", label: "Permiso especial de permanencia (PE)" },
    { value: "AS", label: "Adulto sin identificar (AS)" },
    { value: "PT", label: "Permiso por protección temporal (PT)" },
  ];

  const technologyTypes = [
    { value: "M", label: "Medicamento"},
    { value: "P", label: "Procedimiento"},
    { value: "D", label: "Dispositivo"},
    { value: "N", label: "Producto Nutricional"},
    { value: "S", label: "Servicio Complemenetario"},
  ];

  const handleToggle = (mode) => {
    setSearchMode(mode);
    setDocNumber("");
    setDocType("");
    setTechnology("");
    setNumAuthorization("");
  };

  const handleButton = () => {
    if(searchMode==='authorization') {
      if(!numAuthorization.trim()){
        defaultAlert('warning','Campos incompletos','Digite el número de autorización.');
        return ;
      }
      onSearch({ numAutorizacion: numAuthorization });
    } else if (searchMode==='document') {
      if(!docType.trim()){
        defaultAlert('warning','Campos incompletos','Digite el tipo de identificación.');
        return ;
      }
      if(!docNumber.trim()){
        defaultAlert('warning','Campos incompletos','Digite el número de identificación.');
        return ;
      }
      if(!technology.trim()){
        defaultAlert('warning','Campos incompletos','Digite el tipo de tecnología.');
        return ;
      }
      onSearch({ tipoDocumento: docType, numeroIdentificacion: docNumber , tecnologia: technology});
    } else {
      console.log('error')
    }
  }

  return (
    <div className="container mt-4 p-4 border rounded shadow w-75 bg-white">
      <h4 className="mb-3 text-center">Consulta de afiliado</h4>

      <div className="row align-items-center">
        {/* Columna 1 - Toggle */}
        <div className="col-md-3 d-flex align-items-center flex-column">
          <label className="form-label">Búsqueda por:</label>
          <SearchToggle onToggle={handleToggle} />
        </div>

        {/* Columna 2 - Input */}
        <div className="col-md-9">
          {searchMode === "authorization" ? (
            <div>
              <label className="form-label">Número de autorización</label>
              <input
                type="text"
                className="form-control"
                value={numAuthorization}
                onChange={(e) => setNumAuthorization(e.target.value)}
                placeholder="Digite el número de autorización"
              />
            </div>
          ) : (
            <div className="d-flex gap-3">
              <div className="w-50">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  {documentTypes.map((doc) => (
                    <option key={doc.value} value={doc.value}>
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-grow-1">
                <label className="form-label">Número</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite número"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Tecnología</label>
                <select
                  className="form-select"
                  value={technology}
                  onChange={(e) => setTechnology(e.target.value)}
                >
                  <option value="">Seleccione una tecnología</option>
                  {technologyTypes.map((tipe) => (
                    <option key={tipe.value} value={tipe.value}>
                      {tipe.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row mt-3">
        {/* Columna 3 - Botón */}
        <div className="col-md-12 text-center">
          <button className="btn btn-dark w-25" onClick={handleButton}>
            Consultar
          </button>
        </div>
      </div>
    </div>

  );
};