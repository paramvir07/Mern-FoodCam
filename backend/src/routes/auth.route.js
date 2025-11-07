import express from 'express';
import authController from '../controllers/auth.controller.js';
const router=express.Router();

router.post('/user/register', authController.registerUser);

router.post('/user/login', authController.loginUser);

router.get("/user/logout", authController.logoutUser );

router.post("/food-partner/register", authController.registerFoodPartner);

router.post("/food-partner/login", authController.loginFoodPartner);

export default router;