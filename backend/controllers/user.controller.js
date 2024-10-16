import User from "../models/user.model.js";

export const getUsersForSidebar=async (req,res)=>{
    try {
        const loggedInUserId=req.user._id;

        const filteredUsers=await User.find(                   //find all users in db that isnt current loggedin person.
            {
                _id:{$ne: loggedInUserId}
            }).select("-password");
        
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log("error in getusersforsidebar:",error.message);
        res.status(500).json({error:"internal server error"});
        
    }
}