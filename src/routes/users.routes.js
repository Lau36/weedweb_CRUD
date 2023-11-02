import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
const router = Router();
import { createUsers, getUSER } from "../controllers/users.js";

router.post("/users/api", createUsers);
router.get("/users/api/:id", checkAuth, getUSER);

export default router;
