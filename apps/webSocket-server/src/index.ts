import WebSocket, { WebSocketServer } from "ws";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { WsAuthRequest } from "./types";
import { wsAuthCheck } from "./middleware";

const port = 8001;
const wss = new WebSocketServer({ port: port });
const user_socket_map: Map<
  // key:userId
  string,
  // value: obj
  {
    webSocket: WebSocket;
    joinRooms: string[];
  }
> = new Map();

wss.on("connection", async (ws, req: WsAuthRequest) => {
  const userId = await wsAuthCheck(req);
  if (!userId) {
    ws.close();
    return;
  }

  ws.on("error", console.error);

  ws.on("close", () => {});

  console.log("A new client is connected ", ws);
});
