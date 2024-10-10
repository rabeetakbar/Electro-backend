import express from 'express';
import { getProductById,getProductsByCategory, deleteProductById,getProductByuser, getProductsData, postProductData,updateProductById } from '../controllers/product.js';
import upload from '../utils/helper.js';

const ProductRoute = express.Router();

ProductRoute.post("/postproduct" ,upload.array('images',5), postProductData);
ProductRoute.get("/getproduct", getProductsData);
ProductRoute.get("/getproduct/:category", getProductsByCategory);

ProductRoute.get("/getproduct/:id", getProductById);
ProductRoute.get("/getproductuser", getProductByuser);
ProductRoute.post("/updateproduct/:id", updateProductById);
ProductRoute.delete("/deleteproduct/:id", deleteProductById);

export default ProductRoute