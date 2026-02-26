import express from 'express';
import {getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//Get user
router.get('/getuser', authMiddleware, getUserController)

//update profile
router.put("/updateuser", authMiddleware, updateUserController)

//Reset password
router.post("/resetpassword", authMiddleware, resetPasswordController)

//password update
router.post("/updatepassword", authMiddleware, updatePasswordController)

//Delete User
router.delete("/deleteuser/:id", authMiddleware, deleteUserController )

export default router; 