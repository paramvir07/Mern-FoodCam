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

            return res.status(200).json({message: "Food added to cart successfully"})

        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong while adding food to cart",
                error: error.message
            })
        }
    

}

const readCart = async (req,res)=>{
    const userId= req.authUser.id;
    const cart= await cartModel.findOne({user: userId});

    res.json({cart});


}

export default {cartAddFood, readCart};