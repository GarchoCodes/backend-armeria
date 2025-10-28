import mongoose from "mongoose";

const armaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    tipo: { type: String },
    estado: { type: String, enum: ["NUEVO", "USADO"], default: "NUEVO" },
    creadorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
}, { timestamps: true });

export default mongoose.model("Arma", armaSchema);
