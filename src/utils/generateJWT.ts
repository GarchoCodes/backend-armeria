import jwt from "jsonwebtoken";

export const generateJWT = (id: string, rol: string) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
