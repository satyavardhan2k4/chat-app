import mongoose from "mongoose";
// this is the session between people in a conversation

const conversationSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId, //referto message.model.js to understand syntax and purpose
            ref:"User",
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message", // accessing messageids
            default:[],
        }
    ]

},{timestamps:true});

 const Conversation=new mongoose.model("conversation",conversationSchema);
 export default Conversation;