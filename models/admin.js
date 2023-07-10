import mongoose, { Schema } from "mongoose";

const AdminSchema = new mongoose.Schema({
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
}, { timestamps: true });
const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
