import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router=express.Router();

router.post('/user/register',  authController.registerUser);

router.post('/user/login', authController.loginUser);

router.get("/logout", authController.logoutUser );

router.post("/partner/register",authController.registerFoodPartner,);

router.post("/partner/login",authController.loginFoodPartner);

router.get("/loggedinuser", authController.loggedInUser)
export default router;