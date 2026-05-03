import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import faqModel from "../models/faq.model.js";

const ESCALATE_MARKER = "ESCALATE_TO_HUMAN";

async function findRelevantFAQs(businessId, query) {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const allFaqs = await faqModel.find({ business: businessId }).lean();

    const scored = allFaqs.map(faq => {
        const text = (faq.question + " " + faq.answer + " " + (faq.tags || []).join(" ")).toLowerCase();
        const score = queryWords.reduce((acc, word) => acc + (text.includes(word) ? 1 : 0), 0);
        return { faq, score };
    });

    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(s => s.faq);
}

export async function generateResponse(business, messages) {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const relevantFaqs = await findRelevantFAQs(business._id, lastUserMessage);

    const faqContext = relevantFaqs.length > 0
        ? relevantFaqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
        : "No FAQs available for this business yet.";

    const systemPrompt = `You are a customer support assistant for ${business.name}.
Your tone is: ${business.settings?.aiTone || 'professional'}.

INSTRUCTIONS:
- Answer the customer's question using ONLY the provided FAQs below.
- If the answer is in the FAQs, provide a helpful, concise response.
- If the user's question is NOT covered by the FAQs, respond EXACTLY with:
  "ESCALATE_TO_HUMAN: I don't have enough information to answer that. Let me connect you with a human agent who can help."
- Do NOT make up answers. Do NOT use outside knowledge.
- Be polite and professional.

FAQ KNOWLEDGE BASE:
${faqContext}
`;

    const geminiModel = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0.7,
        maxOutputTokens: 1024,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const langChainMessages = [
        new SystemMessage(systemPrompt),
        ...messages.map(m => new HumanMessage(m.content)),
    ];

    const response = await geminiModel.invoke(langChainMessages);
    return response.content;
}

export async function generateChatTitle(message) {
    const geminiModel = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0.7,
        maxOutputTokens: 50,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const response = await geminiModel.invoke([
        new SystemMessage("Generate a concise 2-4 word title summarizing this customer support query. Respond with only the title, no punctuation."),
        new HumanMessage(message),
    ]);
    return response.content.trim();
}

export async function generateSummary(messages) {
    const conversation = messages.map(m => `${m.role}: ${m.content}`).join("\n");
    const geminiModel = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0.5,
        maxOutputTokens: 256,
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const response = await geminiModel.invoke([
        new SystemMessage("Summarize the following customer support conversation into one concise sentence describing the customer's issue. Respond with only the summary."),
        new HumanMessage(conversation),
    ]);
    return response.content.trim();
}

export { ESCALATE_MARKER };