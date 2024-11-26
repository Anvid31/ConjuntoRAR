import mongoose from 'mongoose';

// URL de conexión a la base de datos
const dBURL = 'mongodb+srv://ericksantiagoocampomarciales:LZLkgMO8pbX3qBNC@testing.do6qv.mongodb.net/?retryWrites=true&w=majority&appName=ContenidoMas18';

// Función de conexión a la base de datos
const conexion = async () => {
  try {
    // Conectar a la base de datos
    const db = await mongoose.connect(dBURL);
    console.log('Conexión exitosa a la base de datos', mongoose.connection.name);
    return db;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};


// Exportar la función de conexión
export { conexion }; 