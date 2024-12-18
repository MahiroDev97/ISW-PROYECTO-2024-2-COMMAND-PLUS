class WebSocketManager {
  constructor() {
    this.connections = new Map(); // Map to store connections by userId
    this.roleConnections = new Map(); // Map to store connections by role
  }

  handleConnection(ws) {
    ws.on("message", (message) => this.handleMessage(ws, message));
    ws.on("close", () => this.handleDisconnect(ws));
  }

  handleMessage(ws, message) {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case "USER_CONNECTED":
          this.registerUser(ws, data.data);
          break;
        case "PRODUCT_STATUS_UPDATE":
          // Notificar a los cocineros, garzones y administradores
          this.broadcastToRole(["cocinero", "garzon", "administrador"], {
            type: "PRODUCT_STATUS_UPDATE",
            data: {
              ...data.data,
              notification: {
                title: "Actualización de Producto",
                message: `Mesa ${data.data.mesa}: ${data.data.productName} cambió de ${data.data.oldStatus} a ${data.data.newStatus} por ${data.data.updatedBy}`
              }
            }
          });
          break;
        case "COMANDA_UPDATE":
          this.broadcastToRole(["cocinero", "garzon", "administrador"], data);
          break;
        case "COMANDA_READY":
          this.broadcastToRole(["cocinero", "garzon", "administrador"], {
            type: "COMANDA_READY",
            data: {
              ...data.data,
              notification: {
                title: "Comanda Lista",
                message: `¡Comanda de Mesa ${data.data.mesa} lista para servir!`
              }
            }
          }); 
          
          break;
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  registerUser(ws, userData) {
    if (userData.userId) {
      this.connections.set(userData.userId, ws);
      
      // Register by role
      if (userData.role) {
        if (!this.roleConnections.has(userData.role)) {
          this.roleConnections.set(userData.role, new Set());
        }
        this.roleConnections.get(userData.role).add(ws);
      }
    }
  }

  handleDisconnect(ws) {
    // Remove from connections
    for (const [userId, conn] of this.connections.entries()) {
      if (conn === ws) {
        this.connections.delete(userId);
        break;
      }
    }

    // Remove from role connections
    for (const connections of this.roleConnections.values()) {
      connections.delete(ws);
    }
  }

  broadcastToRole(roles, data) {
    const sentTo = new Set();
    
    roles.forEach(role => {
      const connections = this.roleConnections.get(role);
      if (connections) {
        connections.forEach(ws => {
          if (!sentTo.has(ws) && ws.readyState === 1) { // WebSocket.OPEN
            ws.send(JSON.stringify(data));
            sentTo.add(ws);
          }
        });
      }
    });
  }

  // Agregar este nuevo método
  notifyWaiters(message) {
    this.broadcastToRole(["garzon"], {
      type: "WAITER_NOTIFICATION",
      data: message
    });
  }

  notifyComandaReady(comandaData) {
    this.broadcastToRole(["garzon", "administrador"], {
      type: "COMANDA_READY",
      data: {
        comandaId: comandaData.comandaId,
        mesa: comandaData.mesa,
        timestamp: new Date().toISOString()
      }
    });
  }
}

export default WebSocketManager;
