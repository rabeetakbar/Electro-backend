import { request } from "http"
import payment from "../models/payment-model.js"; 
import { response } from "express";

export const postPayment = async (req , res ) => {
    try{
        const {customer_id,name,email,address,city,state,country,postalcode,amount,paymenttype } = req.body;
        console.log(customer_id,name,email,address,city,state,country,postalcode,amount,paymenttype); 
        // const existval = await payment.findOne({ customer_id: customer_id });
        // if(existval) {
        //     return res.status(400).json({ message: "Customer already exists" });
        // }
        
        const paymentData = payment({
            customer_id,name,email,address,city,state,country,postalcode,amount,paymenttype
        })

        await paymentData.save();
        return res.status(200).json({ message: " Payment data Saved succesfully", success: true , paymentData});

    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getPaymentData = async (req, res) => {
    try {
        const getpayment = await payment.find()
        return res.status(200).json({ success : true , getpayment});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getPaymentById = async (req , res) => {
    try{
        const getPaymentId = req.params.id;
        const paymentData = await payment.findById(getPaymentId);
        if (!paymentData) {
            return res.status(404).json({ message: "Payment not found" });

        }
        return res.status(200).json({ success: true, paymentData , message :"got Payment data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}
export const deletePaymentById = async (req , res) => {
    try{
        const deleteById = req.params.id;
        const paymentData = await payment.findByIdAndDelete(deleteById);
        if (!paymentData) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ success: true, paymentData , message :"Payment deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const updatePaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        
        // The fields to update
        const { customer_id,name,email,address,city,state,country,postalcode,amount,paymenttype} = req.body;

        // Find the user by ID and update with the new data
        const updatedPayment = await payment.findByIdAndUpdate(
            paymentId,
            { customer_id,name,email,address,city,state,country,postalcode,amount,paymenttype}, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({
            success: true,
            user: updatedPayment,
            message: "Payment updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};