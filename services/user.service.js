import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { APIError } from "../helpers/ErrorHandler.helper.js";
import { HttpStatusCode } from "../constants/error.constant.js";
import { nativeUpload } from "../helpers/nativeFileUpload.js";

class UserService {
  async create(user, files) {
    try {
      const checkUser = await User.findOne({
        email: user.email,
      }).lean();
      if (!checkUser) {
        let filePath = nativeUpload('user/profile_images', files[0]);
        const salt = await bcrypt.genSalt(6);
        const password = await bcrypt.hash(user.password, salt);
        const resUser = new User({
          name: user.name,
          email: user.email,
          password: password,
          profile_image: filePath,
        });
        const result = await resUser.save();
        return { success: true, body: result.toObject() };
      }
      return { success: false, error: 'user exist' };
    } catch (err) {
      throw new Error(err)
    }
  }

  async login(user) {
    try {
      const resUser = await User.findOne({
        email: user.email,
      }).lean();
      if (!resUser) {
        return { success: false, error: 'user not found' };
      }
      if (await bcrypt.compare(user.password, resUser.password)) {
        return { success: true, data: resUser };
      }
      return { success: false, error: 'Password mismatch' };
    } catch (err) {
      throw new Error(err)
    }
  }

  async googleSignIn(user) {
    try {
      const resUser = await User.findOneAndUpdate({
        email: user.email,
      }, {
        name: user.displayName
      }).lean();
      if (!resUser) {
        const salt = await bcrypt.genSalt(6);
        const password = await bcrypt.hash('googleLogin', salt);
        const newUser = new User({
          name: user.displayName,
          email: user.email,
          password: password,
          profile_image: user.photoURL
        })
        const result = await newUser.save();
        return { success: true, data: result.toObject() };
      }
      return { success: true, data: resUser };
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default UserService;