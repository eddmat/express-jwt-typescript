import { Request, Response } from "express";

import Episode from "../models/episode";

/**
 * Get specific episode
 */
export const getEpisode = async (req: Request, res: Response) => {
  try {
    const episodeId = req.params.epId;
    const showId = req.params.showId;

    if (episodeId === null || showId === null) {
      res.status(400).send("Not enough parameters");
    }

    const episode = await Episode.findOne({ _id: episodeId }).where(
      "show",
      showId
    );

    if (!episode) return res.status(204);

    res.status(200).json(episode);
  } catch {
    res.status(500).send("Error. Could not retrieve episode");
  }
};
