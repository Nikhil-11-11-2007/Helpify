import { Request, Response } from 'express';
import pino from 'pino';
import { triage } from './triage';
import { streamCompletion } from './openrouter';
import { escalate } from './escalation';

const logger = pino();

// This is the SSE (Server-Sent Events) streaming handler
// SSE is a simple way to push data from server to client over a single HTTP connection
// Unlike WebSockets, SSE only goes one way: server → client (perfect for AI token streaming)
export async function handleStream(req: Request, res: Response) {
  const { ticketId, message } = req.query;

  if (!ticketId || !message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'ticketId and message required' });
  }

  try {
    // First, triage the message to understand intent and confidence
    const triageResult = await triage(message);

    // If confidence is too low, escalate to a human and don't generate AI response
    if (triageResult.shouldEscalate) {
      await escalate(ticketId as string, message, triageResult);
      return res.json({ success: true, data: { escalated: true, reason: 'Low confidence' } });
    }

    // Set SSE headers - these tell the browser to keep the connection open
    // and expect a stream of events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Build the conversation history to send to the AI
    const messages = [
      { role: 'system', content: 'You are a helpful support assistant.' },
      { role: 'user', content: message as string },
    ];

    // Stream each word fragment as it arrives from OpenRouter
    for await (const token of streamCompletion(messages)) {
      // SSE format: "data: <content>\n\n"
      // The frontend reads these lines and appends them to the chat display
      res.write(`data: ${token}\n\n`);
    }

    // Signal that the stream is complete
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    logger.error(err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'AI stream failed' });
    } else {
      // If headers already sent, we can't send a JSON error - just close the connection
      res.end();
    }
  }
}
