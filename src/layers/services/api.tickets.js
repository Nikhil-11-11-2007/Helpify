import apiClient from './api.client';

const TICKETS_PREFIX = '/api/tickets';

// GET /api/tickets
// List all support tickets for the logged-in business
export async function getTickets() {
  const response = await apiClient.get(`${TICKETS_PREFIX}`);
  return response.data;
}

// GET /api/tickets/:ticketId
// Get a single ticket with full chat history
export async function getTicketById(ticketId) {
  const response = await apiClient.get(`${TICKETS_PREFIX}/${ticketId}`);
  return response.data;
}

// PUT /api/tickets/:ticketId/status
// Update ticket status
// Backend model valid values: open | in_progress | resolved | closed
export async function updateTicketStatus(ticketId, status) {
  const response = await apiClient.put(`${TICKETS_PREFIX}/${ticketId}/status`, {
    status,
  });
  return response.data;
}

// POST /api/tickets/:ticketId/reply
// Reply to a ticket — sends email notification to the customer
// Backend expects: content
export async function replyToTicket(ticketId, { content }) {
  const response = await apiClient.post(`${TICKETS_PREFIX}/${ticketId}/reply`, {
    content,
  });
  return response.data;
}