
import express from "express";
import asyncHandler from "express-async-handler";
import {addUser, getUser} from "../controllers/userController.js";
import {newConversations, getConversation} from "../controllers/conversationController.js";
import {newMessage, getMessage} from "../controllers/messageController.js";
import {uploadFile, getImage} from "../controllers/uploadFileController.js";
import upload from "../utils/upload.js";




const router = new express.Router();


router.post("/api/user", asyncHandler(addUser) );

router.get("/api/user", asyncHandler(getUser));

router.post("/api/conversations", asyncHandler(newConversations));

router.post("/api/conversations/get", asyncHandler(getConversation));

router.post("/api/message", asyncHandler(newMessage));

router.get("/api/message/:id", asyncHandler(getMessage));

router.post("/file/upload", upload.single('file'), asyncHandler(uploadFile));

router.get('/file/:filename', getImage);



export default router;
