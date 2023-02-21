import express from 'express';
import homeRouter from "./home.js"

const router = express.Router();
router.use('/', homeRouter);

export default router;