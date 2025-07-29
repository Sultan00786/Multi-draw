import WebSocket, { WebSocketServer } from "ws";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { MessageEventData, WsAuthRequest } from "./types";
import { wsAuthCheck } from "./middleware";
import { db, eq, rooms } from "@repo/db/tables";

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

  user_socket_map.set(userId, { webSocket: ws, joinRooms: [] });

  ws.on("message", async (data: MessageEventData | string) => {
    let parseData;
    if (typeof data === "string") parseData = JSON.parse(data);
    else parseData = data;

    // on join_room
    if (parseData.type === "join_room") {
      try {
        const room = await db.query.rooms.findFirst({
          where: eq(rooms.id, parseData.roomId),
        });
        if (!room || !room.id) {
          console.log("Room does not exist");
          return;
        }
        const join_rooms = user_socket_map.get(userId)?.joinRooms;
        if (!join_rooms || join_rooms === undefined) {
          console.log("Unable to get join_rooms");
        }
        join_rooms?.push(room.id);
        console.log(`user: ${userId} has join_room = `, join_rooms);
      } catch (error) {
        console.log("error in join_room", error);
      }
    }
    console.log("Received message from client: ", parseData);
  });

  ws.on("error", console.error);

  ws.on("close", () => {});

  console.log("A new client is connected ", ws);
});
