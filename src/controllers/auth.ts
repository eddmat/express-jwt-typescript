import { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

/**
 * Models
 */
import User from "../models/user";

/**
 * Interfaces
 */
interface IUser {
  email: string;
  password: string;
}

const generateAccessToken = (user: IUser) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

/**
 * Create a new user with password
 */
export const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });

    res.json({
      user,
      message: "Successfully created user",
    });
  } catch {
    res.status(500).send("User could not be created");
  }
};

/**
 * Log in
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const hasCredentials = bcrypt.compareSync(password, user.password);

    if (!hasCredentials) {
      return res.status(401).send("Unauthenticated");
    }

    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      user,
      token,
      message: "Successfuly logged in",
    });
  } catch {
    res.status(500).send("Error. Could not log in");
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  if (refreshToken === null) {
    return res.status(401).send("No token was found in the parameters");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: JsonWebTokenError, user: IUser) => {
      if (err) return res.sendStatus(403);

      const accessToken = generateAccessToken({
        email: user.email,
        password: user.password,
      });

      return res.status(200).json({ accessToken: accessToken });
    }
  );
};
