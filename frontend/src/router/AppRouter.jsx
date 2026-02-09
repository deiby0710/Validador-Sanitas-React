import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Autorizacion } from '../pages/Authorization'
import { PatientForm } from '../pages/PatientForm'
import { PatientSummary } from '../pages/PatientSummary'
import { MedicationDispense } from '../pages/MedicationDispense'
import { ConsultAuth } from '../pages/ConsultAuth'
import { Home } from '../pages/Home'
import { Layout } from '../components/Layout/Layout'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { PublicLayout } from '../components/Layout/PublicLayout'

export const AppRouter = () => {
    return (
        <Routes>
            {/* RUTA PUBLICA */}
            <Route element={
                <PublicRoute>
                    <PublicLayout />
                </PublicRoute>
            }>
                <Route path="/login" element={<Login />} />
            </Route>
            {/* RUTAS PRIVADAS */}
            <Route element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
                }>
                <Route path='/validador' element={<PatientForm/>}/>
                <Route path='/usuario' element={<PatientSummary/>} />
                <Route path='/autorizacion' element={<Autorizacion/>}/>
                <Route path='/medicationDispense' element={<MedicationDispense/>}/>
                <Route path='/consultAuth' element={<ConsultAuth/>}/>
                <Route path='/' element={<Home/>}/>
            </Route>

            {/* CATCH ALL */}
            <Route path='/*' element={<Navigate to='/' />}/>
        </Routes>
    )
}