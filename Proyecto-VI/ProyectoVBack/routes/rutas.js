import control from "../controllers/gastosController.js";

const rutas = (app) => {
  app.use("/", control);
};

export default rutas;
