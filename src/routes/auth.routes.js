import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { signIn, tokenRefresh, logout } from "../controllers/auth.js";
const router = Router();

router.post("/userSignIn", signIn);
router.post("/tokenRefresh", tokenRefresh);
router.post("/logout", checkAuth, logout);

export default router;
