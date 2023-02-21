import express from 'express';
import multer from "multer";
import authenticateToken from "../../middlewares/auth.js"
import { rules as user_validation_rules } from "../../requests/create_user.validation.js"
import { rules as login_validation_rules } from "../../requests/login_user.validation.js"
import { rules as google_validation_rules } from "../../requests/google_login.validation.js"
import { validate } from "../../helpers/validator.js"
import { storeUser, loginUser, google_login } from "../../controllers/user.controller.js"
import fileUploader from "./../../helpers/FileUploader.js";

const router = express.Router();

// router.get('/user', upload.single("file"), storeUser);
router.get('/user', user_validation_rules(), validate, storeUser);
router.get('/:id', (req, res) => {
  res.send('hello world')
})
router.post('/user/signup', multer().any(), user_validation_rules(), validate, storeUser);
router.post('/user/login', login_validation_rules(), validate, loginUser);
router.post('/user/google-login', google_validation_rules(), validate, google_login);

export default router;