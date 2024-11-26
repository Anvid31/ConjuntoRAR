import { Router } from "express";
import gastosService from "../services/gastosService.js";
import respuestas from "../utils/respuestas.js";

const router = Router();

router.post("/Gastos", (req, res) => {
  const gasto = req.body

  gastosService
    .crearGastos(gasto)
    .then((gasto) => {
      respuestas.exito(req, res, gasto , 201);

    })
    .catch((err) => {
      respuestas.error(req, res, err, "Error al Crear", 400);
      console.log(err);
    });
});

router.post("/Ventas", (req, res) => {
  const venta = req.body

  gastosService
    .crearVenta(venta)
    .then((venta) => {
      respuestas.exito(req, res, venta , 201);

    })
    .catch((err) => {
      respuestas.error(req, res, err, "Error al Crear", 400);
      console.log(err);
    });
});

router.get("/", async (req, res) => {
  gastosService
    .leerGastos()

    .then((Gastos) => {
      respuestas.exito(req, res, Gastos, 200);
    })

    .catch((err) => {
      respuestas.error(req, res, err, "Error al leer", 500);
    });
});

export default router;
