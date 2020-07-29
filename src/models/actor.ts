import { Document, Schema, model } from "mongoose";

interface IActor extends Document {
  name: string;
  birthday: Date;
  nationality?: String;
  gender?: String;
}

const ActorSchema = new Schema({
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
  debutDate: {
    type: Date,
  },
});

export default model<IActor>("Director", ActorSchema);
