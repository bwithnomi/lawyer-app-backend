import ChatService from './../services/chat.service.js'
import { responseGenerator } from "../utils/responseHandler.helper.js";
import User from '../models/user.js';

const ChatServiceInstance = new ChatService();
export const saveChatRequest = async (req, res, next) => {
  try {
    if (req.body.receiver_id == req.user._id) {
      return res.status(423).send(responseGenerator(null, false, "invalid user id", 423));
    }
    let userResult = await ChatServiceInstance.createChatRequest(req.user, req.body);
    return res.status(200).send(responseGenerator(userResult.data, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const saveConversation = async (req, res, next) => {
  try {
    if (req.body.receiver_id == req.user._id) {
      return res.status(423).send(responseGenerator(null, false, "invalid user id", 423));
    }
    let userResult = await ChatServiceInstance.createConversation(req.user, req.body);
    return res.status(200).send(responseGenerator(userResult.data, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getConversations = async (req, res, next) => {
  try {
    let result = await ChatServiceInstance.getConversations(req.user);
    return res.status(200).send(responseGenerator(result.data, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const saveMessage = async (req, res, next) => {
  try {

    let userResult = await ChatServiceInstance.saveNewMessage(req.user, req.body);
    global.io.emit(`message_${req.body.receiver_id}`, userResult.data);
    return res.status(200).send(responseGenerator(userResult.data, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const getConversation = async (req, res, next) => {
  try {
    let userResult = await ChatServiceInstance.getChat(req.user, req.body);
    return res.status(200).send(responseGenerator(userResult.data, false, "", 200));
  } catch (error) {
    next(error)
  }
}

export const searchUser = async (req, res, next) => {
  let result = await User.find({
    name: {
      $regex: new RegExp(req.body.searchString, "ig")
    },
    _id: { $ne: req.user._id },
    // role: {$ne: req.user.role}
  }).limit(40)
  result = await User.aggregate([
    {
      $match: {
        name: {
          $regex: new RegExp(req.body.searchString, "ig")
        },
        _id: { $ne: req.user._id },
      }
    },
    {
      $lookup: {
        from: "casereviews",
        localField: "_id",
        foreignField: "lawyer",
        as: "reviews",
        pipeline: [
          {  
            $group: {
              _id: "$lawyer",
              avgRating: { $avg: { $toDouble: "$rating" } }
            }
          },
        ]
      }
    },
    {
      $limit: 40,
    }
  ])
  return res.status(200).send(responseGenerator(result, false, "", 200));
}

export const getUsers = async (req, res, next) => {
  let result = await User.find({
    _id: { $ne: req.user._id },
    role: { $ne: req.user.role },
  }).sort({ created_at: -1 }).limit(12)
  result = await User.aggregate([
    {
      $match: {
        role: { $ne: req.user.role },
        _id: { $ne: req.user._id },
      }
    },
    {
      $lookup: {
        from: "casereviews",
        localField: "_id",
        foreignField: "lawyer",
        as: "reviews",
        pipeline: [
          {  
            $group: {
              _id: null,
              avgRating: { $avg: { $toDouble: "$rating" } }
            }
          },
        ]
      }
    },
    {
      $limit: 12,
    }
  ])
  return res.status(200).send(responseGenerator(result, false, "", 200));
}

export const getRequests = async (req, res, next) => {
  let result = await ChatServiceInstance.getRequests(req.user, req.body);
  return res.status(200).send(responseGenerator(result.data, false, "", 200));
}

export const changeRequestStatus = async (req, res, next) => {
  let result = await ChatServiceInstance.setRequestStatus(req.user, req.body);
  return res.status(200).send(responseGenerator(result.data, false, "", 200));
}