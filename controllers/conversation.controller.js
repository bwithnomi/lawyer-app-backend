import ChatService from './../services/chat.service.js'
import { responseGenerator } from "../utils/responseHandler.helper.js";
import User from '../models/user.js';

const ChatServiceInstance = new ChatService();
export const saveConversation = async (req, res, next) => {
  try {
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
    }
  })
  return res.status(200).send(responseGenerator(result, false, "", 200));
}