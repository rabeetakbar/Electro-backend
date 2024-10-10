import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
    }, 
    total_amount : {
        type: Number,
        required : true,       
    },
    shipping_address : {
        type : String,
        required : true,
    },
    payment_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payments",
        // required: true,
    },
    status : {
        type : String,
    },

}, {
    timestamps : true,
})

let order = mongoose.model("orders", orderSchema);
export default order