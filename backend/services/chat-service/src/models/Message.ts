import mongoose, { Schema, Document } from 'mongoose';

// Every chat message has a room it belongs to, who sent it, and what they said
// The roomId is indexed so we can quickly fetch all messages for a room
export interface IMessage extends Document {
  roomId: string;
  senderId: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  roomId: { type: String, required: true, index: true },
  senderId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
