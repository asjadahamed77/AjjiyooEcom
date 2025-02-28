import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

// Middleware to protect routes
export const protect = async (req, res, next)=> {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user =  await userModel.findById(decoded.user.id).select("-password")
            next()

        } catch (error) {
            console.log("Token Verfication Failed: ",error);
    res.status(401).json({success:false, message:"Not Authorized. Login again."}); 
        }
    }
    else{
        res.status(401).json({success:false, message:"Not Authorized. No token provided."}); 
    }

}

// Middleware to check if user is admin
export const admin = (req, res, next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        res.status(403).json({success:false, message:"Not Authorized as an Admin."}); 
    }
}