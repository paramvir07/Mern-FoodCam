import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    }
})

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;