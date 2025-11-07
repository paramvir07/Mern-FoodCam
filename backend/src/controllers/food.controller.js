import foodModel from "../models/food.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";

const addFood = async (req,res) => {
    const { name,description, category } = req.body || {};

    if (!req.body) {
      return res.status(400).json({
        error: "Missing request body.",
      });
    }

    const authUser= req.authUser;

    const alreadyExists= await foodModel.findOne({name, foodPartner: authUser.id}).collation({locale: "en", strength: 1});
    if(alreadyExists) return res.status(409).json({error: "Food already exists"});

    const food=await foodModel.create({name,description, category,
        foodPartner: authUser.id
    })

    const partner= await foodPartnerModel.findById(authUser.id)
    partner.food.push(food._id);
    await partner.save();

    res.status(201).json({message: "Food item created successfully!!"})

}

export default {addFood};