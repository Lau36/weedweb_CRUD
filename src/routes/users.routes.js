import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
const router = Router();
import {
  createUsers,
  updateUser,
  getUsers,
  getUSER,
} from "../controllers/users.js";

router.post("/users/api", createUsers);
router.get("/users/api/:id", checkAuth, getUSER);
//router.get("/users/api/", getUsers);
router.put("/users/api/:id", checkAuth, updateUser);

export default router;
