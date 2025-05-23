import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
  userId: string;
}

export interface UserRequest extends Request {
  userId: string;
}
