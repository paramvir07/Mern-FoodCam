import mongoose from "mongoose";

const cartSchema=new  mongoose.Schema({
    food:[{
        _id: false,
        foodId:{type: mongoose.Schema.Types.ObjectId, ref: "food"},
        qty: {type: Number, default: 1}
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;