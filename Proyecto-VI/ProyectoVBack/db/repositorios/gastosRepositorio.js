import {
  DispositivoModel,
  DispositivoModelVenta,
} from "../../models/gastosModel.js";

const crear = async (Gastos) => {
  console.log(Gastos)
  const nuevoDispositivo = new DispositivoModel({
    nombre: Gastos.Nombre,
    descripcion: Gastos.Descripcion,
    cantidad: Gastos.Cantidad,
    fecha: Gastos.Fecha,
  });

  return await nuevoDispositivo.save();
};
const crearVenta = async (venta) => {
  const nuevoDispositivoV = new DispositivoModelVenta({
    nombre: venta.Nombre,
    descripcion: venta.Descripcion,
    cantidad: venta.Cantidad,
    fecha: venta.Fecha,
  });

  return await nuevoDispositivoV.save();
};

const leer = async () => {
  return await DispositivoModel.find();
};
const leerVentas = async () => {
  return await DispositivoModelVenta.find();
};

export default { crear, leer, crearVenta, leerVentas };
