import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: '0',
  },
}, { timestamps: true });
const Case = mongoose.model("Case", CaseSchema);

export default Case;
