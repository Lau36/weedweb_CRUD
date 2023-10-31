import { Router } from "express";
const router = Router();
import {
  createCompany,
  deleteCompany,
  updateCompany,
} from "../controllers/company.js";
import { checkAuth } from "../middlewares/auth.js";

router.post("/company", createCompany);
router.put("/company/:id", checkAuth, updateCompany);

export default router;
