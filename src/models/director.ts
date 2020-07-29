import { Document, Schema, model } from "mongoose";

interface IDirector extends Document {
  name: string;
  birthday: Date;
  nationality?: String;
  gender?: String;
}

const DirectorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
  },
});

export default model<IDirector>("Director", DirectorSchema);
