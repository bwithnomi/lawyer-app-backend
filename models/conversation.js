import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
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
}, { timestamps: true });
const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
