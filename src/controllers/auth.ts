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

const secretAccess = process.env.ACCESS_JWT_SECRET;
const secretRefresh = process.env.REFRESH_JWT_SECRET;

const generateAccessToken = (user: IUser) => {
  try {
    return jwt.sign(user, secretAccess, { expiresIn: "30s" });
  } catch {
    throw Error("Could not generate a new access token");
  }
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
      return res.status(401).send("Wrong credentials");
    }

    const accessToken = generateAccessToken({
      email,
      password,
    });

    const refreshToken = jwt.sign({ email, password }, secretRefresh);

    return res.status(200).json({
      user,
      accessToken,
      refreshToken,
      message: "Successfuly logged in",
    });
  } catch {
    res.status(500).send("Error. Could not log in");
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  jwt.verify(
    refreshToken,
    secretRefresh,
    (err: JsonWebTokenError, user: IUser) => {
      if (err) return res.status(403).json(err);

      const accessToken = generateAccessToken({
        email: user.email,
        password: user.password,
      });

      res.status(200).json({ accessToken });
    }
  );
};
