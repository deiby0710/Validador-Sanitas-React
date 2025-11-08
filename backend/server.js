import express from 'express';
import cors from 'cors';
import patientsRoutes from './src/modules/patients/patients.routes.js';
import avicenaRoutes from './src/modules/avicena/avicena.routes.js';
import autorizacionesRoutes from './src/modules/authorisation/auth.routes.js'
import medicationDispense from './src/modules/medDispense/medDispense.routes.js'
import login from './src/modules/login/login.routes.js'
import { verifyTokenMiddleware } from './src/middlewares/login.middleware.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './config/db.js';

dotenv.config() // Cargamos las variables de entorno
await testConnection();
const port = process.env.PORT || 4000;

const app = express();
// -----------------
// Middlewares
// -----------------
app.use(cors()); // Permitir peticiones desde otros dominios
app.use(express.json()); // Habilitar recepción de JSON en las peticiones

// -----------------
// Rutas API
// -----------------
app.use('/api/pacientes', verifyTokenMiddleware, patientsRoutes);
app.use('/api/avicena', verifyTokenMiddleware, avicenaRoutes)
app.use('/api/autorizacion', verifyTokenMiddleware, autorizacionesRoutes)
app.use('/api/medicationDispense', verifyTokenMiddleware,medicationDispense)
app.use('/api/login', login)

// Prueba back end esta funcionando: http://localhost:4000/api/hello
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hola desde el backend!' });
});

// -----------------
// Servimos front end
// -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Redirigir cualquier ruta no-API al index.html
app.get('/hola', (req, res) => {
    console.log('Ubicacion del archivo: ', __dirname)
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// ------------------------------------------------------------------------
// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});