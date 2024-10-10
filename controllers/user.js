import { request } from "http"
import user from "../models/user-model.js"
import { response } from "express";


//----------------------------------For Single image-----------------------------------------
// export const postUserData = async (req , res ) => {
//     try{
//         const {name , userName , password, email  } = req.body;
//         const image=req.file.path
        
//         console.log(name , email, password, userName); 
//         const isEmailExisted = await user.findOne({ email: email });
//         if(isEmailExisted) {
//             return res.status(400).json({ message: "Email already exists" });
//         }
        
//         const userData = user({
//             name,
//             userName,
//             email,
//             password,
//             image
//         })

//         await userData.save();
//         return res.status(200).json({ message: "data saved succesfully", success: true , userData});



//     }
//     catch(error){
//         res.status(500).json(error.message);
//     }
// }


//------------------------multiple images---------------------------------

// export const postUserData = async (req, res) => {
//     try {
//         const { name, userName, password, email } = req.body;

//         // Handle multiple images
//         let images = [];
//         if (req.files) {
//             images = req.files.map(file => file.path); // Array of image paths
//         }

//         console.log(name, email, password, userName, images); // Check the data in the console

//         const isEmailExisted = await user.findOne({ email: email });
//         if (isEmailExisted) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         // Save user data with multiple images
//         const userData = new user({
//             name,
//             userName,
//             email,
//             password,
//             images  // Store array of image paths
//         });

//         await userData.save();
//         return res.status(200).json({ message: "Data saved successfully", success: true, userData });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


//----------------------------------For No image-----------------------------------------
export const postUserData = async (req, res) => {
    try {
        const { name, userName, password, email } = req.body;

        // Log the incoming data
        console.log(name, email, password, userName);

        // Check if the email already exists
        const isEmailExisted = await user.findOne({ email: email });
        if (isEmailExisted) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create user data without image
        const userData = new user({
            name,
            userName,
            email,
            password,
        });

        // Save the user data
        await userData.save();
        return res.status(200).json({ message: "Data saved successfully", success: true, userData });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getUsersData = async (req, res) => {
    try {
        const getUsers = await user.find()
        return res.status(200).json({ success : true , getUsers});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getUserById = async (req , res) => {
    try{
        const getUserId = req.params.id;
        const userData = await user.findById(getUserId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });

        }
        return res.status(200).json({ success: true, userData , message :"got user data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}

export const deleteUserById = async (req , res) => {
    try{
        const deleteUserById = req.params.id;
        const userData = await user.findByIdAndDelete(deleteUserById);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });

        }
        return res.status(200).json({ success: true, userData , message :"user deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // The fields to update
        const { name, userName, email, password } = req.body;

        // Find the user by ID and update with the new data
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { name, userName, email, password }, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
