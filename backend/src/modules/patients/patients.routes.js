import { Router } from 'express';
import { 
    validatePatientController,
    validatorPatientController, 
    getPatientBasicDataController,
    // copayAmount2Controller,
    savePatientController
 } from './patients.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js'

const router = Router();

router.post("/validar", authMiddleware, validatePatientController);
router.post("/consultaAfiliado", authMiddleware, validatorPatientController);
router.get("/basicData", authMiddleware, getPatientBasicDataController);
// router.post("/copago", authMiddleware, copayAmount2Controller);
router.post("/guardarPaciente", authMiddleware, savePatientController);


export default router;