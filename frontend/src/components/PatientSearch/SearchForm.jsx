import React, { useState } from 'react'
import { validarPaciente } from '../../services/patientService';
import { defaultAlert, loadingAlert, closeAlert } from '../../utils/alert';

export const SearchForm = ({ onSearch }) => {
    const [tipo, setTipoId] = useState('');
    const [cedula, setDocumento] = useState('');

    const handleSubmit = async (e) => { // manejador del evento de envío del formulario. e=>event
        e.preventDefault(); // evita que la pagina se recargue 

        // Validamos que los campos no esten vacios
        if(!tipo || !cedula) {
            defaultAlert('warning','Campos incompletos', 'Por favor ingresa el tipo de documento y número de documento.')
            return;
        }
        loadingAlert()
        try { 
            const data = await validarPaciente(tipo, cedula); // Hacemos la peticion

            if (!data || !data.data || data.data.length === 0) {
                throw new Error('Paciente no encontrado.');
            }
            // Enviamos los resultados al componente padre
            onSearch({datos: data.data, tipo, cedula});
            closeAlert()
        } catch (error){
            closeAlert()
            defaultAlert('error', 'Error', error.message || 'Hubo un error al buscar el paciente.')
        }
    };

    return (
        <div>
            <h3 className="card-title mb-3">Validación - Búsqueda de Usuario</h3>
            <form onSubmit={handleSubmit} className="p-3">
                <div className="mb-1">
                    <label className="form-label">Tipo Identificación:</label>
                    <select className="form-select" value={tipo} onChange={(e)=> setTipoId(e.target.value)}>
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="CC">Cédula de ciudadanía (CC)</option>
                        <option value="TI">Tarjeta de identidad (TI)</option>
                        <option value="CE">Cédula de extranjería (CE)</option>
                        <option value="MS">Menor sin identificar (MS)</option>
                        <option value="NI">N.I.T. (NI)</option>
                        <option value="NU">Número único de identificación personal (NU)</option>
                        <option value="PA">Pasaporte (PA)</option>
                        <option value="RC">Registro civil (RC)</option>
                        <option value="CD">Carné diplomático (CD)</option>
                        <option value="CN">Certificado de nacido vivo (CN)</option>
                        <option value="SC">Salvo conducto de permanencia (SC)</option>
                        <option value="PD">Pasaporte de la ONU (PD)</option>
                        <option value="PE">Permiso especial de permanencia (PE)</option>
                        <option value="AS">Adulto sin identificar (AS)</option>
                        <option value="PT">Permiso por protección temporal (PT)</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Número de Documento:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={cedula}
                        onChange={(e) => {
                            const valor = e.target.value
                            if (/^\d*$/.test(valor)) {
                                setDocumento(valor)
                            }
                        }}
                        placeholder='Ingresa el número de Identificación'
                    />
                </div>
                <button type='submit' className="btn btn-secondary">Consultar</button>
            </form>
        </div>
    )
};