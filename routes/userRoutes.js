import express from 'express';
import getUserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//Get user
router.get('/getuser', authMiddleware, getUserController)

export default router; 