import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { signIn, tokenRefresh, logout } from "../controllers/auth.js";
const router = Router();

router.post("/users/api/SignIn", signIn);
router.post("/users/api/tokenRefresh", tokenRefresh);
// router.post("/users/api/tokenRefresh", checkAuth, tokenRefresh);
router.post("/users/api/logout", checkAuth, logout);

export default router;
