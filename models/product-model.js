import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name : {
        type: String,
        required : true,       
    },
    category : {
        type : String,
        required : true,       
    },
    quantity : {
        type : Number,
       // required : true,
    },
    price : {
        type : Number,
        required : true,

    },
    description : {
        type : String,
      //  required : true,
    },
    user : {
    type : mongoose.Schema.Types.ObjectId,
ref:'users',
//required:true
    },
    rating:{
        type: Number,
        enum: [1,2,3,4,5],
        default: 1
    },
    images:{
    type:[String]

    }
}, {
    timestamps : true,
})

let products = mongoose.model("products", productSchema,'products');
export default products

