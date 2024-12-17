class WebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.retryCount = 0;
    this.maxRetries = 5;
    // Usar el puerto 3000 por defecto (ajústalo según tu backend)
    this.wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws';
  }

  connect() {
    try {
      console.log(`Attempting to connect to ${this.wsUrl}`);
      this.ws = new WebSocket(this.wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket Connected successfully');
        this.retryCount = 0; // Reset retry count on successful connection
        
        // Enviar información del usuario al conectarse
        const user = JSON.parse(sessionStorage.getItem("usuario"));
        if (user) {
          this.send({
            type: 'USER_CONNECTED',
            data: {
              userId: user.id,
              role: user.rol
            }
          });
        }
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (this.subscribers.has(data.type)) {
            this.subscribers.get(data.type).forEach(callback => callback(data));
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket Disconnected:', event.code, event.reason);
        if (this.retryCount < this.maxRetries) {
          const retryDelay = Math.min(1000 * Math.pow(2, this.retryCount), 10000);
          console.log(`Attempting to reconnect in ${retryDelay/1000} seconds...`);
          this.retryCount++;
          setTimeout(() => this.connect(), retryDelay);
        } else {
          console.error('Max reconnection attempts reached');
        }
      };
    } catch (error) {
      console.error('WebSocket Connection Error:', error);
      if (this.retryCount < this.maxRetries) {
        setTimeout(() => this.connect(), 5000);
      }
    }
  }

  subscribe(type, callback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type).add(callback);
  }

  unsubscribe(type, callback) {
    if (this.subscribers.has(type)) {
      this.subscribers.get(type).delete(callback);
    }
  }

  send(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
}

export const wsService = new WebSocketService();
