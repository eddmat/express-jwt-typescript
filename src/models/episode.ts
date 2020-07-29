import { Document, Schema, model } from "mongoose";

interface IEpisode extends Document {
  name: string;
  show: string;
  directedBy: string;
  releaseDate: Date;
  cast: [];
}

const EpisodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  show: {
    type: Schema.Types.ObjectId,
    ref: "TvShow",
    required: true,
  },
  directedBy: {
    type: Schema.Types.ObjectId,
    ref: "Director",
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
});

export default model<IEpisode>("Episode", EpisodeSchema);
