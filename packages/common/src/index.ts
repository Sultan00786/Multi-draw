import { string, z } from "zod";

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3).optional(),
  photo: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createRoomSchema = z.object({
  slug: string().min(1),
  adminId: string().ulid(),
});
