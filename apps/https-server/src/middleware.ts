import jwt, { JwtPayload } from "jsonwebtoken";
import { Payload } from "./types";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { db, eq, users } from "@repo/db/tables";

export const authMiddleware = async (req: any, res: any, next: any) => {
  // const token:string = req.headers["authorization"] || "";
  const token: string = req.headers.authorization || "";
  if (!token) {
    res.status(401).json({ error: "Unauthorized", message: "Token not found" });
    return;
  }
  const decoded = jwt.verify(token, JWT_TOKEN);
  if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
    const userId = (decoded as Payload).userId;
    if (!userId) throw new Error();

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) throw new Error();
    req.userId = userId;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
};
