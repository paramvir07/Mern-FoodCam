import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    description:{
        type: String
    },
    category:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        default: 0
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    }
})

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;