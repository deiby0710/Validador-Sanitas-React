import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { validatePatientController, validatorPatientController, getPatientBasicDataController, copayAmount2Controller } from './patients.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js'

const router = Router();

// Obtener la ruta del directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.post("/validar", authMiddleware, validatePatientController);
router.post("/consultaAfiliado", authMiddleware, validatorPatientController);
router.get("/basicData", authMiddleware, getPatientBasicDataController);
router.post("/copago", authMiddleware, copayAmount2Controller);

export default router;