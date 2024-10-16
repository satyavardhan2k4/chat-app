import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();


router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);//id is the user id from mongodb who is trying to send the message.
//protectRoute is like an autharization that checks if user is loged in,and this is a middleware


export default router;