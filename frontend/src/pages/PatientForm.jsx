import React, { useState, useEffect } from 'react';
import { SearchForm } from '../components/PatientSearch/SearchForm';
import { RadioOptionList } from '../components/PatientSearch/RadioOptionList';
import { defaultAlert } from '../utils/alert';
import { useNavigate } from 'react-router-dom';
import { closeAlert } from '../utils/alert';

export const PatientForm = () => {
    // CA => conver_ConsultaAfiliado
    const [results, setResults] = useState(null);
    const [resultsCA, setResultsCA] = useState(null)
    const [numberUser, setNumUser] = useState("")
    const [selected, setSelected] = useState("");
    
    const navigate = useNavigate();

    const handleRadioChange = (codigo, numUser) => {
        setNumUser(numUser)
        setSelected(codigo);
    }

    const handleContinue = () => {
        if(!selected){
            defaultAlert('warning', 'Campos incompletos', 'Tiene que seleccionar un Plan.')
            return;
        } else {
            const codigo = selected;
            const numUser = numberUser;
            navigate('/usuario',{
                state:{
                    codigo,
                    tipo: results.tipo,
                    cedula: results.cedula,
                    numUser,
                }
            });
        }
    };
    useEffect(() => {
        // Este efecto se ejecuta cada vez que cambia la ruta:
        return () => {
            // Si quieres hacer algo solo cuando sale de una ruta específica:
            closeAlert();
        }
    }, [location.pathname]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="pt-5 pb-4 ps-4 pe-4 border border-2 text-center rounded-3 bg-white shadow" style={{ maxWidth: '900px' }}>
                <SearchForm onSearch={setResults} onSearchCA={setResultsCA}/>
                {results && <RadioOptionList options={results.datos} onChange={handleRadioChange} optionsCA={resultsCA} onContinue={handleContinue}/>}
            </div>
        </div>
    );
};