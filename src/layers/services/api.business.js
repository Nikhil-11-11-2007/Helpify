import apiClient from './api.client';

const BUSINESS_PREFIX = '/api/business';

// ─────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────

// POST /api/business/faqs
// Add a new FAQ
// Backend expects: question, answer, category, tags
export async function createFaq({ question, answer, category, tags }) {
  const response = await apiClient.post(`${BUSINESS_PREFIX}/faqs`, {
    question,
    answer,
    category,
    tags,
  });
  return response.data;
}

// GET /api/business/faqs
// List all FAQs for the logged-in business
export async function getFaqs() {
  const response = await apiClient.get(`${BUSINESS_PREFIX}/faqs`);
  return response.data;
}

// PUT /api/business/faqs/:faqId
// Update an existing FAQ by ID
export async function updateFaq(faqId, { question, answer, category, tags }) {
  const response = await apiClient.put(`${BUSINESS_PREFIX}/faqs/${faqId}`, {
    question,
    answer,
    category,
    tags,
  });
  return response.data;
}

// DELETE /api/business/faqs/:faqId
// Delete an FAQ by ID
export async function deleteFaq(faqId) {
  const response = await apiClient.delete(`${BUSINESS_PREFIX}/faqs/${faqId}`);
  return response.data;
}

// ─────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────

// GET /api/business/settings
// Get the AI settings for the logged-in business
export async function getSettings() {
  const response = await apiClient.get(`${BUSINESS_PREFIX}/settings`);
  return response.data;
}

// PUT /api/business/settings
// Update AI settings
// Backend model expects: aiTone, autoReply, ticketThreshold
export async function updateSettings({ aiTone, autoReply, ticketThreshold }) {
  const response = await apiClient.put(`${BUSINESS_PREFIX}/settings`, {
    aiTone,
    autoReply,
    ticketThreshold,
  });
  return response.data;
}