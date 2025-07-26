import { serial, uuid, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }),
  photo: varchar({ length: 225 }),
});

export const rooms = pgTable("rooms", {
  id: uuid().primaryKey().defaultRandom(),
  slug: varchar({ length: 255 }).unique().notNull(),
  adminId: uuid()
    .notNull()
    .references(() => users.id),
  createAt: timestamp("createAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  message: varchar({ length: 255 }).notNull(),
  roomid: uuid()
    .notNull()
    .references(() => rooms.id),
  userid: uuid()
    .notNull()
    .references(() => users.id),
});
