import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  role: {
    type: String,
    enum: ["customer", "admin", "superadmin"],
    default: "customer",
  },
  resetToken: {
    type: String,
  }, 
  resetTokenExpiry: {
     type: Date }, 
});

const auth = mongoose.model("authorizations", userSchema);
export default auth;
