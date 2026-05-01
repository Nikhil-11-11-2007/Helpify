import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const result = await authService.signup(email, password);
    // Set refresh token as an httpOnly cookie - this means JavaScript can't read it,
    // which protects against XSS attacks stealing the token
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    res.status(201).json({ success: true, data: { user: result.user, accessToken: result.tokens.accessToken } });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const result = await authService.login(email, password);
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    res.json({ success: true, data: { user: result.user, accessToken: result.tokens.accessToken } });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    // Read the refresh token from the cookie (not the request body)
    // This is more secure since cookies can't be accessed by JavaScript
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'No refresh token' });
    }

    const tokens = await authService.refresh(refreshToken);
    // Rotate the refresh token - old one is invalidated, new one issued
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    res.json({ success: true, data: { accessToken: tokens.accessToken } });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
