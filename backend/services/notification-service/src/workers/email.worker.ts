import { Worker } from 'bullmq';
import Redis from 'ioredis';
import pino from 'pino';
import { sendEmail } from '../services/sendgrid';

const logger = pino();

// The worker runs in the background and watches the email queue
// Whenever a new job appears, it processes it by sending the email
// This is an event-driven pattern - the worker sleeps until work arrives

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const emailWorker = new Worker(
  'email',
  async (job) => {
    // job.data contains the { to, subject, html } we queued
    const { to, subject, html } = job.data;
    await sendEmail(to, subject, html);
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Email job completed');
});

emailWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Email job failed');
});
