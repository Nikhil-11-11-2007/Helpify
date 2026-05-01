import Redis from 'ioredis';
import pino from 'pino';

const logger = pino();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// When the AI isn't confident enough, it escalates the conversation to a human agent
// It publishes a message to Redis pub/sub which the chat service listens to
export async function escalate(ticketId: string, message: string, triageResult: any) {
  const payload = {
    ticketId,
    message,
    intent: triageResult.intent,
    sentiment: triageResult.sentiment,
    confidence: triageResult.confidence,
    timestamp: new Date().toISOString(),
  };

  // Publish to the 'escalation' Redis channel
  // The chat service subscribes to this channel and will notify human agents
  await redis.publish('escalation', JSON.stringify(payload));
  logger.info({ ticketId }, 'Escalated to human agent');
}
