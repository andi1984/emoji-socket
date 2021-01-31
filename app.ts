import WebSocket from "./node_modules/@types/ws";
import { Request, Response } from "./node_modules/@types/express";

const ws = require("ws");
const express = require("express");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

// Express server for static client

const server = express()
  .use(express.static("static"))
  .use((req: Request, res: Response) =>
    res.sendFile(INDEX, { root: __dirname })
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new ws.Server({ server });

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
