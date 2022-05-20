import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    unique: true,
    type: String,
  },
});

export default mongoose.model("User", userSchema);
