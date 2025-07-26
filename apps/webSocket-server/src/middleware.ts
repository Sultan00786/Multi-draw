import { JWT_TOKEN } from "@repo/backend-common/config";
import { WsAuthRequest } from "./types";
import jwt from "jsonwebtoken";

export function wsAuthCheck(req: WsAuthRequest) {
  const url = req.url.split("?")[1];
  const params = new URLSearchParams(url);
  const token = params.get("token");
  if (!token) {
    return false;
  }

  const decoded = jwt.verify(token, JWT_TOKEN);
  if (typeof decoded !== "object" || !decoded || !decoded.userId) {
    return false;
  }
  return true;
}
