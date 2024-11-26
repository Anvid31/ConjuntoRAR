import { Router } from "express";
import PDFDocument from "pdfkit";
import Pelicula from "../models/model.js";
import axios from 'axios'; 

const router = Router();

router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find({}); 

    const doc = new PDFDocument({
      margins: { top: 72, bottom: 72, left: 72, right: 72 },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="peliculas.pdf"');
    doc.pipe(res);

    doc.font('Helvetica-Bold').fontSize(36).text('Catálogo de Películas', { align: 'center' });
    doc.moveDown(20); 

    for (const pelicula of peliculas) {
      doc.font('Helvetica-Bold').fontSize(24).text(pelicula.titulo);
      doc.moveDown(); 

      doc.fillColor('blue').fontSize(12).text(`Dónde ver: ${pelicula.url}`);

      // Eliminar doc.moveDown(20) de aquí

      try {
        const response = await axios.get(pelicula.urlImagen, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary'); 

        const maxWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const maxHeight = 300; 

        doc.image(imageBuffer, {  
          fit: [maxWidth, maxHeight], 
          align: 'center',  
          valign: 'top' 
        });

        // Eliminar doc.moveDown(20) de aquí
      } catch (error) {
        console.error(`Error al agregar la imagen ${pelicula.urlImagen}:`, error);
        doc.fillColor('red').fontSize(12).text(`Error al cargar la imagen: ${pelicula.urlImagen}`);
      }

      doc.addPage(); 
    }

    doc.end(); 

  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).send('Error al generar el PDF');
  }
});

export default router;