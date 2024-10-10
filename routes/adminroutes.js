import express from 'express';
import {deleteAdminById, getAdminData, postAdminData,updateAdminById } from '../controllers/admin.js';

const AdminRoute = express.Router();

AdminRoute.post("/postadmin" , postAdminData);
AdminRoute.get("/getadmin", getAdminData);
// ProductRoute.get("/getproduct/:id", getProductById);
// ProductRoute.get("/getproductuser", getProductByuser);
AdminRoute.post("/updateadmin/:id", updateAdminById);
AdminRoute.delete("/deleteadmin/:id", deleteAdminById);

export default AdminRoute