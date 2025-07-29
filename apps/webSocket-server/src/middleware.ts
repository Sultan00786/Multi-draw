import { JWT_TOKEN } from "@repo/backend-common/config";
import { db, eq, users } from "@repo/db/tables";
import { WsAuthRequest } from "./types";
import jwt from "jsonwebtoken";

export async function wsAuthCheck(req: WsAuthRequest): Promise<false | string> {
  try {
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
    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    });
    if (!user || !user.id) return false;
    return user.id;
  } catch (error) {
    console.log("error in wsAuthCheck", error);
    return false;
  }
}
