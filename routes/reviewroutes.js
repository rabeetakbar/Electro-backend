import express from 'express';
import { postReview,getReviewsData,getReviewByuser,updateReviewById,deleteReviewById } from '../controllers/review.js';


const ReviewRoute = express.Router();

ReviewRoute.post("/postreview" , postReview);
ReviewRoute.get("/getreviews", getReviewsData);
ReviewRoute.get("/getreviewuser", getReviewByuser);
ReviewRoute.post("/updateReviewById/:id", updateReviewById);

ReviewRoute.delete("/deletereview/:id", deleteReviewById);

export default ReviewRoute