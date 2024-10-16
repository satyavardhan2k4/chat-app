import  jwt  from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt; //accessing the cookie
        if(!token) { return res.status(401).json({error:"unauthorized-no token provide"});}


        const decoded=jwt.verify(token,process.env.JWT_SECRET)//verifying our token as jwt_secret is used to sign the token in the first place

        if(!decoded){return res.status(401).json({error:"unauthorized-Invalid token"});}

        const user=await User.findById(decoded.userId).select('-password'); //since we used userId when signing the token, and not wanting to access the password
        if(!user){return res.status(404).json({error:"user not found"});}


        req.user=user; //all this to attach user to req body so we can access it in the next function so we created this middleware.
        next();  


    } catch (error) {
        console.log("error in protectRoute middleware",error.message);
        res.status(500).json({error:"internal server error"});
        
    }
}

export default protectRoute;