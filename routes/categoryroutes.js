import express from 'express';
 import { postCategory,getCategoryData,getCategoryById,deleteCategoryById,updateCategoryById} from '../controllers/category.js'

const CategoryRoute = express.Router();

CategoryRoute.post("/createcategory" , postCategory);
CategoryRoute.post("/updatecategory/:id", updateCategoryById);

CategoryRoute.get("/getcategory", getCategoryData);
CategoryRoute.get("/getcategory/:id", getCategoryById);
CategoryRoute.delete("/deletecategory/:id", deleteCategoryById);

export default CategoryRoute