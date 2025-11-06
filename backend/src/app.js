import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.get("/", (req,res)=>{
    res.send("this is the main page")
})

export default app;