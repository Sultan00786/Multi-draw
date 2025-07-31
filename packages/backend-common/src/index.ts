import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../.env"); // adjust if needed
config({ path: envPath });

export const JWT_TOKEN = process.env.JWT_TOKEN || "JWT_TOKEN";
export const DATABASE_URL = process.env.DATABASE_URL || null;
