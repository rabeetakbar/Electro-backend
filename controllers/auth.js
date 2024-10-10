import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import auth from "../models/auth-model.js";
dotenv.config()

 //sign-up Api

 //original working

// export const SignupUser=async(req,res)=>{
// try {
//     const {username, email, password}=req.body;
//     const hashpassword=await bcrypt.hash(password,10)
//     const loginUser=new auth({username, email, password: hashpassword})
//     await loginUser.save();
//     res.status(201).json({message:"User created successfully"})
// } catch (error) {
//     res.status(500).json({error:error.message})
// }
// }


//signup API
export const SignupUser = async (req, res) => {
    try {
        const { name,username, email, password, role } = req.body; // Accept role from request body
        const hashpassword = await bcrypt.hash(password, 10);
        const loginUser = new auth({
            name,
            username,
            email,
            password: hashpassword,
            role: role 
        });
        await loginUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//login API
export const Loginuser=async(req, res)=>{
    try {
        const {email, password}=req.body;
        const user=await auth.findOne({email});
        if(user && await bcrypt.compare(password,user.password)){
            const token =jwt.sign({userId:user.id, role:user.role}, process.env.PRIVATE_KEY, {expiresIn:"1hr"})
            res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:5*60*60*24})
       res.status(200).json({token})
        }else{
            res.status(401).json({error:"invalid credentional"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//logout API
export const Logoutuser = async(req,res)=>{
try{
res.clearCookie('jwt')
res.status(200).json("logged out")
}
catch(error){
res.status(500).json(error.message)

}
}