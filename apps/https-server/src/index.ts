import type { Express } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "./config";
import { authMiddleware } from "./middleware";
import type { UserRequest } from "./types";

const app: Express = express();
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Hellow World",
  });
});

app.post("/login", (req, res) => {
  // DB call
  const token = jwt.sign({ userId: "123" }, JWT_TOKEN);
  res.json({
    messag: "User login",
    token: token,
  });
});

app.post("/signup", (req, res) => {
  // DB call
  const token = jwt.sign({ userId: "123" }, JWT_TOKEN);
  res.status(200).json({
    messag: "User signup",
    token: token,
  });
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
