import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth";

export const authorize = (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.rol)) {
        res.status(403).json({ message: "No autorizado" });
        return;
    }
    next();
};
