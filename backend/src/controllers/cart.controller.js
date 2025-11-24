import cartModel from '../models/cart.model.js';

const cartAddFood = async(req, res) =>{
        try {
            const qty = Number(req.body?.qty ?? 1); 
            
            const foodId = req.params.foodId;

            const cart= await cartModel.findOne({user: req.authUser.id});
            if(!cart) return res.status(404).json({error: "Cart not found"});
            
            const alreadyExists = cart.food.find(item => item.foodId.toString() === foodId);
            if(alreadyExists) {
                alreadyExists.qty += qty;
            }
            else{
                cart.food.push({
                    foodId,
                    qty
                })
            }
            await cart.save();

            return res.status(200).json({success: true, message: "Food added to cart successfully"})

        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong while adding food to cart",
                error: error.message
            })
        }
    

}

const readCart = async (req,res)=>{
    const userId= req.authUser.id;
    try {
        const cart = await cartModel.findOne({user: userId}).populate({path: "food.foodId", populate: {path: "foodPartner"}});
        return res.status(200).json({cart});
    } catch (error) {
        return res.status(500).json({error: "error while reading user's cart"})
    }

}

const cartDeleteFood = async (req, res) => {
    const userId = req.authUser.id;
    const foodId = req.params.foodId;
    try {
        const cart = await cartModel.findOne({user: userId});
        const foodIndex = cart.food.findIndex(item => item.foodId === foodId);
        cart.food.splice(foodIndex, 1);
        await cart.save();
        return res.status(200).json({success: true, message: "Food item deleted from cart successfully!!"})
        
    } catch (error) {
        return res.status(500).json({error: "Error while deleting food from cart"});
    }
}

const cartUpdateQty = async(req,res)=>{
    const {foodId, action} = req.body;
    const user = req.authUser.id;
    try {
        const cart = await cartModel.findOne({user});

    if (!cart) return res.status(404).json({error: "Cart not found"});

    const food = cart.food.find(item => item.foodId.toString() === foodId);

    if (!food) return res.status(404).json({error: "Food not found"});
    
    if (action === 'increase') {
        food.qty += 1;
    }
    else {
        if (food.qty > 1) {
            food.qty -= 1;
        }
    }

    await cart.save();

    return res.status(200).json({success: true, message: "Food Quantity updated successfully"});
    } catch (error) {
        console.error("Error while updating food Quantity: ",error);
        return res.status(500).json({error: `Error while updating food Quantity`});
    }
    
}



export default {cartAddFood, readCart, cartDeleteFood, cartUpdateQty};