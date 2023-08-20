import Case from "../models/case.js"
import CaseDocument from "../models/case_documents.js";
import CaseHearing from "../models/case_hearing.js";
import CaseReview from "../models/case_review.js";
import { responseGenerator } from "../utils/responseHandler.helper.js";
import { ObjectId, mongoose } from "mongoose";
import { nativeUpload } from "../utils/nativeFileUpload.js";

export const createCase = async (req, res, next) => {
  try {
    let result = await Case.create({
      title: req.body.title,
      description: req.body.description,
      lawyer: req.body.lawyer,
      user: req.user._id
    });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getCases = async (req, res, next) => {
  try {
    let result = await Case.find({
      $or: [
        { user: req.user._id },
        { lawyer: req.user._id },
      ]
    }).sort({ createdAt: -1 });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getCaseById = async (req, res, next) => {
  try {
    let result = await Case.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.case_id)
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "lawyer",
          foreignField: "_id",
          as: "lawyer",
        }
      },
      {
        $lookup: {
          from: "casehearings",
          localField: "_id",
          foreignField: "case",
          as: "hearings",
          pipeline: [
            {
              $sort: {
                createdAt: -1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: "casereviews",
          localField: "_id",
          foreignField: "case",
          as: "reviews",
          pipeline: [
            {
              $sort: {
                createdAt: -1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: "casedocuments",
          localField: "_id",
          foreignField: "case",
          as: "documents",
          pipeline: [
            {
              $sort: {
                createdAt: -1
              }
            }
          ]
        }
      },
    ]);
    // console.log(caseW);
    // let result = await Case.findOne({
    //   _id: req.body.case_id
    // }).populate('user').populate('lawyer');
    result = result[0];
    result.user = result.user[0];
    result.lawyer = result.lawyer[0];
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const changeCaseStatus = async (req, res, next) => {
  try {
    let result = await Case.updateOne({
      $or: [
        { lawyer: req.user._id },
        { user: req.user._id }
      ],
      _id: req.body.case_id
    }, { $set: { status: req.body.status } });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const createCaseHearing = async (req, res, next) => {
  try {
    let result = await CaseHearing.create({
      note: req.body.note,
      hearing_date: req.body.hearing_date,
      case: req.body.case_id
    });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const createCaseReviews = async (req, res, next) => {
  try {
    let result = await CaseReview.create({
      feedback: req.body.feedback,
      rating: req.body.rating,
      case: req.body.case_id,
      user: req.user._id,
      lawyer: req.body.lawyer,
    });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const addCaseDocument = async (req, res, next) => {
  try {
    console.log(req.files);
    let filePath = null;
    if (req.files['doc'][0]) {
      filePath = nativeUpload('user/case/documents', req.files['doc'][0]);
    }
    let result = await CaseDocument.create({
      document: filePath,
      case: req.body.case_id,
    });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}
