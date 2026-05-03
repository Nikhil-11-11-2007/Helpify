import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        customerInfo: {
            name: { type: String, trim: true },
            email: { type: String, trim: true, lowercase: true },
        },
        subject: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["open", "in_progress", "resolved", "closed"],
            default: "open",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        aiSummary: {
            type: String,
            trim: true,
        },
        adminReplies: [
            {
                content: { type: String, required: true },
                sentAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;
