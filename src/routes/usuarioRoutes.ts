import { Router } from "express";
import { crearUsuario, loginUsuario, listarUsuarios, eliminarUsuario, actualizarUsuario } from "../controllers/usuarioController";
import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/roles";

const router = Router();

router.post("/register", crearUsuario); // solo ADMIN crea usuarios
router.post("/login", loginUsuario);
router.get("/", authMiddleware, authorize(["ADMIN"]), listarUsuarios); // solo ADMIN lista usuarios
router.delete("/:id", authMiddleware, authorize(["ADMIN"]), eliminarUsuario); // solo ADMIN elimina usuarios
router.put("/:id", authMiddleware, authorize(["ADMIN"]), actualizarUsuario); // solo ADMIN aztualiza usuarios

export default router;
