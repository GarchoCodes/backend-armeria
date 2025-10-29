import { Router } from "express";
import { actualizarArma, crearArma, eliminarArma, listarArmas, obtenerArma } from "../controllers/armaController";
import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/roles";

const router = Router();

router.post("/", authMiddleware, authorize(["ADMIN", "USER"]), crearArma);
router.get("/", listarArmas); // público
router.get("/:id", obtenerArma);
router.put("/:id", authMiddleware, authorize(["ADMIN", "USER"]), actualizarArma);
router.delete("/:id", authMiddleware, authorize(["ADMIN", "USER"]), eliminarArma);

export default router;
