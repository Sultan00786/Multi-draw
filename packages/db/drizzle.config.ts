import type { Config } from "drizzle-kit";

export default {
  schema: "./dist/src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  strict: true,
} satisfies Config;
