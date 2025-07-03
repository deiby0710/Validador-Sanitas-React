import { Routes, Route, Navigate } from 'react-router-dom'
import { Autorizacion } from '../pages/authorization'
import { PatientForm } from '../pages/PatientForm'
import { PatientSummary } from '../pages/PatientSummary'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PatientForm/>}/>
            <Route path='/*' element={<Navigate to='/' />}/>
            <Route path='/usuario' element={<PatientSummary/>} />
            <Route path='/autorizacion' element={<Autorizacion/>}/>
        </Routes>
    )
}