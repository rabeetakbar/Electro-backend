import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
    }, 
    name : {
        type: String,
     required: true,      
    },
    email : {
        type: String,
     required: true,      
    },
    address : {
        type: String,
     required: true,      
    },  
      city : {
        type: String,
     required: true,      
    },    
    state : {
        type: String,
    },
    country : {
        type: String,
     required: true,      
    },
    postalcode : {
        type: Number,
    },
    amount : {
        type: Number,
     required: true,      
    },
    paymenttype : {
        type : String,
        default:"Cash"
    }
}, {
    timestamps : true,
})

let payment = mongoose.model("payments", paymentSchema);
export default payment