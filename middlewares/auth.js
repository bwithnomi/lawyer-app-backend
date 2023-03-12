import jwt from "jsonwebtoken";
import jwtConfig from './../config/jwt.config.js'
import User from "../models/user.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, jwtConfig.secret, async (err, user) => {
    if (err || !user) return res.sendStatus(403)

    const checkUser = await User.findOne({ _id: user._id }).lean();
    if (!checkUser) {
      return res.sendStatus(403);
    }
    req.user = checkUser
    next()
  })
}

export default authenticateToken;
