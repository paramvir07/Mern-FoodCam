import jwt from "jsonwebtoken";
import foodPartnerModel from "../models/foodpartner.model";

const authFoodPartner=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "please login first"});


}