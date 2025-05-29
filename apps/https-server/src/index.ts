import type { Express } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import type { UserRequest } from "./types";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { userLoginSchema, userSignUpSchema } from "@repo/common/schema";
import { zod } from "@repo/common/zod";

const app: Express = express();

app.use(express.json());
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Hellow World",
  });
});

app.post("/login", (req, res) => {
  // DB call
  let loginData;
  try {
    loginData = userSignUpSchema.safeParse(req.body);
    if (!loginData.success) throw Error;
  } catch (error) {
    console.log("loginData: ", loginData);
    console.log("message: ", "Error with zod validation");
    console.log("error: ", loginData?.error);
    if (!loginData?.success) res.status(400).json({ errors: loginData?.error });
    else res.status(500).json({ error: "Internal Server Error" });
    return;
  }
  const token = jwt.sign({ userId: "123" }, JWT_TOKEN);
  res.json({
    messag: "User login",
    token: token,
  });
});

app.post("/signup", (req, res) => {
  let signupData;
  try {
    signupData = userSignUpSchema.safeParse(req.body);
    if (!signupData.success) throw Error;
  } catch (error) {
    console.log("signupData: ", signupData);
    console.log("message: ", "Error with zod validation");
    console.log("error: ", signupData?.error);
    if (!signupData?.success)
      res.status(400).json({ errors: signupData?.error });
    else res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  console.log("signupData: ", signupData);

  // DB call
  const token = jwt.sign({ userId: "123" }, JWT_TOKEN);
  res.status(200).json({
    messag: "User signup",
    token: token,
  });
  return;
});

app.post("/room", authMiddleware, (req: UserRequest, res) => {
  // DB call
  res.status(200).json({
    messag: `User join with userId, ${req.userId}`,
  });
});

const port = 8000;

app.listen(port, () => {
  console.log(`https-server running at port ${port}`);
});
