import jwt from "jsonwebtoken";
import AdminService from "./../services/admin.service.js";
import { APIError } from "./../utils/ErrorHandler.helper.js";
import { HttpStatusCode } from "./../constants/error.constant.js";
import { responseGenerator } from "./../utils/responseHandler.helper.js";
import jwtConfig from './../config/jwt.config.js'
import { ObjectId, mongoose } from "mongoose";
import User from './../models/user.js';
import Case from './../models/case.js';


const AdminServiceInstance = new AdminService();

export const storeUser = async (req, res, next) => {
  try {
    let userResult = await AdminServiceInstance.create(req.body, req.files);
    if (userResult.success) {
      let token = jwt.sign(
        { ...userResult.body },
        jwtConfig.secret,
        { expiresIn: '86400s' }
      );
      return res.send(responseGenerator({ token, ...userResult.body }));
    }
    return res.status(400).send(responseGenerator('', false, userResult.error, 400));
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    let result = await AdminServiceInstance.login(req.body);
    if (result.success) {
      let token = jwt.sign(
        { ...result.data },
        jwtConfig.secret,
        { expiresIn: '86400s' }
      );
      return res.send(responseGenerator({ token, ...result.data })).status(200);
    }
    return res.status(401).send(responseGenerator('', false, result.error));
  } catch (error) {
    next(error)
  }
}

export const getLawyers = async (req, res, next) => {
  try {
    let result = await User.find({
      role: 'lawyer',
    }).sort({created_at: -1})
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getCases = async (req, res, next) => {
  try {
    let result = await Case.aggregate([
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
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ])
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    let result = await User.find({
      role: 'user',
    }).sort({created_at: -1})
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getCounts = async (req, res, next) => {
  try {
    let users = await User.find({
      role: 'user',
    }).count()
    let lawyers = await User.find({
      role: 'lawyer',
    }).count()
    let cases = await Case.find({}).count()
    return res.status(200).send(responseGenerator({users, lawyers, cases}, false, "", 200));
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
      _id: req.body.case_id
    }, { $set: { status: req.body.status } });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const changeUserStatus = async (req, res, next) => {
  try {
    let result = await User.updateOne({
      _id: req.body.user_id
    }, { $set: { status: req.body.status } });
    return res.status(200).send(responseGenerator(result, false, "", 200));
  } catch (error) {
    next(error)
  }
}
