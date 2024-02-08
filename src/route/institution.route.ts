import { Router } from "express";

const router = Router();
import * as Controller from '../controller/institution.auth';
import { authenticateUser, UnauthorizePermission } from "../middleware/authenticateUser";

router.post("/institution/register", Controller.register)
router.post("/institution/login", Controller.login)
router.patch("/institution/reset-password", Controller.forgotPassword)
router.patch("/institution/input-password", authenticateUser, Controller.inputForgotPassword)


export default router;