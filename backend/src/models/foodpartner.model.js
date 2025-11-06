import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String
    }
},
{
    timestamps: true
})

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema);

export default foodPartnerModel;

