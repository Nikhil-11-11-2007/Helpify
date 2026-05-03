import faqModel from "../models/faq.model.js";
import businessModel from "../models/business.model.js";

export async function createFaq(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const faq = await faqModel.create({
            business: business._id,
            question: req.body.question,
            answer: req.body.answer,
            category: req.body.category || "General",
            tags: req.body.tags || [],
        });

        res.status(201).json(faq);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getFaqs(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const faqs = await faqModel.find({ business: business._id }).sort({ createdAt: -1 });
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateFaq(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const faq = await faqModel.findOneAndUpdate(
            { _id: req.params.faqId, business: business._id },
            {
                question: req.body.question,
                answer: req.body.answer,
                category: req.body.category,
                tags: req.body.tags,
            },
            { new: true }
        );

        if (!faq) return res.status(404).json({ message: "FAQ not found" });
        res.json(faq);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function deleteFaq(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const faq = await faqModel.findOneAndDelete({
            _id: req.params.faqId,
            business: business._id,
        });

        if (!faq) return res.status(404).json({ message: "FAQ not found" });
        res.json({ message: "FAQ deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getSettings(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });
        res.json(business.settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateSettings(req, res) {
    try {
        const business = await businessModel.findOne({ owner: req.user.id });
        if (!business) return res.status(404).json({ message: "Business not found" });

        const allowed = ["aiTone", "autoReply", "ticketThreshold"];
        allowed.forEach((key) => {
            if (req.body[key] !== undefined) business.settings[key] = req.body[key];
        });

        await business.save();
        res.json(business.settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
