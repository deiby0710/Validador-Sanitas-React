import { login } from "./login.controller.js";
import { Router } from "express";

const router = Router()

router.post('/auth',login)

export default router