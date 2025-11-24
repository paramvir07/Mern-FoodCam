import jwt from "jsonwebtoken";
import foodPartnerModel from "../models/foodpartner.model.js";
import userModel from "../models/user.model.js";

const isLoggedIn=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({error: "Please login first"});
    try {
        const payload= jwt.verify(token, process.env.JWT_KEY);
        req.authUser= payload;
        next();
    } catch (error) {
        return res.status(403).json({error: "Invalid or expired token"});

    }
    
}

const isUser = async(req,res,next)=>{
    if(req.authUser.role !== "user") return res.status(403).json({error: "Not authenticated as user"})
    next();
}

const isFoodPartner= async(req,res,next)=>{
    if(req.authUser.role !== "partner") return res.status(403).json({error: "Not authenticated as food partner"})
    next();
}


export default {isLoggedIn, isUser, isFoodPartner};