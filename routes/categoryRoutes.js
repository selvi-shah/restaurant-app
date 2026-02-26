import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, getCategoryByIdController } from '../controllers/categoryController.js';

const router = express.Router();

//create category
router.post("/create", authMiddleware, createCategoryController);

//get all category
router.get("/getall", authMiddleware, getAllCategoryController )

//get category by id
router.get("/get/:id", getCategoryByIdController)

//delete category
router.delete("/delete/:id", deleteCategoryController)


export default router; 