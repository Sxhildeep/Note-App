import mongoose from  "mongoose";


export const connectDB = async ()=> {
    try 
    {
       await mongoose.connect(process.env.MONGO_URL); // connect with the key
        console.log("DB connected");
    }
    catch(err) {
        console.log(err);
    }
}