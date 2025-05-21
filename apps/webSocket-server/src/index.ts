import { WebSocketServer } from "ws";

const port = 8001;
const wss = new WebSocketServer({ port: port });

wss.on("connection", (socket) => {
  console.log("A new client is connected ", socket);
});
