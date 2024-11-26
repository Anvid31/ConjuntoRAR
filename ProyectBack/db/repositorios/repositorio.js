
const crear = async (Pelicula) => {
  try {
    const nuevaPelicula = new model({
      titulo: Pelicula.titulo,
      urlImagen: Pelicula.urlImagen,
      url: Pelicula.url
    });

    return await nuevaPelicula.save();
  } catch (error) {
    console.error('Error al crear la película:', error);
    throw error; // Lanza el error para que se maneje en otro lugar si es necesario
  }
}

const leer = async () => {
  try {
    return await model.find();
  } catch (error) {
    console.error('Error al leer las películas:', error);
    throw error; // Lanza el error para que se maneje en otro lugar si es necesario
  }
}

export default { crear, leer };

