import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwt_key=process.env.JWT_KEY;

const registerUser = async (req, res)=>{
    const {fullname, email, password} = req.body;

     if (!fullname || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
    const isAlreadyRegistered= await userModel.findOne({email});
    if(isAlreadyRegistered) return res.status(409).json({error: "Email already in use"});

    const passwordHash= await bcrypt.hash(password, 10);

    const created_user=await userModel.create({fullname, email, passwordHash});

    const token = jwt.sign({id: created_user._id, email}, jwt_key, {expiresIn: "7d"});

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.status(201).json({ message: "User created successfully" });
}

const loginUser = async (req, res)=>{

    const {email, password} = req.body;

    const user= await userModel.findOne({email});
    if(!user) return res.status(401).json({error: "Invalid credentials"});

    const checkPassword= await bcrypt.compare(password, user.passwordHash );
    if(!checkPassword) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign({id: user._id, email}, jwt_key, {expiresIn: "7d"});
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })

    return res.status(200).json({ message: "User Logged in successfully" });
    
}

const logoutUser = (req, res)=>{

res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});
return res.status(200).json({ message: "Logged out successfully" });

}


const registerFoodPartner = async (req, res)=>{
    const {name, email, password} = req.body;

     if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
    const isAlreadyRegistered= await foodPartnerModel.findOne({email});
    if(isAlreadyRegistered) return res.status(409).json({error: "Email already in use"});

    const passwordHash= await bcrypt.hash(password, 10);

    const created_food_partner=await foodPartnerModel.create({name, email, passwordHash});

    const token = jwt.sign({id: created_food_partner._id, email}, jwt_key, {expiresIn: "7d"});

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.status(201).json({ message: "Food Partner created successfully" });
}

const loginFoodPartner = async (req, res)=>{

    const {email, password} = req.body;

    const food_partner= await foodPartnerModel.findOne({email});
    if(!food_partner) return res.status(401).json({error: "Invalid credentials"});

    const checkPassword= await bcrypt.compare(password, food_partner.passwordHash );
    if(!checkPassword) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign({id: food_partner._id, email}, jwt_key, {expiresIn: "7d"});
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })

    return res.status(200).json({ message: "Food Partner Logged in successfully" });
    
}

const logoutFoodPartner = (req, res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    });
return res.status(200).json({ message: "Logged out successfully" });
}

export default {registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner};