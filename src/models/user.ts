import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  email: string;
  password: string;
}

const setPassword = (value: string) => {
  return bcrypt.hashSync(value, 10);
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
});

export default model<IUser>("User", UserSchema);
