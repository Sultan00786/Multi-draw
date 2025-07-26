import { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
  userId: string;
}

export type WsAuthRequest = {
  url: string;
};
//
//export interface WebSocketRequest extends Request {
//  userId: string;
//}
