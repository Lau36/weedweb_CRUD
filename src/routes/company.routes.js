import { Router } from "express";
const router = Router();
import {
  createCompany,
  getCompany,
  deleteCompany,
  updateCompany,
} from "../controllers/company.js";

router.get("/company", getCompany);
router.post("/company", createCompany);
router.put("/company/:id");
router.delete("/company/:id");
router.get("/company/:id");

export default router;
