import express from 'express';
import apiRoutes from "./api/index.js"
import webRoutes from "./web/index.js"
import { errorHandler } from '../helpers/errorHandler.js';

const router = express.Router();
router.use('/', webRoutes);
router.use('/', apiRoutes);
router.use(async (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err);

  return res.send({success: false, error: err}).status(err.httpCode);
 });
export default router;