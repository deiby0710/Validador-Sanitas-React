import React, { use, useState } from 'react';
import { SearchForm } from '../components/PatientSearch/SearchForm';
import { RadioOptionList } from '../components/PatientSearch/RadioOptionList';
import { defaultAlert } from '../utils/alert';
import { useNavigate } from 'react-router-dom';

export const PatientForm = () => {
    const [results, setResults] = useState(null);
    const [selected, setSelected] = useState("");
    
    const navigate = useNavigate();

    const handleRadioChange = (codigo) => {
        setSelected(codigo);
    }

    const handleContinue = () => {
        if(!selected){
            defaultAlert('warning', 'Campos incompletos', 'Tiene que seleccionar un Plan.')
            return;
        } else {
            const codigo = selected;
            navigate('/usuario',{
                state:{
                    codigo,
                    tipo: results.tipo,
                    cedula: results.cedula,
                }
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow" style={{ maxWidth: '900px' }}>
                <SearchForm onSearch={setResults} />
                {results && <RadioOptionList options={results.datos} onChange={handleRadioChange} onContinue={handleContinue}/>}
            </div>
        </div>
    );
};