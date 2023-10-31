import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
const router = Router();
import {
  createUsers,
  updateUser,
  getUsers,
  getUSER,
} from "../controllers/users.js";

router.post("/user", createUsers);
router.get("/user/:id", checkAuth, getUSER);
router.get("/users", getUsers);
router.put("/user/:id", checkAuth, updateUser);

export default router;
