import express from 'express';
import { postCartData,getCartData,updateCartById,getCartById,deleteCartById } from '../controllers/cart.js';

const cartRoute = express.Router();

cartRoute.post("/createcart" , postCartData);
cartRoute.post("/updatecart/:id", updateCartById);

cartRoute.get("/getcart", getCartData);
cartRoute.get("/getcart/:id", getCartById);
cartRoute.delete("/deletecart/:id", deleteCartById);

export default cartRoute