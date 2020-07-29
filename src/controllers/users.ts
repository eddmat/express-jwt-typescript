import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw Error("User not found");
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, "yourSecretKey", {
      expiresIn: "1h",
    });

    res.json({
      user,
      token,
      message: "Successfuly logged in",
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated",
    });
  }
};
