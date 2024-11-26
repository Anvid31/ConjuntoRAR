import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { conexion } from "./db/conexion.js";
import rutas from "./routes/rutas.js";
import http from "http";
import { setupSocket } from "./services/socketService.js";

dotenv.config();

var app = express();
const port = process.env.PORT;
const host = process.env.HOST;
const server = http.createServer(app);
setupSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
rutas(app);

conexion()
  .then(() => {
    server.listen(port, host, () => {
      console.log(`Escuchando por el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con DB", err);
    process.exit(1);
  });
