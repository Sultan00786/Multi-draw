import { string, z } from "zod";

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createRoomSchema = z.object({
  slug: string(),
});
