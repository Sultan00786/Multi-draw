import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";

const port = 8001;
const wss = new WebSocketServer({ port: port });

wss.on("connection", (ws, req: { url: string }) => {
  const url = req.url.split("?")[1];
  const params = new URLSearchParams(url);
  const token = params.get("token");

  if (!token) {
    ws.close();
    return;
  }

  const decoded = jwt.verify(token, JWT_TOKEN);
  if (typeof decoded !== "object" || !decoded || !decoded.userId) {
    ws.close();
    return;
  }
  console.log("A new client is connected ", ws);
});
