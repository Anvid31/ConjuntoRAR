import express from "express";
import { conexion } from "./db/conexion.js";
import routerPeliculas from "./routes/peliculas.routes.js";
import routerLoginRegistro from "./routes/LoginRegistro.routes.js"; 
import path from "path";
import generarPDFRouter from "./routes/GenerarPDF.routes.js"; 

// Conectar a la base de datos
(async () => {
  try {
    await conexion();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

// Inicializa express
const app = express();
const PORT = process.env.PORT ?? 4321;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(process.cwd(), 'public'))); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliza las rutas de películas
app.use("/api/peliculas", routerPeliculas);

// Utiliza las rutas de login y registro
app.use("/api/auth", routerLoginRegistro); 

// Ruta para generar PDF
app.use('/generar-pdf', generarPDFRouter); 

// Redirigir a /login.html
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.resolve('public/views/login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.resolve('public/views/register.html'));
});

// Ruta de películas
app.get('/peliculas.html', (req, res) => {
  res.sendFile(path.resolve('public/views/peliculas.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});