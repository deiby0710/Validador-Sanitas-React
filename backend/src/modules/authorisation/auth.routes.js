import {  Router } from 'express'
import { consultAuthorisationController, consumirAuthController, copayAmount1Controller } from './auth.controller.js'
import authMiddleware from '../../middlewares/auth.middleware.js'
const router = Router()

router.post("/consultar",authMiddleware, consultAuthorisationController)
router.post("/consumir",authMiddleware, consumirAuthController)
router.post("/copago",authMiddleware, copayAmount1Controller)

export default router