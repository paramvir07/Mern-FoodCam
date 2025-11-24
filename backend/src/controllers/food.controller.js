import foodModel from "../models/food.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";

const addFood = async (req,res) => {
  try {

    const { name, image, price, description, category } = req.body || {};
    if (!req.body) {
      return res.status(400).json({
        error: "Missing request body.",
      });
    }

    const authUser= req.authUser;

    const alreadyExists= await foodModel.findOne({name, foodPartner: authUser.id}).collation({locale: "en", strength: 1});
    if(alreadyExists) return res.status(409).json({error: "Food already exists"});

    const food=await foodModel.create({name, image, price, description, category,
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
const myFood = async(req, res) => {
  const loggedInPartner = req.authUser.id;
  const food = await foodModel.find({foodPartner: loggedInPartner});
  res.json(food);
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

const deleteFood = async (req,res)=>{
  const foodId = req.params.foodId;
  try {
    const food = await foodModel.findOneAndDelete({_id: foodId});

    if(!food) return res.status(404).json({error: "Food item not found"})

    return res.json({message: `Food Item ${food.name} deleted successfully`})
  } catch (error) {
    console.error("Error while deleting food: ", error)
    return res.status(500).json({error: "Error while deleting food"})
  }
}

const editFood = async (req,res)=>{
  const foodId = req.params.foodId;
  const { name, image, price, description, category } = req.body || {};
  try {
    const food = await foodModel.findOneAndUpdate({_id: foodId}, {name, image, price, description, category});

    if(!food) return res.status(404).json({error: "Food item not found"})

    return res.json({message: `Food Item ${food.name} updated successfully!!`})
  } catch (error) {
    console.error("Error while updatind food: ", error)
    return res.status(500).json({error: "Error while updating food"})
  }
}


export default {addFood ,myFood, readFood , deleteFood, editFood};