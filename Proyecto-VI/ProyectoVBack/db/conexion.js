import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbURL = process.env.DBURL;

const conexion = async () => {
  try {
    const db = await mongoose.connect(dbURL);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
};

export { conexion };
