import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
    {
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            trim: true,
            default: "General",
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { timestamps: true }
);

const faqModel = mongoose.model("FAQ", faqSchema);
export default faqModel;
