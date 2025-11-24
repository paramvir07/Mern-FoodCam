import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import foodRoute from './routes/food.route.js';
import cartRoute from './routes/cart.route.js';
const app=express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/partner/", foodRoute);
app.use("/api/user", cartRoute);


app.get("/", async(req,res)=>{
      res.json("I am main page")
})

export default app;