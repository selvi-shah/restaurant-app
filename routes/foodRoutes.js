import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createFoodController, deleteFoodController, getAllFoodController, getFoodByIdController, orderStatusController, placeOrderController, updateFoodController } from '../controllers/foodController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = express.Router();

//Create food 
router.post("/create", authMiddleware, createFoodController)

//get all foods
router.get("/getall", authMiddleware, getAllFoodController)

//get single food data
router.get("/get/:id", authMiddleware, getFoodByIdController)

//update food data
router.put("/update/:id", authMiddleware, updateFoodController)

//delete food data
router.delete("/delete/:id", authMiddleware, deleteFoodController)

//place order
router.post("/placeorder", authMiddleware, placeOrderController)

//order status
router.post("/orderstatus/:id", authMiddleware, adminMiddleware, orderStatusController)

export default router; 