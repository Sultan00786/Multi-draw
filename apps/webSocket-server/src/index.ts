import { WebSocketServer } from "ws";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { WsAuthRequest } from "./types";
import { wsAuthCheck } from "./middleware";

const port = 8001;
const wss = new WebSocketServer({ port: port });

wss.on("connection", (ws, req: WsAuthRequest) => {
  const isAuthenticated = wsAuthCheck(req);
  if (!isAuthenticated) {
    ws.close();
    return;
  }

  console.log("A new client is connected ", ws);
});
