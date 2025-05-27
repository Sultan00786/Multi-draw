import jwt, { JwtPayload } from "jsonwebtoken";
import { Payload } from "./types";
import { JWT_TOKEN } from "@repo/backend-common/config";

export const authMiddleware = async (req: any, res: any, next: any) => {
  // const token:string = req.headers["authorization"] || "";
  const token: string = req.headers.authorization || "";
  const decoded = jwt.verify(token, JWT_TOKEN);
  if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
    req.userId = (decoded as Payload).userId;
    next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
