import type { Express } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import type { UserRequest } from "./types";
import { JWT_TOKEN } from "@repo/backend-common/config";
import {
  createRoomSchema,
  userLoginSchema,
  userSignUpSchema,
} from "@repo/common/schema";
import { db, eq, users } from "@repo/db/tables";

const app: Express = express();

app.use(express.json());
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Hellow World",
  });
});

app.post("/login", async (req, res) => {
  try {
    const loginData = userLoginSchema.safeParse(req.body);
    console.log(loginData);
    if (!loginData?.success) {
      console.log(loginData);
      res.status(400).json({ errors: loginData?.error });
      return;
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, loginData.data.email));

    if (!user[0]) {
      res.status(400).json({ message: "User not found", data: user });
      return;
    }

    const token = jwt.sign({ userId: user[0].id }, JWT_TOKEN);
    res.json({
      messag: "User login",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Internal Server Error" });
    return;
  }
});

app.post("/signup", async (req, res) => {
  try {
    const signupData = userSignUpSchema.safeParse(req.body);
    if (!signupData.success) {
      console.log(signupData);
      res.status(400).json({ errors: signupData?.error });
      return;
    }

    console.log("signupData: ", signupData);

    const user = await db
      .insert(users)
      .values({
        email: signupData.data.email,
        password: signupData.data.password,
        photo: signupData.data.photo,
        name: signupData.data.name,
      })
      .returning();

    if (!user[0]?.id) {
      res
        .status(400)
        .json({ message: "Unable to signup the user", data: user });
      return;
    }
    // DB call
    const token = jwt.sign({ userId: user[0].id }, JWT_TOKEN);
    res.status(200).json({
      messag: "User signup",
      token: token,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

app.post("/room", authMiddleware, (req: UserRequest, res) => {
  // DB call

  let roomCreateData;
  try {
    roomCreateData = createRoomSchema.safeParse(req.body);
    if (!roomCreateData.success) throw Error;
  } catch (error) {
    console.log("roomCreateData: ", roomCreateData);
    console.log("message: ", "Error with zod validation");
    console.log("error: ", roomCreateData?.error);
    if (!roomCreateData?.success)
      res.status(400).json({ errors: roomCreateData?.error });
    else res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  console.log("zod data: ", roomCreateData);

  res.status(200).json({
    messag: `User join with userId, ${req.userId}`,
    roomId: roomCreateData.data.slug,
  });
});

const port = 8000;

app.listen(port, () => {
  console.log(`https-server running at port ${port}`);
});
