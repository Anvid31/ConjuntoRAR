import Pija from '../models/model.js';
import { body, validationResult } from 'express-validator'; 

// Middleware para validar los datos
export const validarPelicula = [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('urlImagen').isURL().withMessage('La URL de la imagen debe ser válida'),
    body('url').isURL().withMessage('La URL debe ser válida'),
    body('gender').notEmpty().withMessage('El genero es obligatorio')
];

// Agregar una película
export async function agregar(req, res) {
    try {

        // Validar los datos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { titulo, urlImagen, url, gender } = req.body;

        // Verificar si la película ya existe
        const existingMovie = await Pija.findOne({ titulo });
        if (existingMovie) {
            return res.status(409).json({
                status: 'error',
                message: 'La película ya existe.'
            });
        }

        // Crear y guardar nueva película
        const movieToSave = new Pija({ titulo, urlImagen, url, gender });
        const movieSaved = await movieToSave.save();

        if (!movieSaved) {
            return res.status(400).json({
                status: 'error',
                message: 'Ocurrió un error al guardar la película'
            });
        }

        return res.status(201).json({
            status: 'success',
            message: 'Película agregada correctamente',
            movie: movieSaved
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error en el servidor'
        });
    }
}

// Leer todas las películas
export async function allMovies(req, res) {
    try {
        const peliculas = await Pija.find();
        res.status(200).json({
            status: 'success',
            peliculas
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener las películas'
        });
    }
}

// Eliminar una película por ID
export async function eliminarPelicula(req, res) {
    try {
      const { id } = req.params;
      
      const peliculaEliminada = await Pija.findByIdAndDelete(id); // Elimina la película por su ID
  
      if (!peliculaEliminada) {
        return res.status(404).json({
          status: "error",
          message: "La película no fue encontrada.",
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: "Película eliminada correctamente.",
      });
    } catch (error) {
      console.error("Error al eliminar la película:", error);
      return res.status(500).json({
        status: "error",
        message: "Ocurrió un error al eliminar la película.",
      });
    }
  }

// Editar una película por ID
export async function editarPelicula(req, res) {
    try {
        const { id } = req.params;
        const { titulo, urlImagen, url, gender } = req.body;

        // Validar los datos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Buscar y actualizar la película
        const movie = await Pija.findById(id);
        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Película no encontrada'
            });
        }

        movie.titulo = titulo || movie.titulo;
        movie.urlImagen = urlImagen || movie.urlImagen;
        movie.url = url || movie.url;
        movie.gender = gender || movie.gender;

        const movieUpdated = await movie.save();

        return res.status(200).json({
            status: 'success',
            message: 'Película actualizada correctamente',
            movie: movieUpdated
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la película'
        });
    }
}
