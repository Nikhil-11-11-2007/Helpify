import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Redis from 'ioredis';
import { User } from '../models/User';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Creates a new user account with hashed password
export async function signup(email: string, password: string) {
  // First check if someone already signed up with this email
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already exists');

  // Hash the password so even if the database leaks, passwords stay safe
  // 10 = how many rounds of hashing (higher is slower but more secure)
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });

  // Generate two tokens: access (short-lived) and refresh (long-lived)
  const tokens = generateTokens(user.id);
  return { user: { id: user.id, email: user.email, role: user.role }, tokens };
}

// Verifies email + password and returns tokens
export async function login(email: string, password: string) {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  // Check if the password matches the stored hash
  const valid = await user.comparePassword(password);
  if (!valid) throw new Error('Invalid credentials');

  const tokens = generateTokens(user.id);
  return { user: { id: user.id, email: user.email, role: user.role }, tokens };
}

// When the access token expires, the client sends the refresh token
// to get a new access token without asking the user to login again
export async function refresh(refreshToken: string) {
  // Verify the token hasn't been tampered with
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };

  // Check if this token was revoked (user logged out)
  const blacklisted = await redis.get(`blacklist:${refreshToken}`);
  if (blacklisted) throw new Error('Token revoked');

  return generateTokens(decoded.userId);
}

// Add the refresh token to a blacklist so it can't be used again
export async function logout(refreshToken: string) {
  // TTL = 7 days (same as the refresh token lifetime)
  await redis.setex(`blacklist:${refreshToken}`, 7 * 24 * 60 * 60, '1');
}

// Creates both an access token (15 min) and refresh token (7 days)
// The access token is sent on every API request to prove who you are
// The refresh token is stored in an httpOnly cookie (safer than localStorage)
function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}
