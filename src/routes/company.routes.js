import { Router } from "express";
const router = Router();
import { createCompany, updateCompany } from "../controllers/company.js";
import { checkAuth } from "../middlewares/auth.js";

router.post("/users/api/company", createCompany);
router.put("/users/api/company/:id", checkAuth, updateCompany);

export default router;
