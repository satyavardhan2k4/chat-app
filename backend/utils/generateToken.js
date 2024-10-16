import jwt from "jsonwebtoken";

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,  //since we cant specify it as 15d in a string we do it in millisec
        httpOnly:true,//prevent xss attacks; by only allowing http access and not js
        sameSite:"strict" ,//csrf attacks cross-site request forgery attacks are prevented
        secure: process.env.NODE_ENV!=="development"


    })

}
export default generateTokenAndSetCookie;