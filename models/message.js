import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Conversation'
  },
  message: {
    type: String,
    default: '',
  },
  file: {
    type: String,
    default: '',
  },
}, { timestamps: true });
const Message = mongoose.model("Message", MessageSchema);

export default Message;
