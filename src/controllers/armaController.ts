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

// Listar armas (todos los roles)
export const listarArmas = async (_req: Request, res: Response) => {
    try {
        const armas = await Arma.find().populate("creadorId", "nombre email");
        res.json(armas);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
