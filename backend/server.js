import express from 'express';
import cors from 'cors';
import patientsRoutes from './src/modules/patients/patients.routes.js';
import avicenaRoutes from './src/modules/avicena/avicena.routes.js';
import autorizacionesRoutes from './src/modules/authorisation/auth.routes.js'
import medicationDispense from './src/modules/medDispense/medDispense.routes.js'
import login from './src/modules/login/login.routes.js'
import { verifyTokenMiddleware } from './src/middlewares/login.middleware.js';
import dotenv from 'dotenv';

dotenv.config() // Cargamos las variables de entorno
const port = process.env.PORT;

const app = express();

// Middlewares
app.use(cors()); // Permitir peticiones desde otros dominios
app.use(express.json()); // Habilitar recepción de JSON en las peticiones

app.use('/api/pacientes', verifyTokenMiddleware, patientsRoutes);
app.use('/api/avicena', verifyTokenMiddleware, avicenaRoutes)
app.use('/api/autorizacion', verifyTokenMiddleware, autorizacionesRoutes)
app.use('/api/medicationDispense', verifyTokenMiddleware,medicationDispense)
app.use('/api/login', login)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});