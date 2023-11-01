import { Router } from "express";
const router = Router();
import { createUserAndPerson, updatePerson } from "../controllers/person.js";
import { checkAuth } from "../middlewares/auth.js";

router.post("/users/api/person", createUserAndPerson);
router.put("/users/api/person/:id", checkAuth, updatePerson);

export default router;
