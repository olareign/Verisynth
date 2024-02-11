import { Router } from "express";

const router = Router();
import * as Controller from '../controller/credentials.auth';
import { authenticateUser, UnauthorizePermission } from "../middleware/authenticateUser";

router.patch("/verify/credential", Controller.verifyCredential)
router.patch("/institution/upload/credential", authenticateUser, Controller.uploadCredentialFile)



export default router;