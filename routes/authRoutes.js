import express from 'express';
import {registerController, loginController} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerController);

//login
router.post('/login', loginController)

export default router; 