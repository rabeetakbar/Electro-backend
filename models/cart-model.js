import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
         //required: true,
    },
    product_id:{
        type: String,
        default:"Electronics"
       // required : true,    
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,   
        required: true,
    }
}, {
    timestamps : true,
})

let cart = mongoose.model("carts", cartSchema);
export default cart