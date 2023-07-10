import mongoose from "mongoose";

const CaseDocumentSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Case'
  },
  document: {
    type: String,
    required: true,
  },
}, { timestamps: true });
const CaseDocument = mongoose.model("CaseDocument", CaseDocumentSchema);

export default CaseDocument;
