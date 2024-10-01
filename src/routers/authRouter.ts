import { Request, Response } from "express";
import AuthService from "../services/authService";
import { generateJWT } from "../utils/ganreteToken";

export async function register(req: Request, res: Response) {
  const { userName, password } = req.body;

  const newUser = await AuthService.register(userName, password);
  if (newUser) {
    const token = generateJWT(newUser);
    res.cookie("token", token, { httpOnly: true });
    res
      .status(201)
      .json({ message: "You have successfully registered", token });
  } else {
    res.status(400).json({ message: "user already exists" });
  }
}

export async function login(req: Request, res: Response) {
  const { userName, password } = req.body;

  const token = await AuthService.login(userName, password);
  if (token) {
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "You have successfully connected", token });
  } else {
    res.status(401).json({ message: "Incorrect username or password" });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ message: "You have successfully logged out" });
}
