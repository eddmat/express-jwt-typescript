import { Request, Response } from "express";

import Movie from "../models/movie";

export const create = async (req: Request, res: Response) => {
  const { name, country, releaseDate, directedBy, cast, genre } = req.body;

  try {
    const movie = await Movie.create({
      name,
      country,
      releaseDate,
      directedBy,
      cast,
      genre,
    });

    res.status(200).json({ movie, message: "Successfuly created movie" });
  } catch {
    res.status(500).send("Movie could not be created");
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();

    if (movies.length === 0) return res.status(204);

    res.status(200).json(movies);
  } catch {
    res.status(500).send("Could not retrieve movies");
  }
};

export const getAllBy = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
      .sort({
        genre: req.params.sortBy,
      })
      .where("genre", req.params.genre);

    if (movies.length === 0) return res.status(204);

    res.status(200).json(movies);
  } catch {
    res.status(500).send("Could not retrieve movies");
  }
};
