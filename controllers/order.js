import { request } from "http"
import order from "../models/order-model.js";
 import { response } from "express";

export const postOrder = async (req , res ) => {
    try{
        const {customer_id,total_amount,shipping_address,payment_id,status } = req.body;
        console.log(customer_id,total_amount,shipping_address,payment_id,status); 
        const existval = await order.findOne({ customer_id: customer_id });
        if(existval) {
            return res.status(400).json({ message: "Order already exists" });
        }
        
        const orderData = order({
            customer_id,total_amount,shipping_address,payment_id,status        })

        await orderData.save();
        return res.status(200).json({ message: "Order saved succesfully", success: true , orderData});

    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getOrderData = async (req, res) => {
    try {
        const getorder = await order.find()
        return res.status(200).json({ success : true , getorder});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getOrderById = async (req , res) => {
    try{
        const getOrderId = req.params.id;
        const orderData = await order.findById(getOrderId);
        if (!orderData) {
            return res.status(404).json({ message: "Order not found" });

        }
        return res.status(200).json({ success: true, orderData , message :"got Order data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}
export const deleteOrderById = async (req , res) => {
    try{
        const deleteById = req.params.id;
        const orderData = await order.findByIdAndDelete(deleteById);
        if (!orderData) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ success: true, orderData , message :"Order deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const updateOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        // The fields to update
        const { customer_id,total_amount,shipping_address,payment_id,status} = req.body;

        // Find the user by ID and update with the new data
        const updatedOrder = await order.findByIdAndUpdate(
            orderId,
            { customer_id,total_amount,shipping_address,payment_id,status}, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({
            success: true,
            user: updatedOrder,
            message: "Order updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};