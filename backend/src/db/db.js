import mongoose from "mongoose";



const dbUrl= process.env.MONGODB_URL;


const dbConnect=()=>{
    mongoose.connect(dbUrl)
    .then(()=>{
        console.log("Database connected successfully!!");
    })
    .catch((err)=>{
        console.log(`Databse connecteion error: ${err}`);
    })
}

export default dbConnect;