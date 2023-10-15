import { Router } from "express";
const router = Router();
import {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
  getUSER,
  signIn,
} from "../controllers/users.js";

router.post("/user", createUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUSER);
router.get("/user/:id", signIn);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
