import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Simple rate limiter: max 100 requests per IP per minute
// Uses Redis to track counts because Redis is fast and survives restarts
// If someone sends too many requests, we block them with 429 status
export async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  try {
    const ip = req.ip || 'unknown';
    const key = `ratelimit:${ip}`;

    // INCR creates the key at 1, or increments it if it exists
    const current = await redis.incr(key);

    // First request from this IP - set the key to expire in 60 seconds
    if (current === 1) {
      await redis.expire(key, 60);
    }

    // If they've exceeded 100 requests in 60 seconds, block them
    if (current > 100) {
      return res.status(429).json({ success: false, message: 'Rate limit exceeded' });
    }

    next();
  } catch (err) {
    // If Redis fails, let the request through (fail open is better than blocking everyone)
    next();
  }
}
