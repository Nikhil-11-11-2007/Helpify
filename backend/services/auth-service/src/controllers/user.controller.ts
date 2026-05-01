import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    // The userId comes from the JWT token, decoded by the gateway middleware
    // and passed as a header to this service
    const userId = (req as any).userId || req.headers['x-user-id'];
    const user = await userService.getProfile(userId);
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.listUsers();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
