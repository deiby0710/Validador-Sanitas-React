import { Router } from 'express'
import { medicationDispenseById } from './medDispanse.controller.js'
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/identificacion", authMiddleware, medicationDispenseById);

export default router;