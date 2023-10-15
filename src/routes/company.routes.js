import { Router } from "express";
const router = Router();
import {
  createCompany,
  getAllCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
} from "../controllers/company.js";

router.post("/company", createCompany);
router.get("/companies", getAllCompanies);
router.get("/company/:id", getCompany);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);

export default router;
