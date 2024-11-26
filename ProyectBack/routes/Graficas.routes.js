
router.get('/datos-grafica', async (req, res) => {
    try {
      // Obtener la cantidad de películas por género de la base de datos
      const cantidadPorGenero = await Pelicula.aggregate([
        // ... tu lógica para agrupar por género y contar ...
      ]).toArray();
  
      // Formatear los datos para Chart.js
      const labels = cantidadPorGenero.map(item => item._id);
      const data = cantidadPorGenero.map(item => item.count);
  
      res.json({ labels, data });
    } catch (error) {
      console.error('Error al obtener los datos para la gráfica:', error);
      res.status(500).send('Error al obtener los datos');
    }
  });   