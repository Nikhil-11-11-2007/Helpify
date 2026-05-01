import { Message } from '../models/Message';
import { Room } from '../models/Room';

// Saves a new message to the database
export async function saveMessage(roomId: string, senderId: string, text: string) {
  return Message.create({ roomId, senderId, text });
}

// Fetches the most recent messages for a room (defaults to last 50)
// Sorted newest-first, but usually reversed on the frontend
export async function getHistory(roomId: string, limit = 50) {
  return Message.find({ roomId }).sort({ createdAt: -1 }).limit(limit).lean();
}

// Creates a new chat room tied to a support ticket
export async function createRoom(ticketId: string, participantIds: string[]) {
  return Room.create({ ticketId, participantIds });
}
