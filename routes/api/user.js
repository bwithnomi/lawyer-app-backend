import express from 'express';
import multer from "multer";
import authenticateToken from "../../middlewares/auth.js"
import { rules as user_validation_rules } from "../../requests/create_user.validation.js"
import { rules as login_validation_rules } from "../../requests/login_user.validation.js"
import { rules as google_validation_rules } from "../../requests/google_login.validation.js"
import { rules as message_validation_rules } from "../../requests/send_message.validation.js"
import { validate } from "../../utils/validator.js"
import { storeUser, loginUser, google_login } from "../../controllers/auth/user.controller.js"
import { saveConversation, getConversations, saveMessage, getConversation } from '../../controllers/conversation.controller.js';
import fileUploader from "../../utils/FileUploader.js";

const router = express.Router();

// router.get('/user', upload.single("file"), storeUser);
router.get('/user', user_validation_rules(), validate, storeUser);
router.get('/:id', (req, res) => {
  res.send('hello world')
})
router.post('/user/signup', multer().fields([{name: 'profile_image', maxCount: 1}, {name: 'license', maxCount: 1}]), user_validation_rules(), validate, storeUser);
router.post('/user/login', login_validation_rules(), validate, loginUser);
router.post('/user/google-login', google_validation_rules(), validate, google_login);
router.post('/user/save-conversation', authenticateToken, saveConversation);
router.post('/user/get-conversations', authenticateToken, getConversations);
router.post('/user/save-message', authenticateToken,message_validation_rules(), validate, saveMessage);
router.post('/user/get-messages', authenticateToken, getConversation);
export default router;