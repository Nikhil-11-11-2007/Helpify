import { Router } from 'express';
import { handleStream } from '../services/stream';

const router = Router();

// GET /stream?ticketId=xxx&message=xxx - Opens an SSE connection for AI streaming
router.get('/stream', handleStream);

export default router;
