import { Request, Response } from 'express';
import * as messageService from '../services/message.service';

// REST endpoint to fetch chat history for a room
// The frontend calls this when first loading a chat to show past messages
export async function getHistory(req: Request, res: Response) {
  const { roomId } = req.query;
  if (!roomId || typeof roomId !== 'string') {
    return res.status(400).json({ success: false, message: 'roomId required' });
  }
  const messages = await messageService.getHistory(roomId);
  res.json({ success: true, data: messages });
}
