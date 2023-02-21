import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world')
})
router.get('/user', (req, res) => {
  res.send('hello user')
})
router.post('/user', (req, res) => {
  res.send('hello world')
})

export default router;