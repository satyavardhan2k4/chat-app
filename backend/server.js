import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDb.js";


dotenv.config(); 
const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json()); //to parse incoming requests to json
app.use(cookieParser());//to parse cookies so we can use it and access it in our project
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/user",userRoutes);


// app.get("/",(req,res)=>{
//     //root route
//     res.send("hello world");
// });






app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
});