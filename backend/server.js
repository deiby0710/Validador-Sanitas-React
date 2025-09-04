import express from 'express';
import cors from 'cors';
import patientsRoutes from './src/modules/patients/patients.routes.js';
import avicenaRoutes from './src/modules/avicena/avicena.routes.js';
import autorizacionesRoutes from './src/modules/authorisation/auth.routes.js'
import medicationDispense from './src/modules/medDispense/medDispense.routes.js'
import dotenv from 'dotenv';

dotenv.config() // Cargamos las variables de entorno
const port = process.env.PORT;

const app = express();

// Middlewares
app.use(cors()); // Permitir peticiones desde otros dominios
app.use(express.json()); // Habilitar recepción de JSON en las peticiones

app.use('/api/pacientes', patientsRoutes);
app.use('/api/avicena', avicenaRoutes)
app.use('/api/autorizacion',autorizacionesRoutes)
app.use('/api/medicationDispense', medicationDispense)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});