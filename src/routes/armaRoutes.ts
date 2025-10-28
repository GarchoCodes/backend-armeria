import { Router } from "express";
import { crearArma, listarArmas } from "../controllers/armaController";
import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/roles";

const router = Router();

router.post("/", authMiddleware, authorize(["ADMIN", "USER"]), crearArma);
router.get("/", listarArmas); // público

export default router;
