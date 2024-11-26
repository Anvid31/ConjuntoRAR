import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { agregar, allMovies, editarPelicula, eliminarPelicula, validarPelicula } from "../controllers/peliculas.js";

const router = Router();

router.post("/add", validarPelicula, agregar);          // Ruta para agregar una película con validación
router.get("/", allMovies);                            // Ruta para listar todas las películas
router.delete("/:id", eliminarPelicula);              // Ruta para eliminar una película por ID
router.put("/:id", validarPelicula, editarPelicula); // Ruta para editar una película por ID con validación


export default router;

