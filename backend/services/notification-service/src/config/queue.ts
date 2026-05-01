import { Queue } from 'bullmq';
import Redis from 'ioredis';

// BullMQ is a job queue - think of it like a to-do list for background tasks
// When someone wants to send an email, we add a job to the queue
// A worker (separate process) picks up the job and sends the email
// This way the API doesn't slow down waiting for the email provider

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const emailQueue = new Queue('email', { connection });
