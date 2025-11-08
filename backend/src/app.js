import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import foodRoute from './routes/food.route.js';
import cartRoute from './routes/cart.route.js';
import foodController from './controllers/food.controller.js';
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api", foodRoute);
app.use("/api/user", cartRoute);

app.get("/", foodController.readFood)

export default app;