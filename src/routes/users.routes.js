import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
const router = Router();
import {
  createUsers,
  updateUser,
  deleteUser,
  getUSER,
} from "../controllers/users.js";

router.post("/user", createUsers);
router.get("/user", checkAuth, getUSER);
router.put("/user/:id", checkAuth, updateUser);
router.delete("/user/:id", checkAuth, deleteUser);

export default router;
