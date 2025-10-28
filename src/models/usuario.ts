import mongoose from "mongoose";

// Definimos el esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // password hasheado
    rol: { type: String, enum: ["ADMIN", "USER"], default: "USER" }
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
