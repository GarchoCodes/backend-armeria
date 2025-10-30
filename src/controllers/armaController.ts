import type { Request, Response } from "express";
import Arma from "../models/arma";
import type { AuthRequest } from "../middleware/auth";

// Crear arma
export const crearArma = async (req: AuthRequest, res: Response) => {
    const { nombre, descripcion, tipo, estado } = req.body;
    try {
        const nuevaArma = await Arma.create({ nombre, descripcion, tipo, estado, creadorId: req.user!.id });
        res.status(201).json(nuevaArma);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todas las armas
export const listarArmas = async (_req: Request, res: Response) => {
    try {
        const armas = await Arma.find().populate("creadorId", "nombre rol");
        res.json(armas);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un arma por ID
export const obtenerArma = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const arma = await Arma.findById(id).populate("creadorId", "nombre rol");
        if (!arma) return res.status(404).json({ message: "Arma no encontrada" });
        return res.json(arma);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un arma
export const actualizarArma = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion, tipo, estado } = req.body;
    try {
        const arma = await Arma.findById(id);
        if (!arma) return res.status(404).json({ message: "Arma no encontrada" });

        if (arma.creadorId.toString() !== req.user!.id && req.user!.rol !== "ADMIN") {
            return res.status(403).json({ message: "No autorizado" });
        }

        arma.nombre = nombre ?? arma.nombre;
        arma.descripcion = descripcion ?? arma.descripcion;
        arma.tipo = tipo ?? arma.tipo;
        arma.estado = estado ?? arma.estado;

        const updated = await arma.save();
        return res.json(updated); // ✅ return agregado
    } catch (error: any) {
        return res.status(400).json({ message: error.message }); // ✅ return agregado
    }
};

// Eliminar un arma
export const eliminarArma = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        const arma = await Arma.findById(id);
        if (!arma) return res.status(404).json({ message: "Arma no encontrada" });

        if (arma.creadorId.toString() !== req.user!.id && req.user!.rol !== "ADMIN") {
            return res.status(403).json({ message: "No autorizado" });
        }

        await arma.deleteOne();
        return res.json({ message: "Arma eliminada correctamente" }); // ✅ return agregado
    } catch (error: any) {
        return res.status(500).json({ message: error.message }); // ✅ return agregado
    }
};


