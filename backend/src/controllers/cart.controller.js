import cartModel from '../models/cart.model.js';

const cartAddFood = async(req, res) =>{
        try {
            const qty= req.body.qty;
            const foodId = req.params.foodId;
            const cart= await cartModel.findOne({user: req.authUser.id});
            if(!cart) return res.status(404).json({error: "Cart not found"});
            const alreadyExists = cart.food.find(item => item.foodId.toString() === foodId);
            if(alreadyExists) {
                alreadyExists.quantity += qty;
            }
            else{
                cart.food.push({
                    foodId,
                    quantity
                })
            await cart.save();
            }
            return res.status(200).json({message: "Food added to cart successfully"})
        } catch (error) {
            return res.status(500).json({error: "Something went wrong while adding food to cart"})
        }
    

}

export default {cartAddFood};