import { Router } from "express";
const router = Router();
import {
  createUserAndPerson,
  deletePerson,
  updatePerson,
} from "../controllers/person.js";

router.post("/person", createUserAndPerson);
router.put("/person/:id", updatePerson);
router.delete("/person/:id", deletePerson);

export default router;
