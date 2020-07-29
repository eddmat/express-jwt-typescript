import { Document, Schema, model } from "mongoose";

interface ITvShow extends Document {
  name: string;
  country: string;
  releaseDate: Date;
  episodes: [];
  cast: [];
  genre: string;
}

const TvShowSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
  ],
  episodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
    },
  ],
  genre: {
    type: String,
    required: true,
  },
});

export default model<ITvShow>("TvShow", TvShowSchema);
