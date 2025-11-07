import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';


const router = express.Router();

router.post("/cart/addfood/:foodId", authMiddleware.isLoggedIn, authMiddleware.isUser, cartController.cartAddFood);

export default router;