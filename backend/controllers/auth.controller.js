import bcryptjs from "bcryptjs";
import User from '../models/user.model.js';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup=async(req,res)=>{
    try{
        const {fullName,userName,gender,password,confirmpassword} =req.body;

        if(password!=confirmpassword){
            return res.status(400).json({error:"passwords do not match"});
        }
        const user=await User.findOne({userName});
        if(user){
            return res.status(400).json({errror:"user already exists"});
        }

        //hash password here
        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt);

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser=new User({
            fullName,
            userName,
            password:hashPassword,
            gender,
            profilePic:gender === "Male" ? boyProfilePic:girlProfilePic

        });
        if(newUser){
            //JWT token here;
            await generateTokenAndSetCookie(newUser._id,res);



            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profilePic,
            });
        }
        else{
            res.status(400).json({error:"invalid userdata"});
        }


    }catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({error:"internal server error"});

    }
    
};

export const login=async (req,res)=>{
    try {
        const {userName,password} = req.body;
        const user=await User.findOne({userName});
        const isPasswordCorrect=await bcryptjs.compare(password,user?.password || "");//decrypting the hashed password from database and comparing it with the entered passsword if the user is not there in the the database then user.password will be undefined therefore we use || ""


        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"invalid username or password"});
        }
        generateTokenAndSetCookie(user.id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic,

        });
        
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({error:"internal server error"});

        
    }
    
};

export const logout=async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"});
       
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({error:"internal server error"});
        
    }
};

