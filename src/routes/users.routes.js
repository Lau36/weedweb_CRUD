import { Router } from "express";
const router = Router();
import {
  createUsers,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";

router.post("/users/create", createUsers);
router.get("/users/getAll", getUsers);
router.get("/users/get/:id", getUser);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id");

export default router;
