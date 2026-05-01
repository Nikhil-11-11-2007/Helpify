import mongoose, { Schema, Document } from 'mongoose';

// A room represents a chat session tied to a support ticket
// Multiple users can join the same room to chat about a ticket
export interface IRoom extends Document {
  ticketId: string;
  participantIds: string[];
  createdAt: Date;
}

const RoomSchema = new Schema<IRoom>({
  ticketId: { type: String, required: true, unique: true },
  participantIds: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Room = mongoose.model<IRoom>('Room', RoomSchema);
