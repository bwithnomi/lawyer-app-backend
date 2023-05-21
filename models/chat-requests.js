import mongoose from "mongoose";

const ChatRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    default: "pending"
  },
}, { timestamps: true });
const ChatRequest = mongoose.model("ChatRequest", ChatRequestSchema);

export default ChatRequest;
