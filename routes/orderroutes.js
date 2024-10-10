import express from 'express';
 import { postOrder,getOrderData,getOrderById,deleteOrderById,updateOrderById} from '../controllers/order.js'

const OrderRoute = express.Router();

OrderRoute.post("/createOrder" , postOrder);
OrderRoute.post("/updateOrder/:id", updateOrderById);

OrderRoute.get("/getOrder", getOrderData);
OrderRoute.get("/getOrder/:id", getOrderById);
OrderRoute.delete("/deleteOrder/:id", deleteOrderById);

export default OrderRoute