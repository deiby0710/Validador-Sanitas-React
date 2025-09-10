import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Autorizacion } from '../pages/authorization'
import { PatientForm } from '../pages/PatientForm'
import { PatientSummary } from '../pages/PatientSummary'
import { MedicationDispense } from '../pages/MedicationDispense'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/*' element={<Navigate to='/' />}/>
            <Route path='/validador' element={<PatientForm/>}/>
            <Route path='/usuario' element={<PatientSummary/>} />
            <Route path='/autorizacion' element={<Autorizacion/>}/>
            <Route path='/medicationDispense' element={<MedicationDispense/>}/>
        </Routes>
    )
}