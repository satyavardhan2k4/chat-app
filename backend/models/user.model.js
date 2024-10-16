import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    profilePic:{
        type:String,
        default:""
    },
},{timestamps:true});
//here we can use time stamps for info like user joined us in/created since createdAt time.
const User=mongoose.model("User",userSchema);

export default User;