import mongoose from "mongoose";

const CaseHearingSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Case'
  },
  hearing_date: {
    type: String,
  },
  note: {
    type: String,
  },
}, { timestamps: true });
const CaseHearing = mongoose.model("CaseHearing", CaseHearingSchema);

export default CaseHearing;
