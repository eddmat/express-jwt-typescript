import { Request, Response } from "express";

import Episode from "../models/episode";

export const getEpisode = async (req: Request, res: Response) => {
  try {
    const episode = Episode.findOne({ _id: req.params.epId }).where(
      "show",
      req.params.showId
    );
    res.status(200).json(episode);
  } catch {
    res.status(500).send("Could not retrieve episode");
  }
};
