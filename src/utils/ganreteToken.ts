import jwt from "jsonwebtoken";
import User from "../types/models/userModel";

export function generateJWT(user: User): string {
  return jwt.sign(
    { id: user.id, userName: user.userName },
    process.env.SECRET_KAY as string,
    {
      expiresIn: "1h",
    }
  );
}

export function verifyJWT(token: string): object | string {
  try {
    return jwt.verify(token, process.env.SECRET_KAY as string);
  } catch (error) {
    throw new Error("Jwt eror");
  }
}
