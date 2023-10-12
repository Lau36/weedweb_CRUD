import { Router } from "express";
const router = Router();

router.get("/company");
router.post("/company");
router.put("/company/:id");
router.delete("/company/:id");
router.get("/company/:id");

export default router;
