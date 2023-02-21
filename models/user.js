import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  profile_image: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);

export default User;
