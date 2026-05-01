import { Router, Request, Response } from 'express';
import { emailQueue } from '../config/queue';

const router = Router();

// POST /enqueue - Adds an email to the queue
// The API returns immediately, and the worker sends the email in the background
router.post('/enqueue', async (req: Request, res: Response) => {
  const { to, subject, html } = req.body;
  // Add job to the 'email' queue - BullMQ stores it in Redis
  await emailQueue.add('send-email', { to, subject, html });
  res.json({ success: true, message: 'Email queued' });
});

export default router;
