import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
const db = drizzle(process.env.DATABASE_URL || "");

export { users, rooms, chats } from "./db/schema";
