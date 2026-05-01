import { Router, Request, Response } from 'express';
import { proxyTo } from './proxy';
import { authMiddleware } from './auth.middleware';

const router = Router();

// ─── AUTH ROUTES (no JWT required) ──────────────────────────────────────
// These are the entry points for authentication
// They forward to the auth-service which handles the actual logic

router.post('/auth/signup', async (req, res) => {
  try {
    const data = await proxyTo('auth', '/signup', 'POST', req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Auth service error' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const data = await proxyTo('auth', '/login', 'POST', req.body);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Auth service error' });
  }
});

router.post('/auth/refresh', async (req, res) => {
  try {
    // Forward cookies so auth-service can read the refreshToken cookie
    const data = await proxyTo('auth', '/refresh', 'POST', req.body, req.headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Auth service error' });
  }
});

// ─── PROTECTED ROUTES (JWT required) ─────────────────────────────────────
// All routes below this line require a valid JWT token
// authMiddleware runs on every request and rejects unauthenticated ones

router.use(authMiddleware);

router.post('/auth/logout', async (req, res) => {
  try {
    const data = await proxyTo('auth', '/logout', 'POST', req.body, req.headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Auth service error' });
  }
});

router.get('/auth/me', async (req, res) => {
  try {
    // Pass userId as a header so auth-service knows who is asking
    const headers = { ...req.headers, 'x-user-id': (req as any).userId };
    const data = await proxyTo('auth', '/me', 'GET', undefined, headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Auth service error' });
  }
});

router.get('/auth/users', async (req, res) => {
  try {
    const data = await proxyTo('auth', '/users', 'GET', undefined, req.headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Auth service error' });
  }
});

// ─── CHAT ROUTES ─────────────────────────────────────────────────────────
router.get('/chat/history', async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query as any).toString();
    const data = await proxyTo('chat', `/history?${queryString}`, 'GET', undefined, req.headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Chat service error' });
  }
});

// ─── AI ROUTES ───────────────────────────────────────────────────────────
router.get('/ai/stream', async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query as any).toString();
    const data = await proxyTo('ai', `/stream?${queryString}`, 'GET', undefined, req.headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'AI service error' });
  }
});

// ─── NOTIFICATION ROUTES ─────────────────────────────────────────────────
router.post('/notify', async (req, res) => {
  try {
    const data = await proxyTo('notify', '/enqueue', 'POST', req.body, req.headers);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json(err.data || { success: false, message: 'Notification service error' });
  }
});

export default router;
