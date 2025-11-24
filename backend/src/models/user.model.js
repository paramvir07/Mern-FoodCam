import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname: {
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
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    }
},
{
    timestamps: true
} 
)

const userModel = mongoose.model("user", userSchema);

export default userModel;