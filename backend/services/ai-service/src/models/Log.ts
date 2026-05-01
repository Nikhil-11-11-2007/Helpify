import mongoose, { Schema, Document } from 'mongoose';

// Logs every AI interaction so we can debug and analyze later
// Tracks what the AI thought (intent, sentiment) and whether it escalated to a human
export interface ILog extends Document {
  ticketId: string;
  intent: string;
  sentiment: string;
  confidence: number;
  escalated: boolean;
  createdAt: Date;
}

const LogSchema = new Schema<ILog>({
  ticketId: { type: String, required: true, index: true },
  intent: { type: String },
  sentiment: { type: String },
  confidence: { type: Number },
  escalated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Log = mongoose.model<ILog>('Log', LogSchema);
