import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        ownerId: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        settings: {
            aiTone: {
                type: String,
                default: "professional",
                enum: ["professional", "friendly", "technical"],
            },
            autoReply: {
                type: Boolean,
                default: true,
            },
            ticketThreshold: {
                type: Number,
                default: 0,
                min: 0,
                max: 1,
            },
        },
    },
    { timestamps: true }
);

const businessModel = mongoose.model("Business", businessSchema);
export default businessModel;
