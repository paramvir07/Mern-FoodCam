import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import foodController from '../controllers/food.controller.js';

const router =express.Router();

router.post('/addfood', authMiddleware.isLoggedIn, authMiddleware.isFoodPartner, foodController.addFood);
router.get('/myfood', authMiddleware.isLoggedIn, authMiddleware.isFoodPartner, foodController.myFood);
router.get('/deletefood/:foodId', authMiddleware.isLoggedIn, authMiddleware.isFoodPartner, foodController.deleteFood);
router.post('/editfood/:foodId', authMiddleware.isLoggedIn, authMiddleware.isFoodPartner, foodController.editFood);
router.get('/readfood', foodController.readFood);

export default router;