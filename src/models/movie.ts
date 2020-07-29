import { Document, Schema, model } from "mongoose";

interface IMovie extends Document {
  name: string;
  country: string;
  releaseDate: Date;
  directedBy: string;
  cast: [];
  genre: string;
}

const MovieSchema = new Schema({
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
  directedBy: {
    type: Schema.Types.ObjectId,
    ref: "Director",
    required: true,
  },
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: true,
    },
  ],
  genre: {
    type: String,
    required: true,
  },
});

export default model<IMovie>("Movie", MovieSchema);
