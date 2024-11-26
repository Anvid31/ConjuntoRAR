import mongoose from "mongoose";
import { model } from "../models/model.js";

async function mostrarPelis() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ContenidoMas18");

    const peliculas = await model.find();

    return peliculas;
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    return [];
  } finally {
    await mongoose.connection.close();
  }
}
