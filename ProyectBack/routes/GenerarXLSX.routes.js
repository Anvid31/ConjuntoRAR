import { Router } from "express";
import Pelicula from "../models/model.js";
import * as XLSX from "xlsx";

const router = Router();
router.get("/", async (req, res) => {
  try {
    // Ejecutar la consulta para obtener todas las películas
    const peliculas = await Pelicula.find({}).exec();

    // Verificar que `peliculas` es un arreglo
    if (!Array.isArray(peliculas)) {
      console.error("Error: El dato pasado a exportToExcel no es un arreglo.");
      res.status(400).send("Error: Los datos proporcionados no son válidos.");
      return;
    }

    // Llama a la función para exportar los datos
    exportToExcel(peliculas, "peliculas.xlsx");

    res.download("peliculas.xlsx", "peliculas.xlsx", (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
        res.status(500).send("Error al descargar el archivo Excel.");
      }
    });
  } catch (error) {
    console.error("Error al generar el Excel:", error);
    res.status(500).send("Error al generar el Excel.");
  }
});

// Función para exportar a Excel
const exportToExcel = (data, filename = "exported_data.xlsx") => {
  // Convierte cada documento Mongoose a un objeto JavaScript estándar
  const cleanData = data.map(doc => doc.toObject());

  // Asegúrate de aplanar los datos si hay estructuras complejas
  const flattenedData = cleanData.map(doc => {
    const flatDoc = {};
    for (const key in doc) {
      if (typeof doc[key] !== 'object' || doc[key] === null) {
        flatDoc[key] = doc[key];
      } else {
        flatDoc[key] = JSON.stringify(doc[key]);
      }
    }
    return flatDoc;
  });

  // Crea una hoja de trabajo (worksheet) a partir de los datos
  const worksheet = XLSX.utils.json_to_sheet(flattenedData);

  // Crea un libro de trabajo (workbook) que contiene la hoja de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Genera el archivo Excel y lo guarda
  XLSX.writeFile(workbook, filename);
};

export default router;