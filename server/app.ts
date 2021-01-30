import WebSocket from "../node_modules/@types/ws";
import { Request, Response } from "../node_modules/@types/express";

const ws = require("ws");
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const wss = new ws.Server({ port: process.env.WEBSOCKET_PORT });

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

// Express server for static client

const app = express();
const staticPort = 8080;

app.use("/static", express.static(path.resolve(__dirname, "..", "client")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

app.post("/ws", (req: Request, res: Response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  res.json({
    ws: `${process.env.WEBSOCKET_PROTOCOL}://${process.env.URL}:${process.env.WEBSOCKET_PORT}`,
  });
});

app.listen(staticPort, () => {
  console.log(`Static website istening at http://localhost:${staticPort}`);
});
