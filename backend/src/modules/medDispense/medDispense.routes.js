import { Router } from 'express'
import { medicationDispenseById, medicationDispenseByAuthorization } from './medDispanse.controller.js'
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/identificacion", authMiddleware, medicationDispenseById);
router.post("/autorizacion", authMiddleware, medicationDispenseByAuthorization)

export default router;