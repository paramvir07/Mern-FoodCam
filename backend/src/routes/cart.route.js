import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';


const router = express.Router();

router.post("/cart/addFood/:foodId", authMiddleware.isLoggedIn, authMiddleware.isUser, cartController.cartAddFood);
router.get("/cart/read", authMiddleware.isLoggedIn, authMiddleware.isUser, cartController.readCart)
router.delete("/cart/deleteFood/:foodId", authMiddleware.isLoggedIn, authMiddleware.isUser, cartController.cartDeleteFood)
router.patch("/cart/updateQty", authMiddleware.isLoggedIn, authMiddleware.isUser, cartController.cartUpdateQty)

export default router;