import bcrypt from "bcrypt";
import User from "../types/models/userModel";
import { generateJWT } from "../utils/ganreteToken";
import { getFileData, saveFileData } from "../config/getData";

export default class AuthService {
  public static async register(
    userName: string,
    password: string
  ): Promise<User | null> {
    try {
      const users: User[] = (await getFileData<User>("users")) || [];

      const userExists = users.find((u) => u.userName === userName);
      if (userExists) {
        return null;
      }

      const newUser = new User(userName);
      await newUser.hashPassword(password);
      users.push(newUser);

      await saveFileData<User>("users", users);
      return newUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public static async login(
    userName: string,
    password: string
  ): Promise<string | null> {
    try {
      const users: User[] = (await getFileData<User>("users")) || [];
      const user = users.find((u) => u.userName === userName);
      if (!user) {
        return null;
      }

      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        return generateJWT(user);
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
