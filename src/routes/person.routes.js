import { Router } from "express";
const router = Router();
import {
  createPerson,
  getAllPersons,
  deletePerson,
  updatePerson,
} from "../controllers/person.js";

router.post("/person", createPerson);
router.get("/persons", getAllPersons);
router.put("/person/:id", updatePerson);
router.delete("/person/:id", deletePerson);

export default router;
