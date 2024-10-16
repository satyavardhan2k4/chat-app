import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage=async (req,res)=>{
    try {
        const{message}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;//we are able to do this thanks to protectRoute middleware go check it out in middleware folder for understanding

        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}, // this is us trying to finad all conversations between these two people
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
                // by default messages is empty array in Conversation schema so no need to create it here
            })

        }

        const newMessage=await new Message({
            senderid:senderId,
            receiverid:receiverId,
            message, 

        })
        //await newMessage.save();


        if(newMessage){ // if new message is successfully created then
            conversation.messages.push(newMessage._id);
           // await conversation.save();

        }
        await Promise.all([newMessage.save(),conversation.save()]); // this will run parallelly hence faster

        res.status(201).json(newMessage);




        
    } catch (error) {
        console.log("error in send message controller",error.message);
        res.status(500).json({erros:"internal server error"});
    }

}
export const getMessages=async(req,res)=>{
    try {
        const{id:userToChatId}=req.params;
        const senderid=req.user._id;
        const conversation=await Conversation.findOne({
            participants: { $all: [senderid, userToChatId] }, // this is us trying to finad all conversations between these two people
        }).populate("messages");//here the data from Conversation database is being fetched it has a message feild which is an reference type(look at the schema) now using populate we can pull the detailes from the db it is refering to when pulling Conversation data this data will be shown under messages field since it is refering to another db.

        if(!conversation){res.status(200).json([]);}

        const messages=conversation.messages;
        res.status(200).json(messages);
        

       


        
    } catch (error) {
        console.log("error in get message controller",error.message);
        res.status(500).json({erros:"internal server error"});
        
        
    }
}

