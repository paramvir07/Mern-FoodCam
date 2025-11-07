import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import foodController from '../controllers/food.controller.js';

const router =express.Router();

router.post('/food-partner/addfood', authMiddleware.isLoggedIn, authMiddleware.isFoodPartner, foodController.addFood);

export default router;