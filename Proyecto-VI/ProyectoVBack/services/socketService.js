import { Server } from "socket.io";
import gastosService from "./gastosService.js";
 

const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "http://localhost:4200" } });

  io.on("connection", (socket) => {
    console.log("Usuario Conectado", socket.id);

    const sendGeoData = async () => {
      const gastos = await gastosService.leerGastos()
      const ventas = await gastosService.leerVentas()

      const data = {
        gasto : gastos,
        venta : ventas
      }

      socket.emit('data', data);
    };

    const interval = setInterval(sendGeoData, 200);

    socket.on("disconnect", (reason) => {
      clearInterval(interval);
      console.log("Cliente Desconectado", reason);
    });
  });
};

export { setupSocket };
