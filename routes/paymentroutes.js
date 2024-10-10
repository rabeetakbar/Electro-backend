import express from 'express';
 import { postPayment,updatePaymentById,getPaymentData,getPaymentById,deletePaymentById} from '../controllers/payment.js'

const PaymentRoute = express.Router();

PaymentRoute.post("/createPayment" , postPayment);
PaymentRoute.post("/updatePayment/:id", updatePaymentById);

PaymentRoute.get("/getPayment", getPaymentData);
PaymentRoute.get("/getPayment/:id", getPaymentById);
PaymentRoute.delete("/deletePayment/:id", deletePaymentById);

export default PaymentRoute