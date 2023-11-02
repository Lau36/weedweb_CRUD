import { Router } from "express";
const router = Router();
import { createPerson, updatePerson } from "../controllers/person.js";
import { checkAuth } from "../middlewares/auth.js";

router.post("/users/api/person", createPerson);
router.put("/users/api/person/:id", checkAuth, updatePerson);

export default router;
