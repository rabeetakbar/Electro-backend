import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_name : {
        type: String,
        required : true,       
    },
    description : {
        type : String,
    }

}, {
    timestamps : true,
})

let category = mongoose.model("category", categorySchema,'category');
export default category