import mongoose from "mongoose";

const CaseReviewSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Case',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  rating: {
    type: String,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });
const CaseReview = mongoose.model("CaseReview", CaseReviewSchema);

export default CaseReview;
