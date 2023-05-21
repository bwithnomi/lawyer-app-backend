import jwt from "jsonwebtoken";
import UserService from "../../services/user.service.js";
import { APIError } from "../../utils/ErrorHandler.helper.js";
import { HttpStatusCode } from "../../constants/error.constant.js";
import { responseGenerator } from "../../utils/responseHandler.helper.js";
import jwtConfig from './../../config/jwt.config.js'
import User from '../../models/user.js';


const UserServiceInstance = new UserService();

export const storeUser = async (req, res, next) => {
  try {
    let userResult = await UserServiceInstance.create(req.body, req.files);
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
    let result = await UserServiceInstance.login(req.body);
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

export const google_login = async (req, res, next) => {
  try {
    let result = await UserServiceInstance.googleSignIn(req.body);
    let token = jwt.sign(
      { ...result.data },
      jwtConfig.secret,
      { expiresIn: '86400s' }
    );
    return res.status(200).send(responseGenerator({ token, ...result.data }));

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
