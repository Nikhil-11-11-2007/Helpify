import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },
        customerInfo: {
            name: { type: String, trim: true },
            email: { type: String, trim: true, lowercase: true },
        },
        status: {
            type: String,
            enum: ["active", "ticket_created", "resolved"],
            default: "active",
        },
    },
    { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
