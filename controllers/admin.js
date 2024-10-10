import { request } from "http";
import { response } from "express";
import admin from "../models/admin-model.js";

export const postAdminData = async (req , res ) => {
    try{
        const {firstname , lastname , email, password,address  } = req.body;
        console.log(firstname , lastname , email, password,address); 
        const isemailExisted = await admin.findOne({ email: email });
        if(isemailExisted) {
            return res.status(400).json({ message: "An Admin already exists at this email" });
        }
        
        const adminData = admin({
            firstname , lastname , email, password,address
        })

        await adminData.save();
        return res.status(200).json({ message: "data saved succesfully", success: true , adminData});


    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getAdminData = async (req, res) => {
    try {
        const getAdmin = await admin.find()
        return res.status(200).json({ success : true , getAdmin});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

//no need of it
// export const getProductById = async (req , res) => {
//     try{
//         const getProductId = req.params.id;
//         const productData = await products.findById(getProductId);
//         if (!productData) {
//             return res.status(404).json({ message: "product not found" });

//         }
//         return res.status(200).json({ success: true, productData , message :"got data"});   
//     }
//     catch(error){
//             res.status(500).json(error.message);
//     }
// }

//----------------------------------------------- neither this one--------------------------

// export const getProductByuser = async (req , res) => {
//     try{
//         const productData = await products.find().populate("user");
//         if (!productData) {
//             return res.status(404).json({ message: "product not found" });

//         }
//         return res.status(200).json({ success: true, productData , message :"got data"});   
//     }
//     catch(error){
//             res.status(500).json(error.message);
//     }
// }





export const updateAdminById = async (req, res) => {
    try {
        const AdminId = req.params.id;
        
        // The fields to update
        const { firstname , lastname , email, password,address  } = req.body;

        // Find the product by ID and update with the new data
        const updatedAdmin = await admin.findByIdAndUpdate(
            AdminId,
            { firstname , lastname , email, password,address  }, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({
            success: true,
            user: updatedAdmin,
            message: "Admin updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




export const deleteAdminById = async (req , res) => {
    try{
        const deleteAdminById = req.params.id;
        const adminData = await admin.findByIdAndDelete(deleteAdminById);
        if (!adminData) {
            return res.status(404).json({ message: "Admin not found" });

        }
        return res.status(200).json({ success: true, adminData , message :"Admin deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}