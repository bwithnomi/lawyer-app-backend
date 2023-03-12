import mongoose, { Schema } from "mongoose";

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
  license: {
    type: String,
    required: true,
    default: null,
  },
  lawyer_type: {
    type: String,
    required: true,
    default: null,
  },
  court_type: {
    type: String,
    required: true,
    default: null,
  },
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    }
  ]
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);

export default User;
