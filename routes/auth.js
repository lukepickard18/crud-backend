import { Router } from "express";
const router = Router();

import { register, login, logout } from "../controllers/auth.js";

router.route("/v1/register").post(register);
router.route("/v1/login").post(login);
router.route("/v1/logout").post(logout);

export default router;
