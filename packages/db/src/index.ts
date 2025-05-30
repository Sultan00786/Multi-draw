import { drizzle } from "drizzle-orm/node-postgres";
import { users, rooms, chats } from "./db/schema";
import * as schema from "./db/schema";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

// bellow step is needed to get env variables which not required in case of prisma
import path from "path";
import { config } from "dotenv";
const envPath = path.resolve(__dirname, "../.env"); // adjust if needed
config({ path: envPath });

if (!process.env.DATABASE_URL) {
  console.log("env: ", process.env.DATABASE_URL);
  throw new Error("DATABASE_URL not found");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});

const db = drizzle(pool, { schema });
export { users, rooms, chats, db, eq };
