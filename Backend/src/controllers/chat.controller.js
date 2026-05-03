import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import ticketModel from "../models/ticket.model.js";
import businessModel from "../models/business.model.js";
import { generateResponse, generateSummary } from "../services/ai.service.js";
import { ESCALATE_MARKER } from "../services/ai.service.js";

export async function sendMessage(req, res) {
    try {
        const { ownerId, message, customerName, customerEmail, chatId } = req.body;
        if (!ownerId || !message) {
            return res.status(400).json({ message: "ownerId and message are required" });
        }

        const business = await businessModel.findOne({ ownerId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        // Find or create chat
        let chat;
        if (chatId) {
            chat = await chatModel.findOne({ _id: chatId, business: business._id });
            if (!chat) return res.status(404).json({ message: "Chat not found" });
        } else {
            chat = await chatModel.create({
                business: business._id,
                customerInfo: { name: customerName, email: customerEmail },
            });
        }

        // Save user message
        await messageModel.create({ chat: chat._id, content: message, role: "user" });

        // If autoReply is off, immediately create ticket
        if (!business.settings.autoReply) {
            const aiSummary = await generateSummary([{ role: "user", content: message }]);
            const ticket = await ticketModel.create({
                business: business._id,
                chat: chat._id,
                customerInfo: chat.customerInfo,
                subject: aiSummary,
                aiSummary,
            });
            await chatModel.findByIdAndUpdate(chat._id, { status: "ticket_created" });
            return res.json({
                type: "ticket",
                chatId: chat._id,
                ticketId: ticket._id,
                message: "Your request has been forwarded to our support team. An agent will follow up with you shortly.",
            });
        }

        // Get all messages for context
        const allMessages = await messageModel
            .find({ chat: chat._id })
            .sort({ createdAt: 1 })
            .lean();

        const formattedMessages = allMessages.map((m) => ({
            role: m.role,
            content: m.content,
        }));

        // Get AI response
        const aiResponse = await generateResponse(business, formattedMessages);

        // Check for escalation
        if (aiResponse.includes(ESCALATE_MARKER)) {
            const aiSummary = await generateSummary(formattedMessages);
            const ticket = await ticketModel.create({
                business: business._id,
                chat: chat._id,
                customerInfo: chat.customerInfo,
                subject: aiSummary,
                aiSummary,
            });
            await chatModel.findByIdAndUpdate(chat._id, { status: "ticket_created" });
            return res.json({
                type: "ticket",
                chatId: chat._id,
                ticketId: ticket._id,
                message: "I don't have enough information to answer that. Let me connect you with a human agent who can help.",
            });
        }

        // Save AI response
        await messageModel.create({ chat: chat._id, content: aiResponse, role: "ai" });

        res.json({
            type: "ai_response",
            chatId: chat._id,
            message: aiResponse,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getMessages(req, res) {
    try {
        const { chatId } = req.params;
        const messages = await messageModel
            .find({ chat: chatId })
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getChats(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const chats = await chatModel
            .find({ business: business._id })
            .sort({ updatedAt: -1 });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function deleteChat(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const chat = await chatModel.findOneAndDelete({
            _id: req.params.chatId,
            business: business._id,
        });

        if (!chat) return res.status(404).json({ message: "Chat not found" });

        await messageModel.deleteMany({ chat: req.params.chatId });
        await ticketModel.deleteMany({ chat: req.params.chatId });

        res.json({ message: "Chat and related data deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
