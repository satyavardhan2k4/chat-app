import mongoose from "mongoose";

const connectToMongoDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connected to mongodb");

    }catch(err){
        console.log("error connecting to mongodb",err.message)
    }
     
};

export default connectToMongoDB;