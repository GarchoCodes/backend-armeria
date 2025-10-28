import type { Request, Response } from "express";
import Usuario from "../models/usuario";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { generateJWT } from "../utils/generateJWT";
import bcrypt from "bcrypt";

// Crear nuevo usuario (ADMIN crea usuarios)
export const crearUsuario = async (req: Request, res: Response) => {
    const { nombre, password, rol } = req.body;
    try {
        const existe = await Usuario.findOne({ nombre });
        if (existe) {
            res.status(400).json({ message: "El nombre ya está registrado" });
            return;
        }
        const passwordHash = await hashPassword(password);
        const nuevoUsuario = new Usuario({ nombre, password: passwordHash, rol });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Login
export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ nombre });
        if (!usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        const isMatch = await comparePassword(password, usuario.password);
        if (!isMatch) {
            res.status(400).json({ message: "Contraseña incorrecta" });
            return;
        }

        const token = generateJWT(usuario._id.toString(), usuario.rol);
        res.json({ token, rol: usuario.rol });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Listar usuarios (solo ADMIN)
export const listarUsuarios = async (_req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find().select("-password");
        res.json(usuarios);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar usuarios (solo ADMIN)
export const eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar usuarios (solo ADMIN)
export const actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nombre, password, rol } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Actualizar solo los campos que se envían
        if (nombre) usuario.nombre = nombre;
        if (rol) usuario.rol = rol;

        // Si el usuario cambia la contraseña, la encriptamos antes
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            usuario.password = hashed;
        }

        await usuario.save();

        res.status(200).json({ message: "Usuario actualizado correctamente", usuario });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
