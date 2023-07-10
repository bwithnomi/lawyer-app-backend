import express from 'express';
import userRouter from "./user.js"
import adminRouter from "./admin.js"

const router = express.Router();
router.use('/api', userRouter);
router.use('/api/admin', adminRouter);
router.get('/api', (req, res) => {
  res.send('api routes are up and running')
});

export default router;