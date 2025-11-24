import 'dotenv/config';
import app from "./src/app.js";
import dbConnect from "./src/db/db.js";

dbConnect();

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})
