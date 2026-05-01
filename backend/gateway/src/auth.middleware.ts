import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// This middleware runs BEFORE every protected route
// It checks if the request has a valid JWT in the Authorization header
// If not, it returns 401 immediately without forwarding to any service
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    // JWT tokens are sent as "Bearer <token>"
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Extract just the token part (remove "Bearer ")
    const token = authHeader.split(' ')[1];

    // Verify the token is valid and not tampered with
    // jwt.verify throws if the token is expired or has a bad signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    // Attach userId to the request so downstream services can use it
    (req as any).userId = decoded.userId;
    next();  // Allow the request to proceed
  } catch (err) {
    // Token is invalid, expired, or tampered with
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}
