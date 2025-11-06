import foodModel from "../models/food.model.js";

const addFood = async (req,res) => {
    const {name, video, description} = req.body;
    
    const alreadyExists = await foodModel.findOne()

    

}