import foodModel from "../models/food.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";

const addFood = async (req,res) => {
    const { name, video, description } = req.body || {};

    if (!req.body) {
      return res.status(400).json({
        error: "Missing request body. Make sure you're sending JSON and setting Content-Type: application/json.",
      });
    }

    const authUser= req.authUser;

    const food=await foodModel.create({name, video, description,
        foodPartner: authUser.id

    })

    const partner= await foodPartnerModel.findById(authUser.id)
    partner.food.push(food._id);
    await partner.save();

    res.status(201).json({message: "Food item created successfully!!"})

}

export default {addFood};