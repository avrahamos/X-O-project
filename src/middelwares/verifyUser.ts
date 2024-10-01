import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/ganreteToken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Access Denied. No Token" });
  }

  try {
    const decoded = verifyJWT(token);
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
