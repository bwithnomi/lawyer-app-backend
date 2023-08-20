import { loginUser, getCounts, getUsers, getLawyers, getCases, getCaseById, changeCaseStatus } from "./../../controllers/admin.controller.js"
import express from 'express';
const router = express.Router();

router.post('/login', loginUser);
router.get('/dashboard-counts', getCounts);
router.post('/get-users', getUsers);
router.post('/get-lawyers', getLawyers);
router.post('/get-cases', getCases);
router.post('/case/get', getCaseById);
router.post('/case/change-status', changeCaseStatus);

export default router;