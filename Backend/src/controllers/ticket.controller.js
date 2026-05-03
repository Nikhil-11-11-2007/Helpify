import ticketModel from "../models/ticket.model.js";
import businessModel from "../models/business.model.js";
import messageModel from "../models/message.model.js";
import { sendTicketNotification } from "../services/mail.service.js";

export async function getTickets(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const { status, priority } = req.query;
        const filter = { business: business._id };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const tickets = await ticketModel
            .find(filter)
            .populate("chat", "customerInfo createdAt")
            .sort({ createdAt: -1 });

        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getTicket(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const ticket = await ticketModel
            .findOne({ _id: req.params.ticketId, business: business._id })
            .populate("chat");

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        const messages = await messageModel
            .find({ chat: ticket.chat._id })
            .sort({ createdAt: 1 });

        res.json({ ticket, messages });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateStatus(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const ticket = await ticketModel.findOneAndUpdate(
            { _id: req.params.ticketId, business: business._id },
            { status: req.body.status },
            { new: true }
        );

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function replyToTicket(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const ticket = await ticketModel.findOne({
            _id: req.params.ticketId,
            business: business._id,
        });

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        const replyContent = req.body.content;
        ticket.adminReplies.push({ content: replyContent });
        if (ticket.status === "open") ticket.status = "in_progress";
        await ticket.save();

        // Save reply as message in chat history
        await messageModel.create({
            chat: ticket.chat,
            content: replyContent,
            role: "admin",
        });

        // Send email notification
        await sendTicketNotification(ticket, replyContent);

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}