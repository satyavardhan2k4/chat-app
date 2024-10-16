import mongoose from "mongoose";
// this is database for messages that are sent between two people
const messageSchema=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,  //this is us declaring that senderid is an id type inside this model like a reference
        ref:"User",                           // and this is the collection it is refering to to get objectid
        required:true
    },

    receiverid:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:"User",                           
        required:true
    },

    message:{
        type:String,
        required:true,
    }
},{timestamps:true});// with this created at and updated at fields are created my mongo
// we can access it through front end by using message.createdAt.

const Message=mongoose.model("Message",messageSchema);

export default Message;