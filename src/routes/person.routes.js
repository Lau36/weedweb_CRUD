import { Router } from "express";
const router = Router();
import { createUserAndPerson, updatePerson } from "../controllers/person.js";
import { checkAuth } from "../middlewares/auth.js";

router.post("/person", createUserAndPerson);
router.put("/person/:id", checkAuth, updatePerson);

export default router;
