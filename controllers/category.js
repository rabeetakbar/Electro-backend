import { request } from "http"
import category from "../models/category-model.js";
import { response } from "express";

export const postCategory = async (req , res ) => {
    try{
        const {category_name , description } = req.body;
        console.log(category_name , description); 
        const category_nameexist = await category.findOne({ category_name: category_name });
        if(category_nameexist) {
            return res.status(400).json({ message: "Category already exists" });
        }
        
        const categoryData = category({
            category_name , description
        })

        await categoryData.save();
        return res.status(200).json({ message: "Category saved succesfully", success: true , categoryData});

    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getCategoryData = async (req, res) => {
    try {
        const getcategory = await category.find()
        return res.status(200).json({ success : true , getcategory});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getCategoryById = async (req , res) => {
    try{
        const getCategoryId = req.params.id;
        const categoryData = await category.findById(getCategoryId);
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });

        }
        return res.status(200).json({ success: true, categoryData , message :"got Category data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}

export const deleteCategoryById = async (req , res) => {
    try{
        const deleteById = req.params.id;
        const categoryData = await category.findByIdAndDelete(deleteById);
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });

        }
        return res.status(200).json({ success: true, categoryData , message :"Category deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const updateCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        // The fields to update
        const { category_name , description } = req.body;

        // Find the user by ID and update with the new data
        const updatedCategory = await category.findByIdAndUpdate(
            categoryId,
            { category_name , description}, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            user: updatedCategory,
            message: "Category updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
