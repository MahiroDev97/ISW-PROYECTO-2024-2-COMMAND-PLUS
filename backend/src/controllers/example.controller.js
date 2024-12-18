import WebSocketManager from "../websocket/WebSocketManager.js";

const wsManager = new WebSocketManager();

// Ejemplo de uso en un controlador
export const notifyWaiters = (req, res) => {
  wsManager.notifyWaiters({
    title: "Nueva Notificación",
    message: "Mesa 5 necesita atención",
    timestamp: new Date().toISOString()
  });
  
  res.json({ message: "Notificación enviada a los garzones" });
};
