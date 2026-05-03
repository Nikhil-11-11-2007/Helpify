import apiClient from './api.client';

const CHAT_PREFIX = '/api/chats';

// POST /api/chats/message
// Customer sends a message — no auth required (public route)
// Backend expects: ownerId, message, customerName, customerEmail
export async function sendMessage({ ownerId, message, customerName, customerEmail }) {
  const response = await apiClient.post(`${CHAT_PREFIX}/message`, {
    ownerId,
    message,
    customerName,
    customerEmail,
  });
  return response.data;
}

// GET /api/chats/:chatId/messages
// Get all messages in a chat session — no auth required (public route)
export async function getChatMessages(chatId) {
  const response = await apiClient.get(`${CHAT_PREFIX}/${chatId}/messages`);
  return response.data;
}