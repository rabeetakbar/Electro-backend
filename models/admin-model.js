import mongoose from "mongoose";


const adminSchema=new mongoose.Schema(
    {
    firstname : {
            type: String,
            required : true,       
        },
        lastname : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
    
        },
        password : {
            type : String,
            required : true,
        },
        address : {
            type : String,
            required : true,
        },

    },
    {
        timestamps : true,
    })
    
    let admin = mongoose.model("admins", adminSchema,'admins');
    export default admin