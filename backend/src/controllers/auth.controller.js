import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";
import cartModel from "../models/cart.model.js";
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
    const created_cart=await cartModel.create({user: created_user._id});

    await userModel.findByIdAndUpdate(created_user._id, {cart: created_cart._id}, {new: true});
    const token = jwt.sign({id: created_user._id, name: fullname, role:"user"}, jwt_key, {expiresIn: "7d"});

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.status(201).json({ message: "User created successfully" });
}

const loginUser = async (req, res)=>{

    if(req.authUser) return res.status(400).json({error: "You're already logged in"})
 
    const {email, password} = req.body;

    const user= await userModel.findOne({email});
    if(!user) return res.status(401).json({error: "Invalid credentials"});

    const checkPassword= await bcrypt.compare(password, user.passwordHash );
    if(!checkPassword) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign({id: user._id, name: user.fullname, role:"user"}, jwt_key, {expiresIn: "7d"});
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

    const token = jwt.sign({id: created_food_partner._id, name, role:"partner"}, jwt_key, {expiresIn: "7d"});

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

    const token = jwt.sign({id: food_partner._id, name: food_partner.name, role: "partner"}, jwt_key, {expiresIn: "7d"});
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })

    return res.status(200).json({ message: "Food Partner Logged in successfully"});
    
}

const loggedInUser = (req, res) => {
  const token = req.cookies?.token;

  try {
    if (!token) {
        return res.json({User: "Not logged in"});
    } else {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        return res.json(payload);
    }
    
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};


export default {registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, loggedInUser};