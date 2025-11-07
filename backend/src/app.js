import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import foodRoute from './routes/food.route.js';

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api", foodRoute);

app.get("/", (req,res)=>{
    res.send("this is the main page")
})

export default app;