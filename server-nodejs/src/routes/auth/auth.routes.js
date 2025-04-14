import { Router } from "express";
import { login, register, logout, refreshToken } from "../../controllers/auth.controller.js";
import { authenticate } from './../../middlewares/auth.js';

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", authenticate, logout);

router.get("/refresh-token", refreshToken);


export default router;