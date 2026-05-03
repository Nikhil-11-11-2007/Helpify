import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    sendMessage,
    getMessages,
    getChats,
    deleteChat,
} from "../controllers/chat.controller.js";

const router = Router();

// Public: customer widget
router.post("/message", sendMessage);
router.get("/:chatId/messages", getMessages);

// Protected: admin dashboard
router.get("/", authUser, getChats);
router.delete("/delete/:chatId", authUser, deleteChat);

export default router;