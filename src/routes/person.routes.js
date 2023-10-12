import { Router } from "express";
const router = Router();

router.get("/person");
router.post("/person");
router.put("/person/:id");
router.delete("/person/:id");
router.get("/person/:id");

export default router;
