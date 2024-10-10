import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url =process.env.MONGOURL

export const  connectDB =()=>{
 try{
    console.log(url)
mongoose.connect(url)
console.log("Database connected")
 }
 catch(error)
 {
    console.log(error.message)
 }
}




