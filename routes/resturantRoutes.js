import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createResturantController, deleteRestuarantController, getAllRestuarantController, getRestuarantByIdController } from '../controllers/resturantController.js';

const router = express.Router();

//create resturant
router.post("/create", authMiddleware, createResturantController)

//Get all
router.get("/getall", getAllRestuarantController )

//Get single restuarant
router.get("/get/:id", getRestuarantByIdController)

//Delete restuarant
router.delete("/delete/:id", authMiddleware, deleteRestuarantController)

export default router; 