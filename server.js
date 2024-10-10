import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoutes.js';
import ProductRoute from './routes/productroutes.js';
import AdminRoute from './routes/adminroutes.js';
import ReviewRoute from './routes/reviewroutes.js';
import CategoryRoute from './routes/categoryroutes.js';
import cartRoute from './routes/cartroutes.js';
import OrderRoute from './routes/orderroutes.js';
import PaymentRoute from './routes/paymentroutes.js';
import Authroute from './routes/authroutes.js';

import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


import cookieParser from 'cookie-parser';
dotenv.config()


const app= express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use("/",userRoute)
app.use('/',ProductRoute)
app.use('/',AdminRoute)
app.use('/',ReviewRoute)
app.use('/',CategoryRoute)
app.use('/',cartRoute)
app.use('/',OrderRoute)
app.use('/',PaymentRoute)
app.use('/',Authroute)






const port=process.env.port || 8000

connectDB()
app.listen(port, ()=>{
  console.log("Server created")
})