import WebSocket from "./node_modules/@types/ws";

const ws = require("ws");

const port = 4000;
const wss = new ws.Server({ port });

wss.on("connection", function connection(client: WebSocket) {
  // Client sends message to the server
  client.on("message", function incoming(message: unknown) {
    // ... server broadcasting the message to ALL connected clients
    wss.clients.forEach(function each(client: WebSocket) {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});
