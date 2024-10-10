import express from 'express';
import { getUserById,deleteUserById, getUsersData, postUserData, updateUserById } from '../controllers/user.js';
import upload from '../utils/helper.js';

const userRoute = express.Router();

// userRoute.post("/createuser" ,upload.single('image'), postUserData);
// userRoute.post("/createuser", upload.array('images',2), postUserData);


userRoute.post("/createuser", postUserData); //creating user without image.


userRoute.post("/update/:id", updateUserById);

userRoute.get("/get", getUsersData);
userRoute.get("/get/:id", getUserById);
userRoute.delete("/delete/:id", deleteUserById);

export default userRoute