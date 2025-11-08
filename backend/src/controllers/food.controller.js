import foodModel from "../models/food.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";

const addFood = async (req,res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
    message: "error adding food",
    error: error.message
  })
  }
    

}
const readFood = async (req,res)=>{
try {
  const foodList = await foodModel.find().populate('foodPartner');
  res.json({foodList});
}
catch (error) {
  res.status(500).json({
    message: "error getting food list data ",
    error: error.message
  })
}
}


export default {addFood ,readFood};