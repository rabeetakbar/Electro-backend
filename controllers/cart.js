import { request } from "http"
import cart from "../models/cart-model.js";
import { response } from "express";

export const postCartData = async (req , res ) => {
    try{
        const {customer_id,product_id,quantity,price  } = req.body;
        console.log(customer_id,product_id,quantity,price ); 
        // const isCustomerExisted = await cart.findOne({ product_id: product_id });
        // if(isCustomerExisted) {
        //     return res.status(400).json({ message: "Customer already exists" });
        // }
        
        const customerData = cart({
            customer_id,product_id,quantity,price 
        })

        await customerData.save();
        return res.status(200).json({ message: "Cart saved succesfully", success: true , customerData});



    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getCartData = async (req, res) => {
    try {
        const getCart = await cart.find()
        return res.status(200).json({ success : true , getCart});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getCartById = async (req , res) => {
    try{
        const getCartId = req.params.id;
        const cartData = await cart.findById(getCartId);
        if (!cartData) {
            return res.status(404).json({ message: "Cart not found" });

        }
        return res.status(200).json({ success: true, userData , message :"got Cart data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}

export const deleteCartById = async (req , res) => {
    try{
        const deleteCart = req.params.id;
        const CartData = await user.findByIdAndDelete(deleteCart);
        if (!CartData) {
            return res.status(404).json({ message: "Cart not found" });

        }
        return res.status(200).json({ success: true, userData , message :"Cart Cleared"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const updateCartById = async (req, res) => {
    try {
        const cartId = req.params.id;
        
        // The fields to update
        const { customer_id,product_id,quantity,price  } = req.body;

        // Find the user by ID and update with the new data
        const updatedCart = await cart.findByIdAndUpdate(
            cartId,
            {customer_id,product_id,quantity,price }, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json({
            success: true,
            user: updatedCart,
            message: "Cart updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
