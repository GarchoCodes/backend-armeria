import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: string; rol: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "claveSecreta") as { id: string, rol: string };
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
};
