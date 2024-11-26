import mongoose from "mongoose";

const gastosSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  cantidad: Number,
  fecha: String,
});

const DispositivoModel = mongoose.model("Gastos", gastosSchema);
const DispositivoModelVenta = mongoose.model("Ventas", gastosSchema);

export { DispositivoModel, DispositivoModelVenta };
